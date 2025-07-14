// client/src/App.js
import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';
import axios from 'axios';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const handleAdd = () => {
    setRefresh(!refresh);
  };

  const handleEditStudent = async (updatedStudent) => {
    try {
      await axios.put(`http://localhost:5000/api/students/${updatedStudent._id}`, updatedStudent);
      alert(' Record Edited Successfully');
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error updating student:', error);
      alert(' Failed to update record');
    }
  };

  return (
    <div className="app-container">
      <h1>Student Records Form</h1>
      <StudentForm
        onAdd={handleAdd}
        editStudent={editStudent}
        onUpdate={handleEditStudent} 
        clearEdit={() => setEditStudent(null)}
      />
      <h2>Inserted Student's Data</h2>
      <StudentList
        refresh={refresh}
        onEditStudent={setEditStudent}
      />
    </div>
  );
}

export default App;
