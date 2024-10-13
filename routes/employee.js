const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching employees' });
    }
});

// Create a new employee
router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {
        let employee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ error: 'Error creating employee' });
    }
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching employee' });
    }
});

// Update employee by ID
router.put('/employees/:eid', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ error: 'Error updating employee' });
    }
});

// Delete employee by ID
router.delete('/employees', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.query.eid);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting employee' });
    }
});

module.exports = router;
