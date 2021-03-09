const express = require('express');
const app = express();
const uuid = require('uuid');
const morgan = require('morgan');
const persons = [
    {name : "gil",
    number : "0526193164"
    },
    {
    name : "shir N",
    number : "0506764046"
    },
    {
    name : "mom",
    number : "0528772464"
    },
    {
    name : "shir L",
    number : "0526412661"
    },
    {
    name : "dad",
    number : "0527929533"
    },
    {
    name : "yair",
    number : "0542221273"
    }
]
app.use(express.json())
app.use(morgan());

app.use(express.static("./build"));

app.get('/api/persons', (req,res) => {
    res.json(persons);
})

app.delete('/api/persons/:id', async (req,res) => {
    const id = req.params.id;
    if(persons[id]) {
         await persons.splice([id],1);
        res.send(persons)
    } else {
        res.send("no such person");
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
            newPerson.number = uuid.v4()
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