import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateInvoice from './UpdateInvoice';


export default function LoadUpdateInvoice(props){
    
    //get the id parameter
    const {invoiceId} = useParams()
    return(
        <UpdateInvoice
            invoiceId = {invoiceId}
        />
    );
}