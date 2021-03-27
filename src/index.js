import './styles.css'
import { ToDo, ToDoList } from './classes/index'
import { createToDoHtml } from './js/components'

export const toDoList = new ToDoList()
toDoList.toDos.forEach(createToDoHtml)
