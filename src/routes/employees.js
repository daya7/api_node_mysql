const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//getting
router.get('/', (req,res) =>{

    mysqlConnection.query('SELECT * FROM employees', (err, rows,fields) =>{
        if (!err) {
            res.json(rows);
        }
        else{
            console.log(err);
        }
    });
    
});
//getting params
router.get('/:id', (req,res) =>{
    const {id} = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM employees WHERE id = ?',  [id],  (err, rows,fields) =>{
        if (!err) {
            res.json(rows[0]);
        }
        else{
            console.log(err);
        }
    });
    
});
//post
router.post('/', (req,res) =>{
    const{ id, name, salary }= req.body;
    const query= `
    
    CALL employeeAddOrEdit (?, ?, ?);
    `;
    
    mysqlConnection.query(query, [id, name, salary],  (err, rows,fields) =>{
        if (!err) {
            res.json({Status: 'Employee saved'});
        }
        else{
            console.log(err);
        }
    });
    });
    //update
    router.put('/:id', (req,res) =>{
        const {name, salary} = req.body;
        const {id} = req.params;
        const query= 'CALL employeeAddOrEdit (?, ?, ?)';
    
    mysqlConnection.query(query, [id, name, salary],  (err, rows,fields) =>{
        if (!err) {
            res.json({Status: 'Employee updated'});
        }
        else{
            console.log(err);
        }
    });
    });

    //Delete
    router.delete('/:id', (req,res) =>{
        
        const {id} = req.params;
       
    mysqlConnection.query( 'DELETE FROM employees WHERE id = ?', [id],  (err, rows,fields) =>{
        if (!err) {
            res.json({Status: 'Employee deleted'});
        }
        else{
            console.log(err);
        }
    });
    });
module.exports= router;