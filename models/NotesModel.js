const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated


const mongoose = require('mongoose');

// Define the schema for the 'Note' model
const noteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: [true, 'Note title is required'],
        unique: true,
        lowercase: true
    },
    noteDescription: {
        type: String,
        required: [true, 'Note description is required']
    },
    priority: {
        type: String,
        enum: {
            values: ['HIGH', 'MEDIUM', 'LOW'],
            message: '{VALUE} is not a valid priority'
        },
        required: [true, 'Priority is required']
    },
    dateAdded: {
        type: Date,
        default: Date.now, // Automatically set the current date when a note is added
        required: true
    },
    dateUpdated: {
        type: Date,
        default: Date.now, // Automatically set the current date when a note is updated
        required: true
    }
});

// Create the 'Note' model using the schema
const Note = mongoose.model('Note', noteSchema);

// Export the model for use in other parts of the application
module.exports = Note;

