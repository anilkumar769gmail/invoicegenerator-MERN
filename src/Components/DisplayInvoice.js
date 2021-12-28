import React from 'react'
import Card from 'react-bootstrap/Card';
import Container  from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import ProductsAndPrices from './ProductsAndPricesListing';
import ButtonToInvoicesListing from './ButtonToInvoicesListing';

export default class DisplayInvoice extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            fetchError: false,
            sellerName: "",
            sellerAddress: "",
            customerName: "",
            customerAddress: "",
            invoiceDescription: "",
            termsAndConditions:"",
            itemsListing:[],
            finalPrice:"",
            date:"",
            invoiceId:""
        }
    }

    componentDidMount(){
        //this method runs automatically to fetch for single invoice
        fetch('/api/readinvoice/'+ this.props.invoiceId,{
            method: 'GET'
        }).then(( response ) =>{
            if(response.ok){
                //everything is working
                return response.json();
            }else{
                //somethis is wrong from mongodb
                throw new Error();
            }
        }).then((responseAsJson) =>{
            //state variables has the values
            this.setState({
                sellerName: responseAsJson.sellerName,
                sellerAddress: responseAsJson.sellerAddress,
                customerName: responseAsJson.customerName,
                customerAddress: responseAsJson.customerAddress,
                invoiceDescription: responseAsJson.invoiceDescription,
                termsAndConditions:responseAsJson.terms,
                itemsListing: responseAsJson.items,
                finalPrice: responseAsJson.finalPrice,
                date: responseAsJson.date,
                invoiceId: responseAsJson._id
            });
            console.log('The information was read from mongodb')
        }).catch(() =>{
            this.setState({
                fetchError : true
            })
            console.log('Something went wrong')
        })
    }

    render(){

        if(this.state.fetchError){
            //if something goes wrong then this if block will be rendered
            return(
                <div className="jumbotron">
                    <Card bg='dark' text='white'>
                        <Card.Header as='h3' style={{textAlign:'center'}}>
                            Sales Invoice
                        </Card.Header>
                        <Card.Body>
                            <h2>ERROR: Something went wrong while reading information from Mongodb</h2>
                        </Card.Body>
                    </Card>
                </div>      
            )
        }
        return(
          <div className="jumbotron">
            <Card bg='dark' text='white'>
                <Card.Header as='h3' style={{textAlign:'center'}}>
                    Sales Invoice
                </Card.Header>
                
                <Card.Body>
                    <Container style={{fontSize:'1.3em'}}>
                        <Row style={{marginTop:'1.2em'}}>
                            <Col style={{textAlign:'right', color:'white'}}>
                                <h5>Sellers Name and Address</h5>
                                <p>{this.state.sellerName}<br/>
                                    {this.state.sellerAddress}
                                </p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1.2em'}}>
                            <Col style={{textAlign:'left', color:'white'}}>
                                <h5>Customers Name and Address</h5>
                                <p>{this.state.customerName}<br/>
                                    {this.state.customerAddress}
                                </p>
                            </Col>
                            <Col style={{textAlign:'right', color:'white'}}>
                                <h5>Invoice Id and Date</h5>
                                <p>{this.state.invoiceId}<br/>
                                   {new Date(this.state.date).toLocaleString()}
                                </p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1.2em'}}>
                            <Col style={{textAlign:'left', color:'white'}}>
                                <h5>Invoice Description</h5>
                                <p>{this.state.invoiceDescription}</p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1.2em'}}>
                            <Col style={{textAlign:'left', color:'white'}}>
                                <h5>Items Purchased</h5>
                                <ProductsAndPrices
                                    itemsListing={this.state.itemsListing}
                                />
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1.2em'}}>
                            <Col style={{textAlign:'left', color:'white'}}>
                                <h5>Final Price</h5>
                                <p>${this.state.finalPrice}</p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1.2em'}}>
                            <Col style={{textAlign:'left', color:'white'}}>
                                <h5>Terms and Conditions</h5>
                                <p>{this.state.termsAndConditions}</p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1.2em'}}>
                            <Col>
                                <ButtonToInvoicesListing/>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
          </div> 
        )
    }
}