// client/src/components/StudentForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentForm({ onAdd, editStudent, onUpdate, clearEdit }) {
  const [formData, setFormData] = useState({ name: '', class: '', age: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editStudent) {
      setFormData(editStudent);
    } else {
      setFormData({ name: '', class: '', age: '' });
    }
  }, [editStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for name: letters only
    if (name === 'name' && /[^a-zA-Z\s]/.test(value)) {
      setErrors((prev) => ({ ...prev, name: 'Only letters allowed in Name' }));
    } else if (name === 'name') {
      setErrors((prev) => ({ ...prev, name: '' }));
    }

    // Validation for age: numbers only
    if (name === 'age' && /[^0-9]/.test(value)) {
      setErrors((prev) => ({ ...prev, age: 'Only numbers allowed in Age' }));
    } else if (name === 'age') {
      setErrors((prev) => ({ ...prev, age: '' }));
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    if (!formData.name || !formData.class || !formData.age) {
      alert("Please fill all the fields");
      return;
    }

    if (errors.name || errors.age) {
      alert("Fix the form errors before submitting.");
      return;
    }

    try {
      if (editStudent) {
        const res = await axios.put(`/api/students/${editStudent._id}`, formData);
        onUpdate(res.data);
        clearEdit();
      } else {
        const res = await axios.post('/api/students', formData);
        onAdd(res.data);
      }

      setFormData({ name: '', class: '', age: '' });
    } catch (error) {
      alert("Error submitting form. Check backend.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      {errors.name && <p style={{ color: 'red', marginTop: '-10px' }}>{errors.name}</p>}

      <input
        name="class"
        placeholder="Enter Class"
        value={formData.class}
        onChange={handleChange}
        required
      />

      <input
        name="age"
        placeholder="Enter Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      {errors.age && <p style={{ color: 'red', marginTop: '-10px' }}>{errors.age}</p>}

      <button type="submit">{editStudent ? 'Update' : 'Submit'}</button>
      {editStudent && <button type="button" onClick={clearEdit}>Cancel</button>}
    </form>
  );
}
