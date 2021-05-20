require('dotenv').config();
const fetch = require("node-fetch");
const express = require('express')
const app = express();
const cors = require('cors')
const pool = require("./db")
const { sendConfirmationEmail } = require('./mailer');

//middleware
app.use(cors());
app.use(express.json());   // req.body (request json)

//BUILD ROUTES WITH POSTGRES QUERIES//

app.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, username, password} = req.body;
       
        const existingUsers = await fetch("http://localhost:5000/data");
        const jsonExistingUsers = await existingUsers.json();

        const rUser = await jsonExistingUsers.find(user => user.email === email);

        if (rUser) { return res.status(422).send('User is already registered!')} 
        const newUser = await pool.query("INSERT INTO register (firstname, lastname, email, username, password) VALUES($1,$2,$3,$4,$5) RETURNING *", [firstname,lastname,email,username,password]);
        res.json(newUser)

        const allUsers = await fetch("http://localhost:5000/data");
        const jsonAllUsers = await allUsers.json();

        const user = await jsonAllUsers[jsonAllUsers.length-1]
        await sendConfirmationEmail({toUser: user, id: user.id});
    
        res.json({message: 'You have been registered.'});
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/data", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM register");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/login", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT username, password FROM register");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/login", async (req, res) => {
    try {
        const { username } = req.body;
        const { password } = req.body;
        const todo = await pool.query("SELECT * FROM register WHERE username=$1 AND password=$2", [username, password]);
        res.json(todo.rows[0]);
        console.log('Success');
    } catch (error) {
        console.error(error.message);
    }
})

app.get('/api/activate/user/:hash', async (req, res) => {
    const { hash } = req.params;
    console.log(hash)
    try {
        const existingUsers = await fetch("http://localhost:5000/data");
        const jsonExistingUsers = await existingUsers.json();

        const rUser = await jsonExistingUsers.find(user => user.id === hash);

      res.json({message: `User ${hash} has been activated`})
    } catch {
      res.status(422).send('User cannot be activated!');
    }
  })

//update a todo

/*app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const UpdateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated!");
    } catch (error) {
        console.error(error.message);
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted");
    } catch (error) {
        console.error(error.message);
    }
}) */

app.listen(5000, () => {
    console.log('Server has started on port 5000');
})

