const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('fast-csv');
app.use(express.json());

const cs = ['CSCE 110', 'CSCE 111', 'CSCE 120', 'CSCE 121', 'CSCE 181', 'CSCE 201', 'CSCE 206', 'CSCE 221', 'CSCE 222', 'CSCE 285', 'CSCE 289', 'CSCE 291', 'CSCE 305', 'CSCE 310', 'CSCE 312', 'CSCE 313', 'CSCE 314', 'CSCE 315', 'CSCE 320', 'CSCE 331', 'CSCE 350', 'CSCE 399', 'CSCE 402', 'CSCE 410', 'CSCE 411', 'CSCE 412', 'CSCE 413', 'CSCE 416', 'CSCE 420', 'CSCE 421', 'CSCE 426', 'CSCE 429', 'CSCE 430', 'CSCE 431', 'CSCE 432', 'CSCE 433', 'CSCE 434', 'CSCE 435', 'CSCE 436', 'CSCE 438', 'CSCE 439', 'CSCE 440', 'CSCE 441', 'CSCE 442', 'CSCE 443', 'CSCE 444', 'CSCE 445', 'CSCE 446', 'CSCE 447', 'CSCE 448', 'CSCE 449', 'CSCE 450', 'CSCE 451', 'CSCE 452', 'CSCE 456', 'CSCE 461', 'CSCE 462', 'CSCE 463', 'CSCE 464', 'CSCE 465', 'CSCE 469', 'CSCE 470', 'CSCE 477', 'CSCE 481', 'CSCE 482', 'CSCE 483', 'CSCE 485', 'CSCE 489', 'CSCE 491'];
const stat =  ['STAT 182', 'STAT 201', 'STAT 211', 'STAT 212', 'STAT 301', 'STAT 302', 'STAT 303', 'STAT 307', 'STAT 312', 'STAT 315', 'STAT 335', 'STAT 404', 'STAT 406', 'STAT 407', 'STAT 408', 'STAT 414', 'STAT 415', 'STAT 421', 'STAT 424', 'STAT 426', 'STAT 436', 'STAT 438', 'STAT 445', 'STAT 446', 'STAT 459', 'STAT 482', 'STAT 483', 'STAT 484', 'STAT 485', 'STAT 489', 'STAT 491'];
const courseInfo = {'CSCE 110': 'Programming I', 'CSCE 111': 'Introduction to Computer Science Concepts and Programming', 'CSCE 120': 'Program Design and Concepts', 'CSCE 121': 'Introduction to Program Design and Concepts', 'CSCE 181': 'Introduction to Computing', 'CSCE 201': '201 Fundamentals of Cybersecurity', 'CSCE 206': 'Structured Programming in C', 'CSCE 221': 'Data Structures and Algorithms', 'CSCE 222': '222 Discrete Structures for Computing', 'CSCE 285': 'Directed Studies', 'CSCE 289': 'Special Topics in...', 'CSCE 291': 'Research', 'CSCE 305': 'Computational Data Science', 'CSCE 310': 'Database Systems', 'CSCE 312': 'Computer Organization'};

const courses = []

app.get("/courseInfo", (req, res) => {
    res.json({"majors": ["Computer Science", "Computer Engineering", "Stats"] });
});

app.get("/courseInfo2", (req, res) => {
    res.json({"Computer Science": cs, "Stats" : stat, "Computer Engineering": cs});
});

app.get("/courseInfo3", (req, res) => {
    x = {}
   
    for (let i = 0; i < courses.length; i++){
        x[courses[i]] = courseInfo[courses[i]];
    }
    res.json(x)
});

app.post('/api/selectCourse', (req, res) => {
    const { courseCode } = req.body;
  
    
    console.log(`Selected Course Code: ${courseCode}`);
  
    courses.push(courseCode)
    res.json({ message: 'Course selected successfully' });
  });

app.get('/courseInfo4', (req, res) => {
    const filePath = './RMP_Dataset.csv';
    const stream = fs.createReadStream(filePath);
    const dictionary = {};
  
    csv.parseStream(stream, { headers: true })
      .on('data', (row) => {
        const professorName = row.Professor.trim();
        dictionary[professorName] = {
          avgGPA: row['Most Recent Avg GPA'],
          class: row.Class,
          rating: row['RMP Rating'],
          difficulty: row['Level of difficulty'],
          tags: [row['Tag 1'], row['Tag 2'], row['Tag 3'], row['Tag 4'], row['Tag 5']],
        };
      })
      .on('end', () => {
        res.json(dictionary);
      });
  });

app.listen(5003, () => {
    console.log("Server started on port 5005");
});
