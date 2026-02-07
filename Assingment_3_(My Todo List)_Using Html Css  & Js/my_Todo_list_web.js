const inputtask = document.getElementById('input');
const addbutton = document.getElementById('addBtn');
const todolist = document.getElementById('todoList');
const clearbutton = document.getElementById('clearBtn');
const clearDoneButton = document.getElementById('clearDoneBtn');
const emptyMsg = document.getElementById('emptyMsg');

const totalcount = document.getElementById('total');
const donecount = document.getElementById('completed');
const remaincount = document.getElementById('remainCount');


const filterBtns = document.querySelectorAll('.filter-btn');


function updateCounts() {
    const alltask = document.querySelectorAll('#todoList li:not(.empty_message)')
    const donetask = document.querySelectorAll('#todoList li.done')

    const total = alltask.length;
    const done = donetask.length;
    const remain = total - done;

   totalcount.innerText = total;
   donecount.innerText = done;
   remaincount.innerText = remain;

   if (total === 0) {
       emptyMsg.style.display = 'block';
   } else {
       emptyMsg.style.display = 'none';
   }
}

addbutton.addEventListener('click', function() {
    const taskText = inputtask.value;
    if (taskText === "")
    {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement('li');

    li.innerHTML = `
         <div class="task-info">
            <span class="task-text">${taskText}</span>
        </div>
        <button class="delete-btn">Delete</button>
    `;
    todolist.appendChild(li);
    inputtask.value = "";
    updateCounts();
});

inputtask.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addbutton.click();
    }
});

todolist.addEventListener('click', function(event) {
    const target = event.target;

    if(target.classList.contains('task-text')) {
        const li = target.parentElement.parentElement;
        li.classList.toggle('done');
        updateCounts();
    }
       if (target.classList.contains('delete-btn')) {
        const li = target.parentElement;
        li.remove();
        updateCounts();
    }
});

todolist.addEventListener('dblclick', function(event) {
    const target = event.target;

    if (target.classList.contains('task-text')) {
        const currentText = target.innerText;
        const taskInfo = target.parentElement;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = currentText;

        taskInfo.replaceChild(editInput, target);
        editInput.focus();

        editInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveEdit();
               }
        });
        editInput.addEventListener('blur', saveEdit);

        function saveEdit() {
            const newText = editInput.value;
            if (newText !== "") {
                const newSpan = document.createElement('span');
                newSpan.className = 'task-text';
                newSpan.innerText = newText;
                taskInfo.replaceChild(newSpan, editInput);
            }
        }
    }
});

filterBtns.forEach(function(button) {
    button.addEventListener('click', function() {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        const tasks = document.querySelectorAll('#todoList li:not(.empty_message)');

        tasks.forEach(function(task) {
            task.classList.remove('hidden');

            if (filter === 'completed' && !task.classList.contains('done')) {
                task.classList.add('hidden');
            }
            if (filter === 'active' && task.classList.contains('done')) {
                task.classList.add('hidden');
            }
        });
    });
}); 

clearDoneBtn.addEventListener('click', function() {
    const tasks = document.querySelectorAll('#todoList li.done');

    tasks.forEach(function(task) {
        task.remove();
    });

    updateCounts();
});


clearBtn.addEventListener('click', function() {
    const tasks = document.querySelectorAll('#todoList li:not(.empty_message)');
    tasks.forEach(function(task) {
        task.remove();
    });
    updateCounts();
});
