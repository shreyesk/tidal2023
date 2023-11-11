import React, { useEffect, useState } from 'react';
import "./App.css";
import ChatComponent from './component/chat';
import CourseDetails from './component/course-info';
import CourseSelection from './component/courses';
import Navbar from './component/navbar';

const teacherInfo = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
];

const stats = [
  {
    totalStudents: 50,
    passRate: 80,
  },
  {
    totalStudents: 50,
    passRate: 80,
  },
];

const App = () => {
  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState({});

  useEffect(() => {
    fetch("/courseInfo")
      .then((response) => response.json())
      .then((data) => {
        setMajors(data["majors"]);
      });
  }, []);

  useEffect(() => {
    fetch("/courseInfo2")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/courseInfo3'); // Replace with your API endpoint
      const result = await response.json();
      setSelectedCourse(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  useEffect(() => {
    fetch("/courseInfo4")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      });
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval to fetch every second
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <Navbar />
      <body></body>
      <ChatComponent />
      <CourseSelection majors={majors} courses={courses} />
      {/* {console.log(selectedCourse)} */}
      <div>
        {selectedCourse === false ? (
          <p>Loading...</p>
        ) : (
          <CourseDetails
            selectedCourses={[
              { name: selectedCourse["CSCE 121"], code: "CSCE 121" },
              { name: selectedCourse["CSCE 221"], code: "CSCE 221" },
            ]}
            teacherInfo={teacherInfo}
            stats={stats}
          />
        )}
      </div>
    </div>
  );
};

export default App;
