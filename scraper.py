import requests
from bs4 import BeautifulSoup

url = 'https://catalog.tamu.edu/undergraduate/course-descriptions/'
l = ["csce/", "stat"]
urls = []
for x in l:
    urls.append(url + x)
courses = {}
for url in urls:

    response = requests.get(url)
    

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all elements with a specific class
        elements_with_class = soup.find_all(class_='courseblocktitle')

        # Print or process the elements
        for element in elements_with_class:
            className = ""
            courseIds = []

            # Extract the text content of the element
            s = str(element.text).replace('\xa0', ' ')

            # Find the second space index
            second_space_index = s.find(' ', s.find(' ') + 1)

            # Extract class name
            className = s[second_space_index + 1:]

            # Extract course IDs
            ids = s[:second_space_index].split("/")
            courseIds.extend(ids)

            # Update the courses dictionary
            for course_id in courseIds:
                courses[course_id.strip()] = className.strip()

            print((className))

        print(courses)

    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
