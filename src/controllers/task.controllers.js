import Task from '../models/Task'
import {getPagination} from '../libs/getPagination'
import { query } from 'express';

//POST createTask
export const createTask = async(req,res) => {
    if(!req.body.title){
        return res.status(400)
        .send({message:'content cannot be empty'});
    } 
    try{

    const newTask = new Task ({
        title: req.body.title,
        description: req.body.description, 
        done: req.body.done ? req.body.done : false
    });
    
    const taskSave = await newTask.save();
    res.json(taskSave);
    
    }catch(error){
    
        res.status(500).json({
        message: error.message || 'something goes wrong creating a task'
    });
    
    }
}

// GET findAllTask
export const findAllTask = async (req,res)=>{
    try{
        const {size,page,title} = req.query;
        const condition = title 
        ?{
            title:{ $regex : new RegExp(title), $options:"i"},
          } 
        : {};

        const {limit,offset} = getPagination(page,size);
        
        const data = await Task.paginate(condition,{offset:offset,limit:limit});
        console.log(data);
        res.json({
            totalItams:data.totalDocs,
            tasks:data.docs,
            totalPages:data.totalPages,
            currenPages: data.page-1,
        });

    }catch(error){
        res.status(500).json({
            message: error.message || 'something goes wrong retrieving the task'
        })
    }
}


// GET findOneTask
export const findOneTask = async(req,res) => {
    const {id} = req.params;

    try{
        const task = await Task.findById(id);

        if(!task){
            return res
            .status(404).
            json({message:`task with id ${id} does not exists`})}
    
        res.json(task);

    }catch(error){
    
            return res
            .status(500).
            json({message: error.message || `error retrieving task with id ${id}`})
    }
}
// GET findAllDoneTask
export const findAllDoneTask = async(req,res) =>{
    const Tasks = await Task.find({done:true});
    res.json(Tasks);   
}
// DELETE deleteTask
export const deleteTask = async(req,res) =>{
    const {id} = req.params;
    
    try{
        await Task.findByIdAndDelete(id);
        res.json({
            message:'Task were deleted sucessfully'
        });
    }catch(error){
        res.status(500).json({
        message: error.message || `cannon delete task with id: ${id}`})
    }
}



// PUT upDateTask
export const upDateTask = async (req,res) =>{
    const UpDateTask = await Task.findByIdAndUpdate(req.params.id,req.body);
    res.json({message:"task was updated succesfully"});
}