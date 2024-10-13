const express = require('express');
const NoteModel = require('../models/NotesModel.js');

const app = express.Router();
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save

app.post('/notes', async (req, res) => {
    // Validate request
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note

    const noteData = req.body;
    try {
        const note = new NoteModel(noteData)
        const newNote = await note.save()
        res.send(newNote);
    }
    catch(err) {
        res.status(500).send({message: err.message});
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to returns all note

    NoteModel.find()
        .then((notes) => {
            res.send(notes)
    }).catch((err) => {
        res.status(500).send({message: err.message});
    })
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to return only one note using noteid

NoteModel.findById(req.params.noteId)
        .then((note) => {
            if (note) {
                res.send(note);
            }
            else {
                res.status(404).send({message:"Note with that id not found"});
            }
        }).catch((err) => {
            res.status(500).send({message: err.message});
    })
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid

NoteModel.findByIdAndUpdate(req.params.noteId, req.body, {new: true})
        .then((note) => {
            if (note) {
                res.send(note)
            }
            else {
                res.status(404).send({message:"Note with that id not found"});
            }
        }).catch((err) => {
            res.status(500).send({message: err.message});
    })
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to delete the note using noteid
NoteModel.findByIdAndDelete(req.params.noteId)
        .then((note) => {
            if (note) {
                res.send(note)
            }
            else {
                res.status(404).send({message:"Note with that id not found"});
            }
        }).catch((err) => {
            res.status(500).send({message: err.message});
    })
});

module.exports = app;
