import React from 'react';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button  from 'react-bootstrap/Button';
import CustomTextField from './CustomTextField';


export default class InputDescriptionAndPrice extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(

            <Container>
                <Row>
                    <Col>
                        <CustomTextField
                            customId = 'itemDescription'
                            label = 'Item Description'
                            name = 'itemDescription'
                            placeholder = 'Enter Description...'
                            val = {this.props.descriptionVal}
                            inputHandler = {this.props.customHandler}
                        />
                    </Col>
                    <Col>
                        <CustomTextField
                            customId = 'itemPrice'
                            label = 'Item Price'
                            name = 'itemPrice'
                            placeholder = 'Enter price...'
                            val = {this.props.priceVal}
                            inputHandler = {this.props.customHandler}
                        />
                    </Col>
                    
                    
                </Row>
                    <div>    
                        <Button 
                            variant='primary'
                            size='sm'
                            style = {{marginTop:'2em'}}
                            onClick ={this.props.buttonHandler}
                        >   
                            Submit Item
                        </Button>
                    </div>
            </Container>
        )
    }
}

