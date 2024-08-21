const Tasks = require('../models/tasks.model');
const { sequelize } = require('../config/db');
const { ValidationError } = require('sequelize')

// Create Task API
const createTask = async (req, res) => 
{
    try {
        const { title, description, status, createdBy } = req.body;

        // Check for extra fields in req.body
        const allowedFields = ['title', 'description', 'status', 'createdBy'];
        const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));

        if (extraFields.length > 0) 
        {
            return res.status(400).json({ message: `Field(s) ${extraFields.join(', ')} do not exist in schema` });
        }

        // Check for missing required fields
        if (!title || !description || !status || !createdBy) 
        {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        // Check if title already exists
        const checkTitle = await Tasks.findOne({ where: { title } });
        if (checkTitle) 
        {
            return res.status(400).json({ message: "Title already exists" });
        }

        // Create task
        const task = await Tasks.create({ title, description, status, createdBy });
        if (task) 
        {
            res.status(201).json({ message: 'Task Created', data: task });
        } else {
            res.status(500).json({ message: 'Task could not be created' });
        }
    } 
    catch (error) 
    {
        if (error instanceof ValidationError) 
        {
            res.status(400).json({ message: error.errors[0].message });
        } 
        else 
        {
            res.status(500).json({ message: error.message });
        }
    }
};

// Update Task API
const updateTask = async (req, res) => 
{
    try
    {
        const { id } = req.params;
        const { title, description, status, createdBy } = req.body;
        const allowedFields = ['title', 'description', 'status', 'createdBy'];
        const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));

        // Check Extra Field Validation
        if (extraFields.length > 0) 
        {
            return res.status(400).json({ message: `Field(s) ${extraFields.join(', ')} do not exist in schema` });
        }
        // Check ID
        if (!id) 
        {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        if(title)
        {
            const checkTitle = await Tasks.findOne({ where: { title } });
            if (checkTitle) 
            {
                return res.status(400).json({ message: "Title already exists" });
            }
        }

        // Update Task
        const updatedTask = await Tasks.update({ title, description, status, createdBy }, {
            where: { id: id }})
        if( updateTask)
        {
            res.status(201).json({message: 'Task updated Successfully...'})
        }
        else
        {
            res.send('Error while updating task...')
        }
    }
    catch(error)
    {
        res.send(error)
    }
}

// Get All Tasks API
const getTasks = async (req,res)=>
{
    try
    {
        const tasks = await Tasks.findAll();
        if(tasks.length)
        {
            res.status(200).json({message: 'Tasks Fetched Successfully..', data: tasks})
        }
        else
        {
            res.status(200).json({message: 'There are no tasks...'})
        }
    }
    catch(error)
    {
        res.send(error)
    }
}

// Delete Task API
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        const deleted = await Tasks.destroy({
            where: { id: id }
        });

        if (deleted) {
            return res.status(200).json({ message: 'Task Deleted Successfully' });
        } 
        else 
        {
            return res.status(404).json({ message: 'Task Not Found' });
        }
    } 
    catch (error) 
    {
        if (!res.headersSent) 
        {
            return res.status(500).json({ message: 'Error Deleting Task', error: error.message });
        }
    }
};


module.exports ={ createTask, updateTask , getTasks, deleteTask };