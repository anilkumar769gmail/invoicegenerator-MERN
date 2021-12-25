import React from 'react';
import Form from 'react-bootstrap/Form'

export default class CustomTextField extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Form.Group controlId={this.props.customId}>
                <Form.Label>{this.props.label}</Form.Label>

                <Form.Control type='text' placeholder={this.props.placeholder} value={this.props.val} onChange={this.props.inputHandler}>
                </Form.Control>
                
                <Form.Text>{this.props.text}</Form.Text>
            </Form.Group>
        );
    }


}