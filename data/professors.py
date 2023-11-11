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

def get_professors(dept, number):
    url = f'https://anex.us/grades/?dept={dept}&number={number}'
    TARGET_COLUMN = 'Prof'
    TABLE_ID = 'dataTable'

    # Open the webpage
    driver.get(url)

    try:
        # Wait for a specific element to load (adjust as needed)
        element_present = EC.presence_of_element_located((By.ID, TABLE_ID))
        WebDriverWait(driver, timeout=3).until(element_present)

        table = driver.find_element(By.ID, TABLE_ID)

        element_present = EC.presence_of_element_located((By.TAG_NAME, 'tr'))
        WebDriverWait(table, timeout=3).until(element_present)

        rows = table.find_elements(By.TAG_NAME, 'tr')

        header = rows[0].find_elements(By.TAG_NAME, 'td')
        header = [header_cell.text for header_cell in header]
        target_index = header.index(TARGET_COLUMN)

        rows = rows[1:]

        professors = set()
        for row in rows:
            row = row.find_elements(By.TAG_NAME, 'td')
            row = [row_cell.text for row_cell in row]
            professors.add(row[target_index])

        return list(professors)

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        # Close the browser
        driver.quit()