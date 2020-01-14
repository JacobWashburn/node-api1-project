import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form``;
const Label = styled.label``;
const Input = styled.input``;
const Button = styled.button`
background-color: lightgrey;
`;

const EditForm = props => {
    const [user, setUser] = useState(props.user);

    const onChangeHandler = e => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:5000/api/users/${props.user.id}`, user)
            .then(res => {
                console.log('put res', res);
                props.setEditing(false);
                props.setStartEditing(false);
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
            <Button type='submit'>Submit</Button>
            <Button onClick={e => {
                props.setEditing(false);
            }}>Cancel</Button>
        </Form>
    );
};

export default EditForm;