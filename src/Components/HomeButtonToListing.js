import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function HomeButtonToListing(props){
    
    const history = useNavigate();

    function handleClick(){
        history('/allinvoice');
    }

    return(
        <Button
            variant='primary'
            onClick={handleClick}>
            Show All Invoices
        </Button>
    )
}