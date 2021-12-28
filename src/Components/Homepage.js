import React from 'react'
import HomeButtonToCreateInvoice from './HomeButtonToCreateInvoice'
import HomeButtonToListing from './HomeButtonToListing'

export default class Homepage extends React.Component{

    
    render(){
        return(
            <div
                id='invoicebg' 
                className='jumbotron' 
                style= {{
                    width:'80%',
                    marginLeft:'10%',
                    marginTop: '10%',
                    height : '400px'
                    }}>
                    
                    <h1>Welcome to Invoicing</h1>
                    <p>Choose your option</p>
                    <HomeButtonToCreateInvoice/>
                    &nbsp;&nbsp;&nbsp;
                    <HomeButtonToListing/>
            </div>
        )
    }
}