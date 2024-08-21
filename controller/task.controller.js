const Tasks = require('../models/tasks.model');
const { sequelize } = require('../config/db')

const createTask= async (req, res) =>
{
    try{
        const{ title, description, status } = req.body; 
        if( !title || !description || !status)
        {
            return res.status(400).json({message: 'Please fill all required fields'})
        }
        // await sequelize.sync(); 
        const task = await Tasks.create({title, description,status})
        if(task)
        {
           res.status(201).json({message: 'Task Created', data: task})
        }
        else 
        {
            res.send('Task can not Created...')
        }
    }
    catch (error)
    {
        res.send(error)
    }
    
}

const updateTask = async (req, res) => 
{
    try
    {
        const { id } = req.params;
        const { title, description, status } = req.body;

        if (!id) 
        {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        const updatedTask = await Tasks.update({ title, description, status }, {
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
        } else {
            return res.status(404).json({ message: 'Task Not Found' });
        }
    } 
    catch (error) 
    {
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Error Deleting Task', error: error.message });
        }
    }
};


module.exports ={ createTask, updateTask , getTasks, deleteTask };