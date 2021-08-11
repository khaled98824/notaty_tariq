const { response } = require("express");

function openAddModal() {
    var model = document.getElementById('addNoteModal');
    var closeSpan = document.getElementById('closeAdd');
    var cancelButton = document.getElementById('cancelAddNoteBtn');

    clearFields();

    model.style.display = "block";

    closeSpan.onclick = () => {
        model.style.display = "none";
    }

    cancelButton.onclick = () => {
        model.style.display = "none";
    }
}

//clear
function clearFields() {
    document.getElementById('addTitle').value = "";
    document.getElementById('addContent').value = "";
    document.getElementById('addError').innerHTML = "";

}

function saveNewNote() {
    const titleString = document.getElementById('addTitle').value;
    const contentString = document.getElementById('addContent').value;
    const noteData = { title: titleString, content: contentString };
    if (titleString && contentString) {
        addNote(noteData).then(response => {
            if (response.ok) {
                var model = document.getElementById('addNoteModal');
                model.style.display = "none";
                response.json().then(json =>{
                    var newNoteId = json['_id'];
                    updateNotesTable(newNoteId);
                });
            } else {
                response.text().then(error => {
                    document.getElementById('addError').innerHTML = error;
                });
            }
        }).catch(error => {
            console.log(error);
            response.text().then(error => {
                document.getElementById('addError').innerHTML = error;

            });

        });
    } else {

        console.log('no value');
    }
}

function openEditModel(noteId) {
    var model = document.getElementById('editNoteModal');
    var closeSpan = document.getElementById('closeEdit');
    var cancelButton = document.getElementById('cancelEditNoteBtn');

    model.style.display = "block";

    closeSpan.onclick = () => {
        model.style.display = "none";
    }

    cancelButton.onclick = () => {
        model.style.display = "none";
    }

    loadNoteData(noteId);

}

//save edit
function loadNoteData(noteId) {
    //انشاء اتربيوت يحمل قيمة الاي دي
    var model = document.getElementById('editNoteModal');
    var noteIdAttribute = document.createAttribute('noteid');
    noteIdAttribute.value = noteId;
    model.setAttributeNode(noteIdAttribute);

    getNoteById(noteId).then(data => {
        document.getElementById('editTitle').value = data['title'];
        document.getElementById('editContent').value = data['content'];

    });
}

//save edit
function saveEditNote() {
    var model = document.getElementById('editNoteModal');
    const noteId = model.getAttribute('noteid');
    const titleStr = document.getElementById('editTitle').value;
    const contentStr = document.getElementById('editContent').value;
    const noteData = { _id: noteId, title: titleStr, content: contentStr };
  
    if(noteId && titleStr && contentStr){
        updateNote(noteData).then(response => {
            if (response.ok) {
                var model = document.getElementById('editNoteModal');
                model.style.display = "none";
                updateNotesTable(noteId);
    
            } else {
                response.text().then(error => {
                    document.getElementById('editError').innerHTML = error;
                });
    
            }
        }).catch(error =>{
            document.getElementById('editError').innerHTML = error;
    
        });
    }else{
        console.log('some value empty');
    }
}