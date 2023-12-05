import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Modal from "./Modal";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchTodos();
  }, []);

  // fetch first 20 list from jsonplaceholder
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos",
        {
          params: {
            _limit: 20,
          },
        }
      );
      setTodos(response.data);
      
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // add new todo to the list
  const addTodo = async (e) => {
    e.preventDefault()
    if(!title){
      alert('Please Enter title')
      return
    }
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: title,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setTitle('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // delete clicked todo with specified id
  const deleteTodo = async (id) => {
    try {
      const result = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
     
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // update todo list
  const updateTodo = async (e, id, text) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        title: text,
      });
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, title: text } : todo))
      );
      setEditTodo({});
      setEdit(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // mark complete or uncomplete todo list
  const markAsComplete = async (id) => {
    try {
      const data = await Promise.all(todos.map(async (todo) => {
        if (todo.id === id) {
          await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            completed: !todo.completed
          });
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      }));
    
      setTodos(data)
    } catch (error) {
      console.error("Error updating mark todo:", error);
    }
   
  };

  return (
    <div className="flex flex-col sm:w-1/2 w-[95%] mt-20 gap-5 pb-10">
      <div className="flex items-center h-[51px]">
        <input
          className="flex-1 border-2 rounded-l-md border-blue-500 px-3 outline-none h-full"
          type="text"
          placeholder="Add a task here..."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo(e);
          }}
        />
        <button
          type="submit"
          className="border-2 rounded-r-md border-blue-500 text-white bg-blue-500 w-11 h-full  flex items-center justify-center font-medium"
          onClick={(e)=> addTodo(e)}
        >
         
            Add
          
        </button>
      </div>
      <div>
      <div className="grid gap-3 sm:grid-cols-1 grid-cols-2 grid-small">
        {todos.map((todo) => (
          <div className={` rounded flex flex-col sm:flex-row  justify-between items-center gap-2 p-3 group hover:cursor-pointer  ${todo.completed ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-sky-100 hover:bg-slate-100 transition text-blue-500'}`} key={todo.id}>
            <li key={todo.id} className="list-none">
              {todo.title}
            </li>
            <div className="flex sm:gap-2 gap-5">
              <MdDelete color="red" onClick={() => deleteTodo(todo.id)} />
              <MdEdit
                onClick={() => {
                  setEditTodo(todo);
                  setEdit(true);
                }}
              />
              {
                todo.completed ? <MdCheckBox color="white" onClick={()=>markAsComplete(todo.id)}/> :  <MdCheckBoxOutlineBlank color="red" onClick={()=>markAsComplete(todo.id)}/>
              }
             
            </div>
          </div>
        ))}
      </div>


      

      </div>
      {/* modal for updating list */}
      {edit && (
        <Modal setEdit={setEdit} editTodo={editTodo} updateTodo={updateTodo} />
      )}
    </div>
  );
};

export default TodoList;
