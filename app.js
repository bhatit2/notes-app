console.log('starting app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
const command = process.argv[2];
const title = {
    describe : 'title of note',
    demand : true,
    alias : 't'
};
const body = {
    describe : 'body of note',
    demand : true,
    alias : 'b'
};
const argv = yargs
        .command('add', 'add note', {
            title,
            body 
        })
        .command('remove', 'remove note', { title })
        .command('list', 'get list of notes')
        .command('read', 'get a note with title', { title })
        .help()
        .argv;
if(command == 'add'){
    notes.addNote(argv.title, argv.body)
} else if (command == 'list'){
    notes.getAll();
} else if (command == 'read'){
    notes.getNote(argv.title);
} else if (command == 'remove'){
    const noteRemoved = notes.removeNote(argv.title);
    noteRemoved ? console.log('Note removed successfully') : console.log('some problem in removing the note');
} else{
    console.log('command not recognoized');
}