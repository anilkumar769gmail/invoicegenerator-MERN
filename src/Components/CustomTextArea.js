import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup  from 'react-bootstrap/InputGroup';


export default class CustomTextArea extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <h5>{this.props.label}</h5>
                    </InputGroup.Text>
                </InputGroup.Prepend>

                <Form.Control 
                    type ='text'
                    name = {this.props.name}
                    value = {this.props.val}
                    onChange = {this.props.inputHandler}
                />
            </InputGroup>
        );
    }
}

