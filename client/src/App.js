import React, { useEffect, useState } from "react";
import "./App.css";

const List = () => {
	const [todos, setTodos] = useState([]);

	const fetchTodos = async () => {
		const res = await fetch("http://localhost:3002/todos");
		console.log(await res.json());
	};

	useEffect(() => {
		fetchTodos();
	}, []);
	return <div>list</div>;
};
function App() {
	return (
		<div className="App">
			<List />>
		</div>
	);
}

export default App;
