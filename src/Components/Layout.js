import React from 'react'
import CustomTextField from './CustomTextField';


export default class Layout extends React.Component{

        constructor(props){
            super(props);
            this.state ={
                val:""
            }
            this.textFieldHandler= this.textFieldHandler.bind(this);
        }

        textFieldHandler( event ){
            this.setState({val: event.target.value});

            console.log('Text Field: ' + this.state.val);
        }

        

        render(){
            return(
              <CustomTextField 
              customId='seller-name' 
              label="Seller's name" 
              placeholder='Type in the name' 
              val={this.state.val}
              inputHandler={this.textFieldHandler}
              text='Enter the full name'
              />  
            );
        }

}