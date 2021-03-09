const express = require('express');
const app = express();
const uuid = require('uuid');
const morgan = require('morgan');
let persons = [
    {
    name : "gil",
    number : "0526193164",
    id : "0"
    },
    {
    name : "shir N",
    number : "0506764046",
    id : "1"
    },
    {
    name : "mom",
    number : "0528772464",
    id : "2"
    },
    {
    name : "shir L",
    number : "0526412661",
    id : "3"
    },
    {
    name : "dad",
    number : "0527929533",
    id : "4"
    },
    {
    name : "yair",
    number : "0542221273",
    id : "5"
    }
]
app.use(express.json())
app.use(morgan("tiny"));

app.use(express.static("./build"));

app.get('/api/persons', (req,res) => {
    res.json(persons);
})

app.delete('/api/persons/:id',(req,res) => {
    const id = (req.params.id);
    console.log("id:",id);
    const listOfId = persons.filter(person => person.id === id);
    console.log("list of id:",listOfId);
    if(listOfId.length === 0) {
        res.status(404).send("no such person");
    } else {
        console.log("else")
        persons = persons.filter(person => person.id !== id)
        res.send(persons)
    }
})
app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id;
    if(persons[id]) {
        res.send(persons[id]);
    } else {
        res.status(404).send("No such person");
    }
})

app.get('/info', (req,res) => {
    const response = `Phone book have ${persons.length} persons \n  ${new Date}`;
    res.send(response);
})
app.post('/api/persons',(req,res) => {
    const newPerson = req.body;
    if(newPerson.name) {
        const names = persons.map(person => person.name);
        const checkName = names.filter(name => name === newPerson.name);
        if(checkName.length === 0){
            newPerson.id = uuid.v4();
            persons.push(newPerson);
            res.send(persons)
        } else {
            res.status(400).send("Must choose uniq name")
        }
    } else {
        res.status(400).send("Must write a name")
    }
})

module.exports = app;