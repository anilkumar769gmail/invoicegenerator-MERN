import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function ButtonToInvoicesListing(props){
    
    const history = useNavigate();

    function handleClick(){
        history('/allinvoice');
    }

    return(
        <Button
            variant='primary'
            onClick={handleClick}>
            Go Back To Invoces Listing
        </Button>
    )
}