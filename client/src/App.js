// App.js
import React from 'react';
import "./App.css";
import ChatComponent from './component/chat';
import CourseDetails from './component/course-info';
import CourseSelection from './component/courses';
import Navbar from './component/navbar';

const majors = ['Computer Science', 'Mathematics', 'Physics'];

const courses = {
  'Computer Science': ['CS101', 'CS201', 'CS301'],
  Mathematics: ['Math101', 'Math201', 'Math301'],
  Physics: ['PHY101', 'PHY201', 'PHY301'],
};


const selectedCourse = {
    name: 'Introduction to React',
    code: 'REACT101',
  };
  
  const teacherInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };
  
  const stats = {
    totalStudents: 50,
    passRate: 80,
  };

const App = () => {
  return (
    <div>

      <Navbar />
      <body></body>
      <ChatComponent/>
      <CourseSelection majors={majors} courses={courses}/>
      <CourseDetails selectedCourse={selectedCourse} teacherInfo={teacherInfo} stats={stats} />
    </div>
  );
};

export default App;
