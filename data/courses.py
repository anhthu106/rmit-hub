from bs4 import BeautifulSoup as bs
import re
import requests
import json

URL = 'https://www.rmit.edu.vn/study-at-rmit/undergraduate-programs/'
courseFile = 'courses.json'

req = requests.get(URL)
soup = bs(req.text, 'html.parser')
reg = "^/study-at-rmit/undergraduate-programs/bachelor-"
regCourseCode = "^http://www.rmit.edu.au/courses/|^http://www1.rmit.edu.au/courses/|^http://www1.rmit.edu.au/browse"


page = {}
programDict = {}
index = 0

for i in soup.find_all('a'):
    link = i.get('href')
    if (re.match(reg, link)):
        splitIndex = i.get('href').rfind('/')
        page[link[splitIndex + 1:]] = index
        index += 1

courseID = 0

for p in range(len(page) + 1, len(page) + 23):
    bachelor = list(page.keys())[list(page.values()).index(p)]
    r = requests.get(URL + bachelor)
    s = bs(r.text, 'html.parser')

    programCourse = s.find("h2", attrs={
        "class": "pageheader__bgColor__content__heading"}).string
    programDict[programCourse] = {}
    programID = s.find("dd", attrs={
        "class": "desc"}).p.string
    programDict[programCourse]['programID'] = programID
    programDict[programCourse]['courseName'] = {}
    for course in s.find_all('a'):
        courseLink = course.get('href')
        if (re.match(regCourseCode, courseLink)):
            courseName = " ".join(course.text.split())
            if (courseName != ""):
                programDict[programCourse]['courseName'][courseID] = courseName
                courseID += 1

print(programDict)

with open(courseFile, 'w') as f:
    f.write(json.dumps(programDict))
