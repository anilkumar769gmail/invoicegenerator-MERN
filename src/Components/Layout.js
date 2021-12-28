import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomTextField from './CustomTextField';
import CustomTextArea from './CustomTextArea';
import ProductsAndPrices from './ProductsAndPricesListing';
import FinalPrice from './FinalPrice';
import InputDescriptionAndPrice from './InputDescriptionAndPrice';
import ButtonGroup  from 'react-bootstrap/ButtonGroup';
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DialogBox from './DialogWindow';
import CustomCard from './CustomCard';
import Card from 'react-bootstrap/Card';
import ButtonToHomePage from './ButtonToHomePage';

export default class Layout extends React.Component{

        constructor(props){
            super(props);
            this.state ={
                sellerName: "",
                sellerAddress: "",
                customerName: "",
                customerAddress: "",
                invoiceDescription: "",
                termsAndConditions:"",
                itemsListing:[],          //<---contains description and price of items
                descriptionVal:"",
                priceVal:"",
                show: false,
                title: "",
                content: ""
            }
            this.textFieldsHandler= this.textFieldsHandler.bind(this);
            this.buttonClick = this.buttonClick.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.closeWindow = this.closeWindow.bind(this);
        }
        //pop-up box to be closed
        closeWindow(){
            this.setState({
                show: false
            })
            console.log('You want to close dialog box.')
        }
        //gets user input
        textFieldsHandler( event ){

            if(event.target.name ==='itemDescription'){
                this.setState({descriptionVal: event.target.value});
                console.log('Item Description: '+ this.state.descriptionVal);
            }

            if(event.target.name ==='itemPrice'){
                this.setState({priceVal: event.target.value});
                console.log('Item Price: '+ this.state.priceVal);
            }

            if(event.target.name ==='termsAndConditions'){
                this.setState({termsAndConditions: event.target.value});
                console.log('Terms And Conditions: '+ this.state.termsAndConditions);
            }

            if(event.target.name ==='invoiceDescription'){
                this.setState({invoiceDescription: event.target.value});
                console.log('Invoice Description: '+ this.state.invoiceDescription);
            }

            if(event.target.name ==='sellerName'){
                this.setState({sellerName: event.target.value});
                console.log('Seller Name: ' + this.state.sellerName);
            }

            if(event.target.name ==='sellerAddress'){
                this.setState({sellerAddress: event.target.value});
                console.log('Seller Address: ' + this.state.sellerAddress);
            }

            if(event.target.name ==='customerName'){
                this.setState({customerName: event.target.value});
                console.log('Customer Name: ' + this.state.customerName);
            }

            if(event.target.name ==='customerAddress'){
                this.setState({customerAddress: event.target.value});
                console.log('Seller Name: ' + this.state.customerAddress);
            }
        }

        buttonClick(){
            this.setState((state,props) =>{
                
                //update array
                const currentArray = this.state.itemsListing;
                return{
                    itemsListing: currentArray.concat([
                        {
                            description: state.descriptionVal,
                            price: parseFloat(state.priceVal)
                        }
                    ])
                }
            });
            console.log('You want to add item to the listing')
        }

        handleSubmit(event){
            //prevents webpage from relaoding
            event.preventDefault();

            //final price
            const currentItems = this.state.itemsListing;
            let finalPrice = 0;
            currentItems.map((product,index) =>{
                finalPrice += product.price;
            });

            //sales invoice information will be saved in mangodb
            const salesInvoice ={
                sellerName: this.state.sellerName,
                sellerAddress: this.state.sellerAddress,
                customerName: this.state.customerName,
                customerAddress: this.state.customerAddress,
                items : this.state.itemsListing,
                finalPrice: finalPrice,
                terms : this.state.termsAndConditions,
                invoiceDescription: this.state.invoiceDescription
            }

            //stores the data to the database
            fetch('/api/createinvoice',{
                method: 'POST',
                body: JSON.stringify(salesInvoice),
                headers:{
                    'Content-Type' : 'application/json'
                }
            })  .then((response) =>{
                if(response.ok){
                    this.setState({
                        show: true,
                        title: 'Success!!',
                        content:'The invoice was created successfully'
                    });
                    //if everything is working
                    console.log('The invoice was saved to database successfully..')
                }else{
                    //something went wrong when save data into db
                    this.setState({
                        show: true,
                        title: 'Error!!',
                        content:'Problem when saving invoice!!!'
                    });
                    console.log('Problem saving to the database... ')
                }
            })

            console.log('You want to create new sales invoice ')
        }

       

