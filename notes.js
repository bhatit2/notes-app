const fs = require('fs');

const addNote = (title, text)=>{
    let note = {
        title, 
        text
    }
    let notes = [];
    let notesStr;
    try {
        notes = JSON.parse(fs.readFileSync('notes-data.json'));
    } catch(err){
        //console.log(err);
    }
    const duplicateNote = notes.filter((note)=>note.title == title);
    if(duplicateNote.length == 0) {
        notes.push(note)
        notesStr = JSON.stringify(notes);
        fs.writeFileSync('notes-data.json', notesStr);
        console.log("Note added successfully");
    } else{
        console.log('duplicate note');
    }
}

const getAll = ()=>{
    let notes = JSON.parse(fs.readFileSync('notes-data.json'));
    console.log(notes);
}

const getNote = (title) => {
    let notes = JSON.parse(fs.readFileSync('notes-data.json'));
    const note = notes.find((note)=> note.title == title);
    return note ? console.log(note) : console.log('not found');
}

const removeNote = (title)=>{
    let notes = JSON.parse(fs.readFileSync('notes-data.json'));
    const newNotesArray = notes.filter((note)=>note.title !== title);
    fs.writeFileSync('notes-data.json', JSON.stringify(newNotesArray));
    return notes.length !== newNotesArray.length;
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}

