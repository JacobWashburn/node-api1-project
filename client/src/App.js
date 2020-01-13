import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom'
import './App.css';
import axios from 'axios';
import UserList from './components/UserList';
import Navigation from './components/Navigation';
import AddForm from './components/AddForm';

function App () {
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/users')
            .then(res => {
              console.log('get users res', res);
              setUsers(res.data)
            });
    }, [editing]);
    return (
        <div className='App'>
            <Navigation/>
            <Route path='/users' render={props => <UserList {...props} users={users} editing={editing} setEditing={setEditing} setUsers={setUsers}/>} />
            <Route path='/add' render={props => <AddForm{...props} users={users} setUsers={setUsers}/>}/>
        </div>
    );
}

export default App;
