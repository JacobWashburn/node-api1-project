import React from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';

const CardWrapper = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
`;

const UserList = props => {
    return (
        <CardWrapper>
            {props.users.map(user => <UserCard key={user.name} user={user} editing={props.editing} setEditing={props.setEditing} setUsers={props.setUsers} users={props.users}/>)}
        </CardWrapper>
    )
}

export default UserList