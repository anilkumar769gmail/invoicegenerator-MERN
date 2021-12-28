import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function ButtonToHomePage(props){
    
    const history = useNavigate();

    function handleClick(){
        history('/');
    }

    return(
        <Button
            variant='primary'
            onClick={handleClick}>
            Go Back Home
        </Button>
    )
}