import React from 'react';
import  Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class ProductsAndPrices extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        
        const items = this.props.itemsListing;
        let htmlMarkup = [];

        //iterate over items array, creates row and saves it into htmlMarkup.
        items.map((product, index) =>{

            htmlMarkup.push(
            <Row key={'index - ' + index}>
                <Col>{product.description}</Col>
                <Col>${product.price}</Col>
            </Row>
            );
        });

        return(
            // Listing of Products and Prices as a table
            
            <Container>
                {htmlMarkup}
            </Container>
        );

    }
}