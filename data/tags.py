from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# # Configure Chrome options (optional)
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')  # Run Chrome in headless mode (no GUI)

# Initialize Chrome WebDriver
chrome_service = ChromeService(executable_path='chromedriver_mac64/chromedriver')  # Replace with the path to your chromedriver executable
driver = webdriver.Chrome(service=chrome_service, options=chrome_options)

def get_tags(url):
    import requests
    from bs4 import BeautifulSoup

    # Specify the URL of the website you want to scrape
    # url = f'https://www.ratemyprofessors.com/professor/2482285'

    # Send an HTTP request to the URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    tag_count = dict()
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        tags = soup.find_all('span', {'class': 'hHOVKF'})
        tags = [tag.text for tag in tags]
        for tag in tags:
            if tag not in tag_count.keys():
                tag_count[tag] = 1
            else:
                tag_count[tag] += 1
    return tag_count

def get_website(name):
    name = name.replace(' ', '%20') # make it so we can put name inside of html query
    url = f'https://www.ratemyprofessors.com/search/professors/1003?q={name}'
    TEACHER_CARD_CLASS = 'dLJIlx'

    # Open the webpage
    driver.get(url)

    try:
        # Wait for a specific element to load (adjust as needed)
        element_present = EC.presence_of_element_located((By.CLASS_NAME, TEACHER_CARD_CLASS))
        WebDriverWait(driver, timeout=3).until(element_present)

        card = driver.find_elements(By.CLASS_NAME, TEACHER_CARD_CLASS)[0]
        website = card.get_attribute('href')
        return website
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    get_tags('Thomas s')