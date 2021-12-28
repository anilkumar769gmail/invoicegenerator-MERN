import React from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

export default function ViewInvoiceButton(props){
    
    const history = useNavigate();
    
    function handleClick(){
        
        history('/displayinvoice/'+ props.invoiceId);

        console.log('You want to see invoice with id: ' + props.invoiceId)
    }
    return(
        <Button
            variant='warning'
            onClick = {handleClick}>View Invoice</Button>
    );
}