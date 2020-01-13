import React, {useState} from 'react';
import styled from 'styled-components';
import EditForm from './EditForm';
import axios from 'axios';

const Card = styled.div`
width: 45%;
margin: 2% 0;
`;
const Button = styled.button`
background-color: lightgrey;
`;
const Attribute = styled.h3``;

const UserCard = ({user, editing, setEditing, setUsers, users}) => {
    const [startEditing, setStartEditing] = useState(false);

    const editingHandler = e => {
        e.stopPropagation();
        setEditing(true);
        setStartEditing(true);
    };

    const deleteHandler = e => {
        e.stopPropagation();
        axios.delete(`http://127.0.0.1:5000/api/users/${user.id}`)
            .then(res => {
                const filterUsers = users.filter(item => item.id !== user.id);
                setUsers(filterUsers)
            });
    };

    return (
        <>
            {startEditing ?
                <EditForm editing={editing} user={user} setEditing={setEditing} setStartEditing={setStartEditing}/> :
                <Card>
                    <Attribute>Name: {user.name}</Attribute>
                    <Attribute>Bio: {user.bio}</Attribute>
                    <Button onClick={editingHandler}>Edit</Button>
                    <Button onClick={deleteHandler}>Delete</Button>
                </Card>}
        </>
    );
};

export default UserCard;