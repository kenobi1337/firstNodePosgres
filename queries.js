const { request } = require('express');
const pool = require('./connectDB');
const userRouter = require('express').Router();

userRouter.param('id', (req, res, next, id) => {
    const ID = id;
    req.id = ID;
    next();
})

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id', (err, results) => {
       if (err) {
           throw err;
       }
       res.json(results.rows)
    })
}

const getUserById = (req, res) => {
    pool.query('SELECT * FROM users WHERE id = $1', [req.id], (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results.rows);
    })
}

const createNewUser = (req, res) => {
    const { name, email } = req.body;
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`You created a user with ID: ${results.rows[0].id}`)
    })
}

const updateUser = (req, res) => {
    const { name, email } = req.body;
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, req.id], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(`User modified with id of ${req.id}`);
    })
}

const deleteUser = (req, res) => {
    pool.query('DELETE FROM users WHERE id = $1', [req.id], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`You deleted user with Id: ${req.id}`);
    })
}
/*
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }*/

module.exports = {
    userRouter,
    getUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
}