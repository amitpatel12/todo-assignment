# Project Details

## Project URL
https://todo-amit.onrender.com/

## simple todo list - in the list every task has 3 buttons icons (delete, edit, checkbox) and one ADD button at top with input field
1. Add - use to add new task into list using inputbox
2. Edit - when user click on edit button then open a box (modal) on screen with one input field and two button one for update the selected task and one for cancel the update
3. Delete - simply take id and delete that task
4. checkbox - use to mark as completed or uncompleted


## Application State
because we have not any database so that when user click any button then happen two seperate task ---
1. make change on the server JSONPlaceholder according to the action
2.  Also change locally to the state like add, delete, update, checkbox so that changes reflect into the application

## Intract with JSONPlaceholder
I follow official documentation for each task
1. in frontend side i use async await to handle server request and response and for error handling used try and catch block
2. Get all lists i used (GET method) - https://jsonplaceholder.typicode.com/todos
3. deleted list (DELETE method) - https://jsonplaceholder.typicode.com/todos/${id}
4. add new list (POST method) - https://jsonplaceholder.typicode.com/todos
5. update list for both title and completed (PUT method) - https://jsonplaceholder.typicode.com/todos/${id}
