

// global var 
var todoArray = []; //empty array
/**
 * fun to store todo local storage
 */
function saveTodos(){
    var title = document.getElementById("title").value;
    todoArray.push(title);
    localStorage.setItem("todos", todoArray.toString());
    fetchAllTodos();
    document.getElementById("title").value="";
}


/**
 * fun to fecth all todos
 * show todos in table
 */
function fetchAllTodos(){
    var str =localStorage.getItem("todos");
    todoArray = str.split(",");
    var htmlstring = `
    <tr>
        <th> Sr.no </th>
        <th> Title </th>
        <th> Actions </th>
    </tr>
    `;
    var counter = 0;
    todoArray.forEach(ele =>{
        counter++;
        htmlstring +=`
        <tr>
            <td>${counter}</td>
            <td>${ele}</td>
            <td>
                <button class="btn btn-outline-warning"
                onclick="editTodos(${counter-1})"> Edit </button>
                <button class="btn btn-outline-danger"
                onclick="deleteTodos(${counter-1})"
                > Delete </button>
            </td>
        </tr>

        `;
    })

    document.getElementById("todo-table").innerHTML = htmlstring;
}


/**
 * chnage the todo
 * @param {*} index got array index
 */
function editTodos(index){
    var newValue = prompt("Do you wnat to update value?", todoArray[index]);
    if(newValue != NUll && newValue != ""){
        todoArray[index] = newValue;//replace the current val with new value
        localStorage.setItem("todos", todoArray.toString());//update local storage
        fetchAllTodos();//upadate UI
    }
}

/**
 * chnage the todo
 * @param {*} index got array index
 */
function deleteTodos(index){
    if(confirm(`do you want to delete ${todoArray[index]}`)){
        todoArray.splice(index,1);//delete single element from the array of given index
        localStorage.setItem("todos", todoArray.toString());//set the new array
        fetchAllTodos();//update UI
    }
}
function removeAllTodos(){
    todoArray = [];
    localStorage.setItem("todos", todoArray.toString());
    document.getElementById("todo-table").innerHTML="";
}

function enterKeyPressed(event){
    if(event.key == "Enter"){
        saveTodos();
    }
}