let tasks = []

let currentStatusFilter = 'all'

let currentCategoryFilter = 'all'

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    console.log('💾 Tasks saved to local storage!')
}

function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
        tasks = JSON.parse(savedTasks)
        console.log('📂 Tasks loaded from local storage!', tasks)
    }
}
function addTask() {
    const taskName = document.getElementById('task-name').value
    const taskCategory = document.getElementById('task-category').value
    const taskDealine = document.getElementById('task-deadline').value
    if (taskName === '' || taskDealine === '') {
        alert('Plesde fill out both task name and deadline!')
        return
    }
    const newTask = {
        id: Date.now(),
        name: taskName,
        category: taskCategory,
        deadline: taskDealine,
        status: 'In Progress'
    }
    tasks.push(newTask)
    saveToLocalStorage()
    displayTasks()
    document.getElementById('task-name').value = ''
    document.getElementById('task-deadline').value = ''
    console.log('Task added!', newTask)
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== taskId)
        saveToLocalStorage()
        displayTasks()
        console.log('🗑️ Task deleted!')
    }
}

function displayTasks() {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = ''
    checkOverdueTasks()
    let filteredTasks = tasks
    if (currentStatusFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.status === currentStatusFilter)
    }
    if (currentCategoryFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.category === currentCategoryFilter)
    }
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<p class="no-tasks">No tasks match your filters. Try a different filter.</p>'
        return
    }
    filteredTasks.forEach(task => {
        const taskCard = document.createElement('div')
        taskCard.className = 'task-card'
        let statusClass = 'status-in-progress'
        if (task.status === 'Completed') {
            statusClass = 'status-completed'
        } else if (task.status === 'Overdue') {
            statusClass = 'status-overdue'
        }
        taskCard.innerHTML = `
            <div class="task-header">
                <span class="task-name">${task.name}</span>
            </div>
            <div class="task-info">
                <span class="task-badge category-badge"> ${task.category}</span>
                <span class="task-badge"> ${formatDate(task.deadline)}</span>
                <span class="status-badge ${statusClass}">${task.status}</span>
            </div>
            <div class="task-actions">
                <select class="status-select" onchange="updateTaskStatus(${task.id}, this.value)">
                    <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `
        taskList.appendChild(taskCard)
    })
}

function formatDate(dateString) {
    const date = new Date(dateString)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
}

document.getElementById('add-task-btn').addEventListener('click', addTask)

function filterByStatus(status) {
    currentStatusFilter = status
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('active')
        if (btn.getAttribute('data-filter') === status) {
            btn.classList.add('active')
        }
    })
    displayTasks()
    console.log(`🔍 Filtering by status: ${status}`)
}

document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter')
        filterByStatus(filter)
    })
})

function filterByCategory(category) {
    currentCategoryFilter = category
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.classList.remove('active')
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active')
        }
    })
    displayTasks()
    console.log(`🔍 Filtering by category: ${category}`)
}

document.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category')
        filterByCategory(category)
    })
})

function checkOverdueTasks() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    tasks.forEach(task => {
        const deadline = new Date(task.deadline)
        deadline.setHours(0, 0, 0, 0)
        if (deadline < today && task.status !== 'Completed') {
            task.status = 'Overdue'
        }
    })
    saveToLocalStorage()
}

document.getElementById('task-name').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask()
    }
})

function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
        task.status = newStatus
        saveToLocalStorage()
        displayTasks()
        console.log(`✅ Task "${task.name}" updated to: ${newStatus}`)
    }
}

function checkOverdueTasks() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    tasks.forEach(task => {
        const deadline = new Date(task.deadline)
        deadline.setHours(0, 0, 0, 0)
        if (deadline < today && task.status !== 'Completed') {
            task.status = 'Overdue'
        }
    })
    saveToLocalStorage()
}
