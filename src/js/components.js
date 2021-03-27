import { ToDo } from '../classes'
import { toDoList } from '../index'
//html references
const divToDoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const btnClearCompleted = document.querySelector('.clear-completed')
const ulFilters = document.querySelector('.filters')
const anchorFilters = document.querySelectorAll('.filter')

export const createToDoHtml = (toDo) => {
    const htmlToDo = `
    <li class="${toDo.completed ? 'completed' : ''}" data-id="${toDo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${
            toDo.completed ? 'checked' : ''
        }>
        <label>${toDo.task}</label>
        <button class="destroy"></button>
    </div>
    </li>
`
    const div = document.createElement('div')
    div.innerHTML = htmlToDo
    divToDoList.append(div.firstElementChild)
}

//events

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const newToDo = new ToDo(txtInput.value)
        toDoList.createToDo(newToDo)
        createToDoHtml(newToDo)
        txtInput.value = ''
    }
})

divToDoList.addEventListener('click', (event) => {
    const elementName = event.target.localName
    const elementToDo = event.target.parentElement.parentElement
    const toDoId = elementToDo.getAttribute('data-id')
    if (elementName.includes('input')) {
        toDoList.updateToDo(toDoId)
        elementToDo.classList.toggle('completed')
    } else if (elementName.includes('button')) {
        toDoList.deleteToDo(toDoId)
        divToDoList.removeChild(elementToDo)
    }
})

btnClearCompleted.addEventListener('click', () => {
    toDoList.deleteCompleted()
    for (let i = divToDoList.children.length - 1; i >= 0; i--) {
        const element = divToDoList.children[i]
        if (element.classList.contains('completed')) {
            divToDoList.removeChild(element)
        }
    }
})

ulFilters.addEventListener('click', (event) => {
    const filter = event.target.text
    if (!filter) return

    anchorFilters.forEach((e) => e.classList.remove('selected'))
    event.target.classList.add('selected')

    for (const element of divToDoList.children) {
        element.classList.remove('hidden')
        const completed = element.classList.contains('completed')

        switch (filter) {
            case 'Unfinished':
                if (completed) {
                    element.classList.add('hidden')
                }
                break
            case 'Completed':
                if (!completed) {
                    element.classList.add('hidden')
                }
                break
        }
    }
})
