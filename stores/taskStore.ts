import {Task, TaskStatus} from '~/types/entities/Task'

export const useTaskStore = defineStore({
    id: 'taskStore',
    state: () => ({
        tasks: [] as Task[]
    }),
    getters: {
        getTasks: (state) => state.tasks,
        getDoneTasks: (state) => state.tasks.filter(t => t.status === TaskStatus.DONE),
        getPendingTasks: (state) => state.tasks.filter(t => t.status === TaskStatus.PENDING)
    },
    actions: {
        initTasks() {
            this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        },

        addTask(name: string, status: TaskStatus = TaskStatus.PENDING) {
            const task = {
                id: generateId(),
                name,
                status
            }
            this.tasks.unshift(task)
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },

        toggleTaskStatus(id: number) {
            const task = this.tasks.find(t => t.id === id);
            if (task) {
                task.status = task.status === TaskStatus.PENDING ? TaskStatus.DONE : TaskStatus.PENDING;
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
        },

        deleteTask(id: number) {
            const taskIndex = this.tasks.findIndex(task => task.id === id);

            // Check if the task with the specified id was found
            if (taskIndex !== -1) {
                // Remove the task from the array
                this.tasks.splice(taskIndex, 1);
            }
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },

        deleteAllTasks() {
            const delay = 200; // Initial delay in milliseconds

            for (let i = 0; i < this.tasks.length; i++) {
                setTimeout(() => {
                    this.tasks.pop();
                }, i * delay);
            }

            localStorage.removeItem('tasks')
        }
    }
})