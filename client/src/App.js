import React, { useEffect, useState } from 'react';
import "./App.css";
import ChatComponent from './component/chat';
import CourseDetails from './component/course-info';
import CourseSelection from './component/courses';
import Navbar from './component/navbar';



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
      const response = await fetch('/courseInfo3');
      const result = await response.json();
  
      // Convert result dictionary to an array
      const selectedCourseArray = Object.entries(result).map(([code, name]) => ({
        name,
        code,
      }));
  
      setSelectedCourse(selectedCourseArray);
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

      {console.log(selectedCourse)}
      <div>
        {false ? (
          <p>Loading...</p>
        ) : (
            
            <CourseDetails
                selectedCourses={[{ name: "Discrete Math", code: "CSCE 221" }]}
                teacherInfo={[{ name: 'John Doe', email: 'john.doe@example.com' }]}
                stats={[{ totalStudents: 50, passRate: 80 }]}
                />

            )
            
          
        }
      </div>
    </div>
  );
};

export default App;
