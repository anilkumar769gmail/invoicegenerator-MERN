import React from 'react';
import {BrowserRouter, Switch,Routes, Route} from 'react-router-dom';
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
                    <Route path='/updateinvoice' element={<LoadUpdateInvoice/>}/>
                    <Route path='/displayinvoice' element={<LoadDisplayInvoice/>}/>
                    <Route path='/allinvoice' element={<LoadAllInvoice/>}/>
                    <Route element={<LoadPageNotFound/>}/>
                </Routes> 
            </BrowserRouter>
        );
    }
}


