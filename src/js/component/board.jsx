import React, { useEffect, useState } from "react";
import TaskForm from "./taskForm.jsx";
import Task from "./task.jsx";



const Board = () =>{

    const[tareas, setTareas] = useState([]);

    const getAllElements = () => {						//codigo obtenido de la aplicacion POSTMAN
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  
		  fetch("https://assets.breatheco.de/apis/fake/todos/user/carmelaria", requestOptions) //URL proiporcionada por crudcrud.com. Tieen límite de requests a 100
			.then(response => response.json())
			.then(result => setTareas(result))
			.catch(error => console.log('error', error));
	}

    useEffect(()=>{
        fetch('https://assets.breatheco.de/apis/fake/todos/user/carmelaria')
        .then(getAllElements())
        .then(response => response.json())
        .then((result) => {
            if(result.msg == "This use does not exists, first call the POST method first to create the list for this username"){
            fetch('https://assets.breatheco.de/apis/fake/todos/user/carmelaria', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([]),
          })
          .then(response =>response.json())
          .then(result => setTareas([]))
        }
        })
    }, [])

    const agregarTarea = (tarea) =>{
        setTareas([...tareas, {"label": tarea, "done": false}])

        fetch('https://assets.breatheco.de/apis/fake/todos/user/carmelaria', {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([...tareas, {"label": tarea, "done": false}]),
          })
          .then(response =>response.json())
          .then(result => console.log(result))
    };


    const eliminarTarea = (index) => {
        const tareasActualizadas = tareas.filter((tarea, i) => index!=i)
        setTareas(tareasActualizadas)

        fetch('https://assets.breatheco.de/apis/fake/todos/user/carmelaria', {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([...tareas]),
          })
          .then(response =>response.json())
          .then(result => console.log(result))
        
    }

    /*const deleteElement = (i) =>{
        var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
  			"label": "egsgsr",
  			"done": false
		});

		var requestOptions = {
 			method: 'DELETE',
  			headers: myHeaders,
  			body: raw,
  			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/carmelaria"+i, requestOptions)
		.then(response => response.json())
		.then(result => getAllElements())
		.catch(error => console.log('error', error));
    }*/

    return (
        <div className="containerBoard">
            <h1>todos</h1>
                <TaskForm pasarFuncionAgregarTarea={agregarTarea} />
                <p className={tareas=="" ? "" : "d-none"}>No hay tareas, añadir tareas</p>
                <div>
                    {
                        tareas.map((tarea, i)=>
                            
                            <Task
                            texto={tarea.label}
                            key={i}
                            id={i}
                            eliminarTarea={()=> eliminarTarea(i)}
                            />
                            
                        )

                    }
                </div>
        </div>
    );
};

export default Board;