'use strict'
const fs = require('fs')
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes()


    const duplicateNote = notes.find((note) => note.title === title)



    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        savedNotes(notes)
        console.log(chalk.bgGreen('new note created'));
    } else {
        console.log(chalk.bgRed('already taken'));
    }

}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)

    } catch (e) {
        return [];
    }
}





const removeNote = (title) => {

    const notes = loadNotes();

    let keptNotes = notes.filter((item) =>

        item.title !== title
    )
    if (notes.length > keptNotes.length) {

        console.log(chalk.bgGreen('note removed'))
        savedNotes(keptNotes);
    } else {
        console.log(chalk.bgRed('not found'));
    }
}


const listNote = () => {
    const notes = loadNotes();
    console.log(chalk.green.inverse('your notes:'));

    notes.forEach(note => {
        console.log(note.title);
    });
}


const readNote = (title) => {
    const notes = loadNotes();

    const readNotes = notes.find(item => item.title === title)
    if (readNotes) {
        console.log(chalk.red.inverse(readNotes.title));
        console.log(chalk.inverse(readNotes.body));

    } else {
        console.log(chalk.red.inverse('Not Found'));
    }

}
const savedNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}



module.exports = {
    'addNote': addNote,
    'removeNote': removeNote,
    'listNote': listNote,
    'readNote': readNote
}


