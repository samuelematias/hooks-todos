import React, { useState, useEffect, useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import TodosContext from './context';
import todosReducer from './reducer';
import axios from 'axios';

import TodoList from './components/TodosList';
import TodoForm from './components/TodoForm';

const useApi = endpoint => {
	const [data, setData] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await axios.get(endpoint);
		setData(response.data);
	};

	return data;
};

const App = () => {
	const initState = useContext(TodosContext);
	const [state, dispatch] = useReducer(todosReducer, initState);
	const savedTodos = useApi('https://hooks-todos-api-4l6l4i9an.now.sh/todos');

	useEffect(() => {
		dispatch({
			type: 'GET_TODOS',
			payload: savedTodos
		});
	}, [savedTodos]);

	return (
		<TodosContext.Provider value={{ state, dispatch }}>
			<TodoForm />
			<TodoList />
		</TodosContext.Provider>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
