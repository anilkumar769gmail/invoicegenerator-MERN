import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
//import Switch from "react-switch";
import LoadHomepage from './LoadHomePage';
import LoadCreateInvoice from './LoadCreateInvoice'
import LoadUpdateInvoice from './LoadUpdateInvoice';
import LoadDisplayInvoice from './LoadDisplayInvoice';
import LoadAllInvoice from './LoadAllInvoice';
import LoadPageNotFound from './LoadPageNotFound';


export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <BrowserRouter> 
                <Routes>
                    <Route exact path='/' element={<LoadHomepage/>}/>
                    <Route path='/createinvoice' element={<LoadCreateInvoice/>}/>
                    <Route path='/updateinvoice/:invoiceId' element={<LoadUpdateInvoice/>}/>
                    <Route path='/displayinvoice/:invoiceId' element={<LoadDisplayInvoice/>}/>
                    <Route path='/allinvoice' element={<LoadAllInvoice/>}/>
                    <Route path='/*' element={<LoadPageNotFound/>}/>
                </Routes> 
            </BrowserRouter>
        );
    }
}


