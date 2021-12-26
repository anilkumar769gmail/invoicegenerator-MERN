import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup  from 'react-bootstrap/InputGroup';

export default class TextArea extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <InputGroup>
                <div className="input-group-prepend">
                    <span className='input-group-text'>{this.props.label}</span>
                </div>
                <Form.Control
                    as = 'textarea'
                    name = {this.props.name}
                    value = {this.props.value}
                    onChange = {this.props.inputHandler}>
                </Form.Control> 
                   
            </InputGroup>
        );
    }
}

