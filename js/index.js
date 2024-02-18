let task = document.getElementById("task")
let addBtn = document.getElementById("add")

let display = document.querySelector(".notes")

let stickyNotes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []

let editIndex;

function showNotes(notes) {
    let str = ""
    notes.forEach((ele, i) => {
        str += `<div class="note">
        <div class="text">${ele}</div>
        <div class="btn">
            <button onclick="editTask(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
            <button onclick="deleteTask(${i})"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    </div>`
    })
    display.innerHTML = str
}
showNotes(stickyNotes)

addBtn.addEventListener("click", addTask)
window.addEventListener("keypress", (e) => {
    if (e.code == "Enter") {
        addTask()
    }
})



//add function
// function addTask() {
//     let note = task.value.trim()
//     if (!editIndex) {
//         if (note) {
//             stickyNotes.unshift(note)
//             localStorage.setItem("notes", JSON.stringify(stickyNotes))
//             showNotes(stickyNotes)
//         }
//         else {
//             alert("WRITE SOME TASK BEFORE ADDING")
//         }
//     } else {
//         stickyNotes = stickyNotes.map((ele, i) => {
//             if (i == editIndex) {
//                 return note
//             } else {
//                 return ele
//             }
//         })
//         localStorage.setItem("notes", JSON.stringify(stickyNotes))
//         showNotes(stickyNotes)
//         addBtn.innerText = "ADD TASK"
//         addBtn.style.backgroundColor = "green"
//         editIndex = undefined
//     }
//     task.value = ""
// }

function addTask() {
    let note = task.value.trim()
    if (editIndex !== undefined) { // Check if editIndex is not undefined
        if (note) {
            stickyNotes[editIndex] = note; // Update the note at the editIndex
            localStorage.setItem("notes", JSON.stringify(stickyNotes))
            showNotes(stickyNotes)
            editIndex = undefined; // Reset editIndex
            addBtn.innerText = "ADD TASK"
            addBtn.style.backgroundColor = "green"
        } else {
            alert("WRITE SOME TASK BEFORE ADDING")
        }
    } else {
        if (note) {
            stickyNotes.unshift(note)
            localStorage.setItem("notes", JSON.stringify(stickyNotes))
            showNotes(stickyNotes)
        } else {
            alert("WRITE SOME TASK BEFORE ADDING")
        }
    }
    task.value = ""
}


//delete the task

function deleteTask(taskIndex) {
    stickyNotes = stickyNotes.filter((ele, i) => {
        return i !== taskIndex
    })
    localStorage.setItem("notes", JSON.stringify(stickyNotes))
    showNotes(stickyNotes)
}

//edit the task
function editTask(taskIndex) {
    editIndex = taskIndex
    let note = stickyNotes.find((ele, i) => i === taskIndex)
    task.value = note
    addBtn.innerText = "UPDATE"
    addBtn.style.backgroundColor = "red"
}