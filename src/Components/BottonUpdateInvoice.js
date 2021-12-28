import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function ButtonUpdateInvoice(props){

    const history =useNavigate();

    function handleClick(){
        history('/updateinvoice/'+ props.invoiceId)
    }
    
    return(
        <Button
            variant='primary'
            onClick={handleClick}>
            Update Invoice
        </Button>
    )
}