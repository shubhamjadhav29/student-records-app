const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error('GET Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('POST Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE a student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (error) {
    console.error('DELETE Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT: Update student
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('PUT Error:', error.message);
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

  
module.exports = router;
