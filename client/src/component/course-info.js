import React from 'react';
import './styles/course-info.css'; // Don't forget to create this CSS file for styling

const CourseDetails = ({ selectedCourses, teacherInfo, stats }) => {
    console.log(selectedCourses, teacherInfo, stats);
  return (
    (!selectedCourses || !teacherInfo || !stats) ? (
      <p>Lading...</p>
    ) : (
      <div className="CourseDetails">
        <h2>Course Details</h2>

        {selectedCourses.map((course, index) => (
          <div key={course.code}>
            <h3>Selected Course Info</h3>
            <div>
              <p>{course.name}</p>
              <p>{course.code}</p>
            </div>

            <h3>Teacher Info</h3>
            <div>
              <p>{teacherInfo[index].name}</p>
              <p>{teacherInfo[index].email}</p>
            </div>

            <h3>Statistics</h3>
            <div>
              <p>Total Students: {stats[index].totalStudents}</p>
              <p>Pass Rate: {stats[index].passRate}%</p>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default CourseDetails;
