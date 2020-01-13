import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form``;
const Label = styled.label``;
const Input = styled.input``;
const Button = styled.button`
background-color: lightgrey;
`;

const AddForm = props => {
    const [user, setUser] = useState({
        name: '',
        bio: ''
    });

    const onChangeHandler = e => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/api/users', user)
            .then(res => {
                console.log('put res', res);
                props.setUsers([...props.users, res.data])
                props.history.push('/users')
            });
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <Label>Name:
                <Input type='text' name='name' value={user.name} onChange={onChangeHandler}/>
            </Label>
            <Label>Bio:
                <Input type='text' name='bio' value={user.bio} onChange={onChangeHandler}/>
            </Label>
            <Button type='submit'>Add User</Button>
        </Form>
    );
};

export default AddForm;