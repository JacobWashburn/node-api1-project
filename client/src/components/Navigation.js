import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const Header = styled.header`
display: flex;
justify-content: space-evenly;
`
const LinkWrapper = styled.div`
display: flex;
justify-content: space-evenly;
width: 30%;

.selected{
color: red;
}
`
const Link = styled(NavLink).attrs({activeClassName: 'selected'})`
text-decoration: none;
color: blue;
`
const Title = styled.h1``

const Navigation = props => {
    return (
        <Header>
            <LinkWrapper>
                <Link exact to='/'>Home</Link>
                <Link to='/users'>Users</Link>
            </LinkWrapper>
            <Title>Users App</Title>
            <LinkWrapper>
                <Link to='/add'>Add a User</Link>
                <Link to='/about'>About</Link>
            </LinkWrapper>
        </Header>
    )
}

export default Navigation