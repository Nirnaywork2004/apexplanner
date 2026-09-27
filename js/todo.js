/**
 * APEXPLANET WEB DEVELOPMENT INTERNSHIP - TASK 4
 * Requirement 2: To-Do Application with localStorage Persistence & CRUD Operations
 * Developer: Nirnay Mondal
 */

const STORAGE_KEY = 'apexplanet_tasks_v4';

// State
let tasks = [];
let currentFilter = 'all'; // 'all' | 'active' | 'completed'
let searchQuery = '';
let editingTaskId = null;

document.addEventListener('DOMContentLoaded', () => {
  initTodoList();
});

/**
 * Initialize To-Do List Application
 */
function initTodoList() {
  loadTasksFromStorage();
  bindTodoEvents();
  renderTodoList();
}

/**
 * Load tasks from browser localStorage
 */
function loadTasksFromStorage() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData) {
      tasks = JSON.parse(rawData);
      if (!Array.isArray(tasks)) tasks = [];
    } else {
      // Default initial tasks for first-time visitors
      tasks = [
        {
          id: 'task-1',
          text: 'Complete ApexPlanet Task 4 Full Implementation',
          completed: true,
          priority: 'high',
          createdAt: new Date().toISOString()
        },
        {
          id: 'task-2',
          text: 'Test localStorage data persistence on page reload',
          completed: false,
          priority: 'medium',
          createdAt: new Date().toISOString()
        },
        {
          id: 'task-3',
          text: 'Verify mobile hamburger navigation and responsiveness',
          completed: false,
          priority: 'low',
          createdAt: new Date().toISOString()
        }
      ];
      saveTasksToStorage();
    }
  } catch (error) {
    console.error('Failed to parse tasks from localStorage:', error);
    tasks = [];
  }
}

/**
 * Save current tasks to browser localStorage
 */
function saveTasksToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to write tasks to localStorage:', error);
    if (typeof showToast === 'function') {
      showToast('Storage quota exceeded or storage disabled.', 'error');
    }
  }
}

/**
 * Bind DOM Event Listeners
 */
function bindTodoEvents() {
  const form = document.getElementById('todoForm');
  const input = document.getElementById('todoInput');
  const prioritySelect = document.getElementById('todoPriority');
  const filterButtons = document.querySelectorAll('.todo-filter-btn');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');
  const taskSearchInput = document.getElementById('todoSearchInput');

  // Form submit (Add Task)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      const priority = prioritySelect ? prioritySelect.value : 'medium';

      if (!text) {
        if (typeof showToast === 'function') {
          showToast('Please enter a task description.', 'error');
        }
        input.focus();
        return;
      }

      addTask(text, priority);
      input.value = '';
      input.focus();
    });
  }

  // Filter Buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter || 'all';
      renderTodoList();
    });
  });

  // Clear Completed
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', () => {
      const completedCount = tasks.filter((t) => t.completed).length;
      if (completedCount === 0) {
        if (typeof showToast === 'function') {
          showToast('No completed tasks to clear.', 'error');
        }
        return;
      }
      openConfirmModal(
        'Clear Completed Tasks?',
        `Are you sure you want to permanently remove all ${completedCount} completed tasks?`,
        () => {
          tasks = tasks.filter((t) => !t.completed);
          saveTasksToStorage();
          renderTodoList();
          if (typeof showToast === 'function') {
            showToast(`Cleared ${completedCount} completed task(s).`, 'success');
          }
        }
      );
    });
  }

  // Search filter
  if (taskSearchInput) {
    taskSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderTodoList();
    });
  }

  // Modal Close buttons
  const editModal = document.getElementById('editModal');
  const confirmModal = document.getElementById('confirmModal');

  const closeModals = () => {
    if (editModal) editModal.classList.remove('active');
    if (confirmModal) confirmModal.classList.remove('active');
    editingTaskId = null;
  };

  document.querySelectorAll('.modal-close-btn').forEach((btn) => {
    btn.addEventListener('click', closeModals);
  });

  [editModal, confirmModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModals();
      });
    }
  });

  // Edit Task Form Submit
  const editForm = document.getElementById('editTaskForm');
  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editText = document.getElementById('editTaskInput').value.trim();
      const editPriority = document.getElementById('editTaskPriority').value;

      if (!editText) {
        if (typeof showToast === 'function') {
          showToast('Task description cannot be empty.', 'error');
        }
        return;
      }

      if (editingTaskId) {
        const task = tasks.find((t) => t.id === editingTaskId);
        if (task) {
          task.text = editText;
          task.priority = editPriority;
          saveTasksToStorage();
          renderTodoList();
          closeModals();
          if (typeof showToast === 'function') {
            showToast('Task updated successfully!', 'success');
          }
        }
      }
    });
  }
}

/**
 * Add a new task
 */
function addTask(text, priority = 'medium') {
  const newTask = {
    id: 'task-' + Date.now(),
    text: text,
    completed: false,
    priority: priority,
    createdAt: new Date().toISOString()
  };

  tasks.unshift(newTask);
  saveTasksToStorage();
  renderTodoList();
  if (typeof showToast === 'function') {
    showToast('Task added to your list!', 'success');
  }
}

