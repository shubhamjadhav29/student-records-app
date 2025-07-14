import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActionButtons from './ActionButtons';

export default function StudentList({ refresh, onEditStudent }) {
  const [students, setStudents] = useState([]);
  const [showActions, setShowActions] = useState(null);

  useEffect(() => {
    axios.get('/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching students:', err));
  }, [refresh]);

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    setStudents(students.filter(student => student._id !== id));
    alert('Record Deleted Successfully');
  } catch (err) {
    console.error('Error deleting student:', err);
    alert('Failed to delete record');
  }
};


  return (
    <div className="student-list">
      {students.map((student, index) => (
        <div key={student._id} className="student-item">
          <span>{student.name}</span>
          <span>{student.class}</span>
          <span>{student.age}</span>
          <button onClick={() => setShowActions(showActions === index ? null : index)}>Action</button>
          {showActions === index && (
            <ActionButtons
              onView={() =>
            alert(
             `Student Details:\n\nName: ${student.name}\nClass: ${student.class}\nAge: ${student.age}`
        )
}
              onEdit={() => onEditStudent(student)}
              onDelete={() => handleDelete(student._id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
