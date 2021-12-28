import React from 'react';

export default function LoadPageNotFound(props){
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
                    
                    <h1>Error 404:</h1>
                    <p>Page Not Found!!!</p>
            </div>
    );
}