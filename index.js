import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL : "https://playground-8b025-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "items")

//console.log(database)

const addButtonEl = document.getElementById("add-button")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

const clearInputFieldEl = ()=>{
    inputFieldEl.value =""
}

const appendItemToShoppingListEl=(newValue)=>{
    shoppingListEl.innerHTML += `<li>${newValue}</li>`
}

addButtonEl.addEventListener("click", ()=>{
    let inputValue = inputFieldEl.value

    if (inputValue === ""){
        return
    }

    push(shoppingListInDB ,inputValue)

    //appendItemToShoppingListEl(inputValue)
    console.log(shoppingListEl.innerHTML)
    clearInputFieldEl()
    console.log(`${inputValue} added to list`)
})

onValue(shoppingListInDB, (snapshot) =>{
    let itemEntries = Object.entries(snapshot.val())
    clearShoppingListEl()
    itemEntries.map((item)=>{
        let currentItemID = item[0]
        let currentItemValue = item[1]
        appendItemToShoppingListEl(currentItemValue)
    })
})

const clearShoppingListEl = ()=>{
    shoppingListEl.innerHTML =""
}