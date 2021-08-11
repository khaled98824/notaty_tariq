const baseUrl = 'https://tariq-notaty.herokuapp.com';

async function addNote(noteData){
    const response = await fetch(`${baseUrl}/notes`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(noteData)
    });
    return response;
}


//update note
async function updateNote(noteData){
    const response = await fetch(`${baseUrl}/notes`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(noteData)
    });
    return response;
}


//delete note
async function deleteNote(noteId){
    const response = await fetch(`${baseUrl}/notes/${noteId}`,{
        method: "DELETE",
    });
    return response;
}


//get by Id note
async function getNoteById(noteId){
    const response = await fetch(`${baseUrl}/notes/${noteId}`);
    return response.json();
}



//get all notes
async function getNotes(noteTitle){
    let url = `${baseUrl}/notes`;
    if(noteTitle){
        url += `/?title=${noteTitle}`;
    }
    const response = await fetch(url);
    return response.json();
}
