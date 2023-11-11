import requests
from bs4 import BeautifulSoup

def get_professors(dept, number):
    # Specify the URL of the website you want to scrape
    url = f'https://anex.us/grades/?dept={dept}&number={number}'

    # Send an HTTP request to the URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find('table', {'id': 'dataTable'})
        breakpoint()
        header_row = table.find('tr')
        column_names = [th.text.strip() for th in header_row.find_all('th')]
        professor_index = column_names.index('Prof')

        if table:
            for row in table.find_all('tr'):
                cells = row.find_all('td')
                print(cells[professor_index].text.strip())
    else:
        print('Failed to retrieve the web page. Status code:', response.status_code)

if __name__ == '__main__':
    get_professors('CHEM', '102')