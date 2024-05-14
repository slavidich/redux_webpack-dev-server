import './index.html'; // чтобы следил за файлом!
import './index.css';

import { createStore } from "redux"

const store = createStore(changeStore)

function changeStore(state=[], action){
    console.log('1', state)
    switch (action.type){
        case 'WRITE':
            return [
                ...state,
                action.payload
            ]
        default:
            return state

    }
}
console.log('2', store.getState())

store.subscribe(()=>{
    const items = document.querySelector('.testUl')

    items.innerHTML ='',

    store.getState().map(item=>{
        const li = document.createElement('li')
        li.textContent = item
        items.appendChild(li)
    })
})

//store.dispatch({type: 'WRITE', payload:'OYEEE'})

const testButton = document.querySelector(".testButton")
testButton.addEventListener('click', ()=>{
    const inputValue = document.querySelector(".testInput").value
    store.dispatch({type: 'WRITE', payload:inputValue})
    document.querySelector(".testInput").value = ""
})