        render(){
            return(
                <Form onSubmit={this.handleSubmit}>  
                    <Container>
                        <Row style={{marginTop:'1em'}}>
                            <Col>
                                <CustomCard head='Sellers Information'>
                                    <CustomTextField 
                                        customId='seller-name' 
                                        label="Seller's name" 
                                        placeholder='Type in the seller name...'
                                        name = "sellerName" 
                                        val={this.state.sellerName}
                                        inputHandler={this.textFieldsHandler}
                                        // text='Enter the full seller name'
                                    />  

                                    <CustomTextField 
                                        customId='seller-address' 
                                        label="Seller's address" 
                                        placeholder='Type in the address...'
                                        name = "sellerAddress" 
                                        val={this.state.sellerAddress}
                                        inputHandler={this.textFieldsHandler}
                                        // text='Enter the full address'
                                    />  
                                </CustomCard>
                            </Col>
                      
                            <Col>
                                <CustomCard head='Customer Information'>
                                    <CustomTextField 
                                        customId='customer-name' 
                                        label="Customer's name" 
                                        placeholder='Type in the customer name...'
                                        name = "customerName" 
                                        val={this.state.customerName}
                                        inputHandler={this.textFieldsHandler}
                                        // text='Enter the full customer name'
                                    />  

                                    <CustomTextField 
                                        customId='customer-address' 
                                        label="Customers's address" 
                                        placeholder='Type in the customer address'
                                        name = "customerAddress" 
                                        val={this.state.customerAddress}
                                        inputHandler={this.textFieldsHandler}
                                        // text='Enter the full customer address'
                                    />
                                </CustomCard> 
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1em'}}>
                            <Col>
                                <CustomCard head='Items Purchased'>
                                    <ProductsAndPrices
                                    
                                    itemsListing = {this.state.itemsListing}
                                />
                                <InputDescriptionAndPrice
                                    descriptionVal = {this.state.descriptionVal}
                                    priceVal = {this.state.priceVal}
                                    customHandler = {this.textFieldsHandler}
                                    buttonHandler = {this.buttonClick}
                                />
                                </CustomCard>                    
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1em'}}>
                            <Col>
                                <CustomCard head='Final Price'>
                                    <FinalPrice
                                        itemsListing ={this.state.itemsListing}
                                    />
                                </CustomCard>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1em'}}>
                            <Col>
                                <CustomCard head='Invoice Description'>
                                    <CustomTextArea
                                        label = 'Invoice Description   '
                                        name = 'invoiceDescription'
                                        val = {this.state.invoiceDescription}
                                        inputHandler = {this.textFieldsHandler}
                                    />
                                </CustomCard>
                            </Col>
                            <Col>
                                <CustomCard head='Terms and Conditions'>
                                    <CustomTextArea
                                        label = 'Terms and Conditions'
                                        name = 'termsAndConditions'
                                        val = {this.state.termsAndConditions}
                                        inputHandler = {this.textFieldsHandler}
                                    />
                                </CustomCard>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'1em'}}>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <ButtonGroup>
                                            <Button
                                                type ='submit'
                                                varient='primary'
                                                size='sm'>
                                                Create Sales Invoice
                                            </Button>
                                            <ButtonToHomePage/>
                                        </ButtonGroup>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                               {/* dialog pop-up window is hidden by default in state show: false */}
                                <DialogBox
                                    show ={this.state.show}
                                    title ={this.state.title}
                                    content ={this.state.content}
                                    closeHandler = {this.closeWindow}
                                />
                </Form>
            );
        }

}