/**
 * Toggle task completion state
 */
function toggleTaskCompletion(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasksToStorage();
    renderTodoList();
    if (typeof showToast === 'function') {
      const msg = task.completed ? 'Task marked as completed! 🎉' : 'Task marked as active.';
      showToast(msg, 'success');
    }
  }
}

/**
 * Delete a specific task
 */
function deleteTask(id) {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasksToStorage();
    renderTodoList();
    if (typeof showToast === 'function') {
      showToast('Task deleted.', 'success');
    }
  }
}

/**
 * Open Edit Task Modal
 */
function openEditModal(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  editingTaskId = id;
  const editModal = document.getElementById('editModal');
  const editInput = document.getElementById('editTaskInput');
  const editPriority = document.getElementById('editTaskPriority');

  if (editInput) editInput.value = task.text;
  if (editPriority) editPriority.value = task.priority || 'medium';
  if (editModal) {
    editModal.classList.add('active');
    setTimeout(() => editInput && editInput.focus(), 100);
  }
}

/**
 * Open Confirmation Modal
 */
function openConfirmModal(title, message, onConfirm) {
  const confirmModal = document.getElementById('confirmModal');
  const confirmTitle = document.getElementById('confirmModalTitle');
  const confirmMsg = document.getElementById('confirmModalMessage');
  const confirmBtn = document.getElementById('confirmActionBtn');

  if (!confirmModal) {
    if (confirm(message)) onConfirm();
    return;
  }

  if (confirmTitle) confirmTitle.textContent = title;
  if (confirmMsg) confirmMsg.textContent = message;

  confirmModal.classList.add('active');

  // Replace button clone to remove previous listeners
  const newBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

  newBtn.addEventListener('click', () => {
    confirmModal.classList.remove('active');
    onConfirm();
  });
}

/**
 * Render the Task List and update Dashboard Stats
 */
function renderTodoList() {
  const listContainer = document.getElementById('todoList');
  const totalCountEl = document.getElementById('totalTasksCount');
  const activeCountEl = document.getElementById('activeTasksCount');
  const completedCountEl = document.getElementById('completedTasksCount');
  const progressFill = document.getElementById('todoProgressFill');
  const progressText = document.getElementById('todoProgressText');

  // Calculate Metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Update Stats UI
  if (totalCountEl) totalCountEl.textContent = totalTasks;
  if (activeCountEl) activeCountEl.textContent = activeTasks;
  if (completedCountEl) completedCountEl.textContent = completedTasks;
  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (progressText) progressText.textContent = `${percentage}% Completed`;

  if (!listContainer) return;

  // Filter Tasks
  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  if (searchQuery) {
    filteredTasks = filteredTasks.filter((task) =>
      task.text.toLowerCase().includes(searchQuery)
    );
  }

  // Render Empty State if no tasks match
  if (filteredTasks.length === 0) {
    let emptyTitle = 'No tasks yet';
    let emptyDesc = 'Add your first task above to organize your day.';

    if (searchQuery) {
      emptyTitle = 'No matching tasks';
      emptyDesc = `No tasks found matching "${searchQuery}".`;
    } else if (currentFilter === 'active') {
      emptyTitle = 'No active tasks';
      emptyDesc = 'Great job! You have cleared all your active tasks.';
    } else if (currentFilter === 'completed') {
      emptyTitle = 'No completed tasks';
      emptyDesc = 'Mark tasks as completed to track your progress.';
    }

    listContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h4>${emptyTitle}</h4>
        <p>${emptyDesc}</p>
      </div>
    `;
    return;
  }

  // Build task items HTML
  listContainer.innerHTML = '';
  filteredTasks.forEach((task) => {
    const item = document.createElement('div');
    item.className = `todo-item ${task.completed ? 'completed' : ''}`;
    item.id = `todo-${task.id}`;

    const priorityLabel = task.priority ? task.priority.toUpperCase() : 'MEDIUM';
    const priorityClass = `priority-${task.priority || 'medium'}`;

    item.innerHTML = `
      <div class="todo-item-left">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          aria-label="Mark task '${task.text.replace(/"/g, '&quot;')}' as complete"
          ${task.completed ? 'checked' : ''}
        >
        <div class="todo-text-wrap">
          <span class="todo-text">${escapeHtml(task.text)}</span>
          <div class="todo-meta">
            <span class="priority-badge ${priorityClass}">${priorityLabel}</span>
            <span>Created ${formatDate(task.createdAt)}</span>
          </div>
        </div>
      </div>
      <div class="todo-item-actions">
        <button type="button" class="btn-icon btn-edit" title="Edit task" aria-label="Edit task">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button type="button" class="btn-icon btn-danger btn-delete" title="Delete task" aria-label="Delete task">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;

    // Event listeners on item controls
    const checkbox = item.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

    const editBtn = item.querySelector('.btn-edit');
    editBtn.addEventListener('click', () => openEditModal(task.id));

    const deleteBtn = item.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    listContainer.appendChild(item);
  });
}

/**
 * Utility: HTML Escape
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Utility: Format friendly date
 */
function formatDate(isoStr) {
  if (!isoStr) return 'recently';
  const date = new Date(isoStr);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
