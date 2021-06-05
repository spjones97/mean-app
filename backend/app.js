const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');

const List = require('./database/models/list');
const Task = require('./database/models/task');

app.use(express.json()); // allow app to use json data

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); // CORS

// routes/endpoints
app.get('/lists', (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
});

app.post('/lists', (req, res) => {
    (new List({ 'title': req.body.title })
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error)));
});

app.get('/lists/:listId', (req, res) => {
    List.find({ _id: req.params.listId })
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate({ '_id': req.params.listId }, { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.delete('/lists/:listId', (req, res) => {
    List.findByIdAndDelete(req.params.listId)
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
})

app.listen(3000, () => console.log("Server Connected on port 3000"));