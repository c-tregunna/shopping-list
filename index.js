import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; //these are the apps from the .js file that will be used below
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-5847b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList");

const addToCartBtn = document.getElementById('add-button');
let inputField = document.getElementById('input-field')

const ulEl = document.getElementById('shopping-list');

addToCartBtn.addEventListener('click', () => {
    let inputValue =  inputField.value
    push(shoppingListDB, inputValue)
    // console.log(inputValue);
    clearInput()
    // addToShoppingList(inputValue)
})


function addToShoppingList(item) {
    // ulEl.innerHTML += `<li>${itemValue}</li>`
    let itemId = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    newEl.addEventListener('click', function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)
        remove(exactLocationOfItemInDB)
    })
    ulEl.append(newEl);
}

function clearInput() {
    inputField.value = ""
}

function clearShoppingListEl() {
    ulEl.innerHTML = "";
}

onValue(shoppingListDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val()) //will return the key value pairs (id and value)
        clearShoppingListEl()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i] //stores each key value pair with id and value or each item of array
            let currentItemID = currentItem[0] //stores the id of each item
            let currentItemValue = currentItem[1] //stores the value of each item

            addToShoppingList(currentItem)
        }
    } else {
        ulEl.innerHTML = "No items here...yet!"
    }
})


