import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function HomeButtonToCreateInvoice(props){
    
    const history = useNavigate();

    function handleClick(){
        history('/createinvoice');
    }

    return(
        <Button
            variant='primary'
            onClick={handleClick}>
            Create Invoice
        </Button>
    )
}