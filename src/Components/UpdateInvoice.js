import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CustomCard from './CustomCard';
import CustomTextArea from './CustomTextArea';
import CustomTextField from './CustomTextField';
import ProductsAndPrices from './ProductsAndPricesListing';;
import InputDescriptionAndPrice from './InputDescriptionAndPrice';
import FinalPrice from './FinalPrice';
import Form from 'react-bootstrap/Form';
import DialogBox from './DialogWindow';
import ButtonToInvoicesListing from './ButtonToInvoicesListing';

export default class UpdateInvoice extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            fetchError: false,
            sellerName: "",
            sellerAddress: "",
            customerName: "",
            customerAddress: "",
            invoiceDescription: "",
            termsAndConditions: "",
            itemsListing:[],
            descriptionVal:"",
            priceVal:"",
            show: false,
            title: "",
            content: "",

        }
        this.textFieldsHandler= this.textFieldsHandler.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }
     closeWindow(){
       this.setState({
           show: false
       })
     }
     //gets user input changes
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

        //final price
        const currentItems = this.state.itemsListing;
        let finalPrice = 0;
        currentItems.map((product,index) =>{
            finalPrice += product.price;
        });
        //contains information to update the database
        const data ={
            sellerName: this.state.sellerName,
            sellerAddress: this.state.sellerAddress,
            customerName: this.state.customerName,
            customerAddress: this.state.customerAddress,
            invoiceDescription: this.state.invoiceDescription,
            terms: this.state.termsAndConditions,
            items: this.state.itemsListing,
            finalPrice: finalPrice
        }

        fetch('/api/updateinvoice/'+ this.props.invoiceId,{
            method: 'PUT',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(( response ) =>{
            if(response.ok){
                //the information was updated
                return response.json();
            }else{
                //problems when updating information
                throw new Error();
            }
        }).then((responseAsJson) =>{
            this.setState({
                show: true,
                title: 'Success!!',
                content :'The information was updated successfully'
            });
             console.log('Information successfully updated...')
        }).catch(() =>{
            this.setState({
                show: true,
                title: 'Error!!',
                content :'Problem when updating information'
            });
            console.log('Error when updating information...')
        });
        //prevents webpage reloading
        event.preventDefault();
    }
    //method runs automatically without creating the instance
    componentDidMount(){
        fetch('/api/readinvoice/'+ this.props.invoiceId,{
            method: 'GET'
        }).then((response) => {
            if(response.ok){
                //if everything is working
                return response.json();
            }else {
                //if something fails
                throw new Error();
            }
        }).then(( responseAsJson )=>{

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
            })
            console.log('The information was read')
        }).catch(() =>{
            this.setState({fetchError: true})
            console.log('Problem occured while reading information')
        })
    }

    render(){

        if (this.state.fetchError){
            //if fetchError = true, means something has gone wrong and this block executes
            return(
                <div id='invoicebg'className='jumbotron'>
                    <Card bg='dark' text='white'>
                        <Card.Header as='h3' style={{textAlign:'center'}}>
                            Update Invoice
                        </Card.Header>
                        <Card.Body>
                            <h1>ERROR: Problem reading information from mongodb</h1>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
        return(
            <div id='invoicebg'className='jumbotron'>
                <Card bg='dark' text='white'>
                    <Card.Header as='h3' style={{textAlign:'center'}}>
                        Update Invoice
                    </Card.Header>
                    <Card.Body style={{color:'black'}}>
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
                                                        Update Sales Invoice
                                                    </Button>
                                                    <ButtonToInvoicesListing/>
                                                </ButtonGroup>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                            <DialogBox
                                    show ={this.state.show}
                                    title ={this.state.title}
                                    content ={this.state.content}
                                    closeHandler = {this.closeWindow}
                                />
                        </Form>
                    </Card.Body>
                </Card>
            </div>  
        );
    }
}