window.addEventListener('load', () => {
    let tasks = []

    let currentStatusFilter = 'all'

    let currentCategoryFilter = 'all'

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

        displayTasks()

        document.getElementById('task-name').value = ''
        document.getElementById('task-deadline').value = ''

        console.log('Task added!', newTask)
    }

    function displayTasks() {
        const taskList = document.getElementById('task-list')

        taskList.innerHTML = ''

        let filteredTasks = tasks

        if (currentStatusFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.status === currentStatusFilter)
        }

        if (currentCategoryFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.status === currentCategoryFilter)
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
                    <button class="delete-btn" onclick="deleteTask(${task.id})"> Delete</button>
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

    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter')
            filterByStatus(filter)
        })
    })

    document.querySelectorAll('[data-category]').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category')
            filterByCategory(category)
        })
    })

    document.getElementById('task-name').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask()
        }
    })
})

