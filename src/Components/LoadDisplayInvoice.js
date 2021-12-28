import React from 'react';
import { useParams } from 'react-router-dom';
import DisplayInvoice from './DisplayInvoice';

export default function LoadDisplayInvoice(props){

    //saving the url parameter into the invoiceId constant
    const {invoiceId} =useParams();

    return(
        <DisplayInvoice
            invoiceId={invoiceId}
        />
        
    );
}