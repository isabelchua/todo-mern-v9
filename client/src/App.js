import React, { useEffect, useState } from "react";
import "./App.css";

const List = () => {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState([]);

	const fetchTodos = async () => {
		const res = await fetch("http://localhost:3002/todos");
		setTodos(await res.json());
	};

	const addTodo = async () => {
		const res = await fetch("http://localhost:3002/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},

			body: JSON.stringify({ desc: text, done: false })
		});

		fetchTodos();
		setText("");
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const items = todos.map(todo => (
		<Item todo={todo} key={todo._id} fetchTodos={fetchTodos} />
	));

	return (
		<>
			<div className="ui card">
				<div className="content">
					<div className="header">Todo list</div>
				</div>
				<div className="content">
					<div className="ui relaxed divided list">{items}</div>
				</div>

				<div className="ui fluid action input">
					<input
						type="text"
						placeholder="enter todo"
						value={text}
						onChange={e => setText(e.target.value)}
					/>
					<div className="ui button" onClick={addTodo}>
						Add
					</div>
				</div>
			</div>
		</>
	);
};

const Item = props => {
	const { done, desc, _id } = props.todo;

	const deleteTodo = async () => {
		await fetch(`http://localhost:3002/todos/${_id}`, {
			method: "DELETE"
		});
		props.fetchTodos();
	};

	const toggleDone = async () => {
		await fetch(`http://localhost:3002/todos/${_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},

			body: JSON.stringify({ done: !done, desc })
		});
		props.fetchTodos();
	};

	const setEdit = () => {};

	// const editTodo = async () => {
	// 	await fetch(`http://localhost:3002/todos/${_id}`, {
	// 		method: "PUT",
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},

	// 		body: JSON.stringify({ done: !done, desc })
	// 	});
	// 	props.fetchTodos();
	// };

	return (
		<div className="item">
			{done ? (
				<i
					className="left floated green check square outline icon"
					onClick={toggleDone}
				></i>
			) : (
				<i
					className="left floated square outline icon"
					onClick={toggleDone}
				></i>
			)}

			{desc}

			<i className="right floated gray trash icon" onClick={deleteTodo}></i>
		</div>
	);
};
//<i className="right floated gray edit icon" onClick={editTodo}></i>
function App() {
	return (
		<div className="App">
			<List />
		</div>
	);
}

export default App;
