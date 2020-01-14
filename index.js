const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const port = 5000;

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send({api: 'If this prints out, API is running.'});
});


server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        });
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(id => {
            if (id) {
                res.status(200).json(id);
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The user information could not be retrieved."});
        });
});

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (user.name && user.bio) {
        db.insert(user)
            .then(id => {
                res.status(200).json({...id, ...user});
            })
            .catch(error => {
                console.log('error on post for users', error);
                res.status(500).json({message: "There was an error while saving the user."});
            });
    } else {
        res.status(400).json({message: "Please provide both the name and bio for the user."});
    }
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    let userToDelete = {};
    db.findById(userId)
        .then(returnedUser => {
            userToDelete = returnedUser;
        });
    console.log(userToDelete);
    db.remove(userId)
        .then(id => {
            if (id) {
                res.status(200).json({
                    message: `The user with ID of ${userId} has been removed.`,
                    deletedUser: {...userToDelete}
                });
            } else {
                res.status(500).json({message: "The user could not be removed."});
            }

        })
        .catch(error => {
            console.log('error when deleting a user  ', error);
            res.status(404).json({message: `The user with the specified ID of ${userId} does not exist.`});
        });
});

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    let oldUserData = {};
    db.findById(userId)
        .then(user => {
            oldUserData = user;
        });
    if (userData.name && userData.bio) {
        db.update(userId, userData)
            .then(count => {
                if (count) {
                    res.status(200).json({...count, oldUserData: {...oldUserData}, updatedFields: {...userData}});
                } else {
                    res.status(404).json({message: `The user with the specified ID of ${userId} does not exist`});
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({error: 'The user information could not be modified.'});
            });
    } else {
        res.status(400).json({message: 'Please provide name and bio for the user.'});
    }
});


server.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});