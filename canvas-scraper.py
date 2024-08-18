import requests
import os
from bs4 import BeautifulSoup
import openai
import logging
import json

# Configure logging
logging.basicConfig(filename='scraper.log', level=logging.INFO)

# Set up OpenAI API credentials
openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
def get_input_fields(html_content):
    response =  openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that extracts input field information from HTML."
            },
            {
                "role": "user",
                "content": f"Extract the IDs or names of the NetID/Username and password input fields from the following HTML content:\n\n{html_content}\n\nReturn the result in the following JSON format:\n{{\"username_field\": \"<field_id_or_name>\", \"password_field\": \"<field_id_or_name>\"}}"
            }
        ],
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()

def login(url, username, password):
    # Send a GET request to the login page
    response = requests.get(url)
    html_content = response.text

    # Extract the input field IDs or names using OpenAI
    input_fields = get_input_fields(html_content)
    logging.info(f"Extracted input fields: {input_fields}")

    # Parse the input fields JSON
    try:
        input_fields_json = json.loads(input_fields)
        username_field = input_fields_json["username_field"]
        password_field = input_fields_json["password_field"]
    except (json.JSONDecodeError, KeyError):
        logging.error("Failed to parse input fields JSON")
        return None

    # Create a session and retrieve the CSRF token
    session = requests.Session()
    soup = BeautifulSoup(html_content, "html.parser")
    csrf_token = soup.find("input", {"name": "csrfmiddlewaretoken"})["value"]

    # Prepare the login payload
    payload = {
        username_field: username,
        password_field: password,
        "csrfmiddlewaretoken": csrf_token,
    }

    # Send a POST request to the login endpoint
    response = session.post(url, data=payload)

    # Check if the login was successful
    if response.status_code == 200:
        logging.info("Login successful")
        return session
    else:
        logging.error(f"Login failed. Status code: {response.status_code}")
        return None

# Example usage
login_url = input("Enter the URL of the login page: ")
username = input("Enter your NetID/Username: ")
password = input("Enter your password: ")

session = login(login_url, username, password)

if session:
    #run code if login is successful
    pass
else:
    print("Login failed. Please check your credentials and try again.")