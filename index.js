import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

const appendItemToShoppingListEl=(item)=>{

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent=itemValue

    newEl.addEventListener("dblclick",()=>{
        console.log(itemID)
        const exactLocationInDB = ref(database, `items/${itemID}`)
        remove(exactLocationInDB)
        console.log(itemValue + " has been removed from the list")
    })

    shoppingListEl.appendChild(newEl)
}

addButtonEl.addEventListener("click", ()=>{
    let inputValue = inputFieldEl.value

    if (inputValue === ""){
        return
    }

    push(shoppingListInDB ,inputValue)

    //appendItemToShoppingListEl(inputValue)
    //console.log(shoppingListEl.innerHTML)
    clearInputFieldEl()
    console.log(`${inputValue} added to list`)
})

//onValue fetches the data from the db as snapshot
onValue(shoppingListInDB, (snapshot) =>{
    
    clearShoppingListEl()
    
    if(!snapshot.exists()){
        shoppingListEl.innerHTML = "Not items here... yet"
        return
    }
    
    let itemEntries = Object.entries(snapshot.val())
    itemEntries.map((item)=>{
        let currentItemID = item[0]
        let currentItemValue = item[1]
        appendItemToShoppingListEl(item)
    })
})

const clearShoppingListEl = ()=>{
    shoppingListEl.innerHTML =""
}