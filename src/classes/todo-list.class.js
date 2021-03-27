import { ToDo } from './todo.class'

export class ToDoList {
    constructor() {
        this.loadLocalStorage()
    }

    createToDo(toDo) {
        this.toDos.push(toDo)
        this.saveLocalStorage()
    }

    deleteToDo(id) {
        this.toDos = this.toDos.filter((toDo) => toDo.id != id)
        this.saveLocalStorage()
    }

    updateToDo(id) {
        for (const toDo of this.toDos) {
            if (toDo.id == id) {
                toDo.completed = !toDo.completed
                this.saveLocalStorage()
                break
            }
        }
    }

    deleteCompleted() {
        this.toDos = this.toDos.filter((toDo) => !toDo.completed)
        this.saveLocalStorage()
    }

    saveLocalStorage() {
        localStorage.setItem('toDo', JSON.stringify(this.toDos))
    }

    loadLocalStorage() {
        this.toDos = localStorage.getItem('toDo')
            ? JSON.parse(localStorage.getItem('toDo'))
            : []
        this.toDos = this.toDos.map(ToDo.fromJson)
    }
}
