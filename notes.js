const fs = require('fs')
const chalk = require('chalk')



//Adding Note......
const addNote = function (title, body) {
    const notes = loadNotes()  //filter gives subset of notes
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title //Keeps only the title match to it.
    })

/* Doing using Arrow function (syntax).........*/
    // const duplicateNotes = notes.filter((note) => note.title === title )
    //      //Keeps only the title match to it.
    // })

    //const duplicateNote = notes.find((note) => note.title === title)
    
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

//Removing A Note............

const removeNote = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title //Keep only Title does not match...
    })
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    }
   else{
    console.log(chalk.red.inverse(' No Note Found!'))
   }
}

//Listing Notes....
const listNotes = () =>{
    const notes = loadNotes()
    console.log(chalk.inverse("Your Notes"))

    notes.forEach((note) => {
        console.log(note.title)
        
    })
}


//Reading a Notes.....
const readNote = (title) =>{
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse("Note Not Found....."))
    }
}
//Saving Note........
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


//Loading a note...........
const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
   
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}