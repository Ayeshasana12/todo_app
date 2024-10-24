import React, { useState, useEffect } from 'react';

function ToDo() {
    const [inputValue, setInputValue] = useState(""); 
    const [todoList, setTodoList] = useState([]); 
    
    useEffect(() => {
        const storedTodo = localStorage.getItem('todoList');
        if (storedTodo) {
            setTodoList(JSON.parse(storedTodo)); 
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList)); 
    }, [todoList]);

    const addTodo = () => {
        if (inputValue === "") {
            alert('Type Something');
            return;
        }
        setTodoList((prev) => [...prev, inputValue]); 
        setInputValue(""); 
    };

    const handleRemove = (index) => {
        const updatedList = [...todoList]; 
        updatedList.splice(index, 1); 
        setTodoList(updatedList);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card p-4 shadow-sm">
                        <h1 className="text-center mb-4">To-Do List</h1>
                        <div>
                            <div className="input-group mb-3">
                                <input
                                    value={inputValue}
                                    onChange={(e) => { setInputValue(e.target.value); }} // Update input value
                                    type="text"
                                    className="shadow-sm fw-medium form-control"
                                    placeholder="Enter Task Title"
                                />
                                <button onClick={addTodo} className="fw-medium btn btn-success">
                                    Add Task
                                </button>
                            </div>
                        </div>
                        <div>
                            <ul className='list-unstyled text-center fw-medium'>
                                {
                                    todoList.map((item, index) => {
                                        return (
                                            <li key={index} className='shadow-sm p-1 rounded border border-secondary my-4 d-flex justify-content-between align-items-center'>
                                                <span>{item}</span>
                                                <button 
                                                    onClick={() => handleRemove(index)} // Call removeItems on click
                                                    className="btn btn-danger btn-sm" > Remove
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToDo;