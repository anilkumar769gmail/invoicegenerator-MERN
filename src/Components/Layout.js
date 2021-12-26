import React from 'react'
import CustomTextField from './CustomTextField';
import CustomTextArea from './CustomTextArea';
import ProductsAndPrices from './ProductsAndPricesListing';
import FinalPrice from './FinalPrice';
import InputDescriptionAndPrice from './InputDescriptionAndPrice';

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
                itemsListing:[
                    {description: 'Green Shirt', price:10},
                    {description: 'Red Shirt', price:10},
                    {description: 'Black Shirt', price:10}
                ],
                descriptionVal:"",
                priceVal:"",
            }
            this.textFieldsHandler= this.textFieldsHandler.bind(this);
            this.buttonClick = this.buttonClick.bind(this);
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
            console.log('You want to add item to the listing')
        }

        render(){
            return(
                <div>  
                    <CustomTextArea
                        label = 'Invoice Description'
                        name = 'invoiceDescription'
                        val = {this.state.invoiceDescription}
                        inputHandler = {this.textFieldsHandler}
                    />
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
                    <ProductsAndPrices
                        itemsListing = {this.state.itemsListing}
                    />
                    <InputDescriptionAndPrice
                        descriptionVal = {this.state.descriptionVal}
                        priceVal = {this.state.priceVal}
                        customHandler = {this.textFieldsHandler}
                        buttonHandler = {this.buttonClick}
                    />
                    <FinalPrice
                        itemsListing ={this.state.itemsListing}
                    />
                    <CustomTextArea
                        label = 'Terms and Conditions'
                        name = 'termsAndConditions'
                        val = {this.state.termsAndConditions}
                        inputHandler = {this.textFieldsHandler}
                    />
                </div>
            );
        }

}