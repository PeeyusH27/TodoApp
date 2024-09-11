import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [finished, setFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  //LOCAL STORAGE
  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }



  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => { return item.id == id })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLs()
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    console.log(todo);
    setTodo("")
    saveToLs()
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLs()
  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    localStorage.removeItem("todos")
    setTodos(newTodos)
    saveToLs()
  }


  const toggleFinished = (e) => {
    setFinished(!finished)
  }


  return <>
    <div className='mx-8 my-8'>
      <div className="container p-5 bg-neutral-400 min-h-[80vh]">
          <h2 className='font-bold text-3xl text-center'>
            Add a Todo
          </h2>
        <div className="addTodo mx-32">
          <input onChange={handleChange} value={todo} className='w-full rounded-md mt-3' type="text" />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className='bg-stone-500 w-full cursor-pointer disabled:bg-slate-700 disabled:line-through hover:bg-stone-600 py-1 font-bold text-sm text-white rounded-md'>
            Add
          </button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={finished} />Show finished
        <h2 className='text-lg font-bold'>Your Todos</h2>


        <div className="todos">
          {todos.length === 0 && <div className=' flex text-[65px] font-bold justify-center mt-10 text-zinc-950 text-opacity-30'>No tasks to display</div>}
          {todos.map(item => {
            return ((finished || !item.isCompleted) &&
              <div className="todo bg-stone-300 p-2 rounded-lg my-3 flex w-full font-bold justify-between" key={item.id}>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-stone-500 hover:bg-stone-600 p-3 py-1 font-bold text-sm text-white rounded-md mx-2'>Edit</button>
                  <button onClick={(e) => handleDelete(e, item.id)} className='bg-stone-500 hover:bg-stone-600 p-3 py-1 font-bold text-sm text-white rounded-md mx-1'>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </>
}

export default App

