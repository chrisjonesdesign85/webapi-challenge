const express = require('express');

const projectModel = require('./data/helpers/projectModel');
const actionModel = require('./data/helpers/actionModel');

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
    res.send('Wello Horld!');
});


// GET all projects
server.get('/projects', (req, res) => {
    // GET data from the database
    projectModel.get()
        .then(project => {
            // send data to client
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: 'error retrieving the projects' });
        });
});


// POST
server.post('/projects', (req, res) => {
    const projectInfo = req.body;

    projectModel.insert(projectInfo)
        .then(project => {
            res.status(201).json({
                success: true, project
            });
        })
        .catch(err => {
            res.status(404).json({
                success: false,
                message: "Can't find what you are looking for."
            });
        })
});


// DELETE projects
server.delete('/projects/:id', (req, res) => {
    const id = req.params.id;
    projectModel.remove(id)
        .then(count => {
            if (count) {
                res.status(201).end()
            } else {
                res.status(404)
                    .json({
                        message: 'There is no project with the specified id'
                    });
            }
        })
        .catch(err => res.status(500)
            .json({
                message: 'There was an ERROR while deleting the specified id.'
            })
        )
})


// UPDATE
server.put('/', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    projectModel.update(id, changes)
        .then(update => {
            if (update) {
                res.status(200).json({ success: true, update })
            } else {
                res.status(404)
                    .json({
                        message: 'Something went wrong updating the project',
                    });
            }
        })
        .catch(err => res.status(500)
            .json({ message: 'having trouble getting project action.' })
        )
});


module.exports = server;