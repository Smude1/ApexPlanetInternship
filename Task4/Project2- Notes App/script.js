let notes = JSON.parse(localStorage.getItem("notes")) || [];

displayNotes();

function addNote() {

    let input = document.getElementById("noteInput");
    let note = input.value.trim();

    if(note === ""){
        alert("Enter a note");
        return;
    }

    notes.push(note);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    input.value = "";

    displayNotes();
}

function displayNotes() {

    let notesList = document.getElementById("notesList");
    let notesCount = document.getElementById("notesCount");

    notesList.innerHTML = "";
    notesCount.textContent = `${notes.length} ${notes.length === 1 ? "note" : "notes"} saved`;

    if(notes.length === 0) {
        notesList.innerHTML = `
            <li class="empty-state">
                No notes yet. Add your first idea above.
            </li>
        `;
        return;
    }

    for(let i = 0; i < notes.length; i++) {

        notesList.innerHTML += `
            <li>
                <span class="note-text">${escapeHtml(notes[i])}</span>
                <div class="note-actions">
                    <button class="edit-btn" onclick="editNote(${i})">Edit</button>
                    <button class="delete-btn" onclick="deleteNote(${i})">Delete</button>
                </div>
            </li>
        `;
    }
}

function editNote(index) {

    let updatedNote = prompt("Edit your note:", notes[index]);

    if(updatedNote === null) {
        return;
    }

    updatedNote = updatedNote.trim();

    if(updatedNote === "") {
        alert("Note cannot be empty");
        return;
    }

    notes[index] = updatedNote;

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
}

function escapeHtml(text) {

    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function deleteNote(index) {

    notes.splice(index,1);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
}

function clearAllNotes() {

    if(notes.length === 0) {
        return;
    }

    let confirmDelete = confirm("Clear all saved notes?");

    if(!confirmDelete) {
        return;
    }

    notes = [];

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
}