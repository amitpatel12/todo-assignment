import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";


function App() {

  return (
    <div className="flex items-center w-full justify-center bg-gradient-to-r from-blue-500 to-teal-200 min-h-screen">
      <TodoList/>
    </div>
  );
}

export default App;
