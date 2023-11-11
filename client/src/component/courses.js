import React, { useState } from 'react';
import './styles/courses.css';

const CourseSelection = ({ majors, courses }) => {
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMajorChange = (event) => {
    const selectedMajor = event.target.value;
    setSelectedMajor(selectedMajor);

    // Reset selected courses when changing the major
    setSelectedCourses([]);
  };

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
  };

  const handleSubmit = async () => {
    if (selectedCourse.trim() !== '') {
      // Send the selected course to the backend
      await fetch('/api/selectCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseCode: selectedCourse }),
      });

      setSelectedCourses([...selectedCourses, selectedCourse]);
      setSelectedCourse('');
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedCourses([]);
  };

  return (
    <div className="CourseSelection">
      <h2>Course Selection</h2>

      <div>
        <label>Select a Major: </label>
        <select value={selectedMajor} onChange={handleMajorChange}>
          <option value="">-- Select Major --</option>
          {majors.map((major, index) => (
            <option key={index} value={major}>
              {major}
            </option>
          ))}
        </select>
      </div>

      {selectedMajor && (
        <div>
          <label>Select Courses: </label>
          <select value={selectedCourse} onChange={handleCourseChange}>
            <option value="">-- Select Course --</option>
            {courses[selectedMajor].map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {isSubmitted && (
        <div>
          <h3>Selected Courses: </h3>
          <ul>
            {selectedCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseSelection;
