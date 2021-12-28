import React from 'react';
import InvoicesTable from './InvoicesTable';
import DialogWindow from './DialogWindow';


export default class InvoicesListing extends React.Component{

    //configures parameters
    constructor(props){
      super(props);
      
      this.state={
          invoicesData:[],
          show: false,
          title: "",
          content: ""
      }

      this.deleteHandler = this.deleteHandler.bind(this);
      this.closeWindow = this.closeWindow.bind(this);
    }
        //pop-up box to be closed
        closeWindow(){
            this.setState({
                show: false
            })
            console.log('You want to close dialog box.')
        }

    deleteHandler(invoiceId){
        
        fetch('/api/deleteinvoice/'+ invoiceId,{
            method:'DELETE'
        }).then((response) =>{
            if(response.ok){
                //invoce was removed
               this.setState({
                   show: true,
                   title: 'Success!!',
                   content: 'The invoice wsa removed successfully'
               });
               //removing id and description
               const invoicesCopy = this.state.invoicesData;
               this.state.invoicesData.map((item, index) =>{
                if(item.id === invoiceId){
                    //removing invoice from the screen listing
                    invoicesCopy.splice(index, 1);
                    this.setState({
                        invoicesData: invoicesCopy
                    })
                }
               });
            }else{
                //something went wrong
                this.setState({
                    show: true,
                    title: 'ERROR!!',
                    content: 'Problem removing invoice'
                })
            }
        });
        console.log('You want to delete invoice with id: '+ invoiceId );
    }

    componentDidMount(){
        //this method will fetch data from the mangodb
        fetch('/api/readinvoice/all',{
            method: 'GET'
        }).then((response) =>{
            if(response.ok){
                //everything is okay
                return response.json();
                console.log(response.json())
            }else{
                //something wrong
                console.log('Problem reading information')
            }
            //respnse comming from webserver
        }).then((responseASJson) =>{
            
            let invoicesInfo = [];

            responseASJson.map((invoice, index) =>{
                invoicesInfo.push(
                    {
                        id: invoice._id,
                        description: invoice.invoiceDescription
                    }
                );
            });
            this.setState((state, props) =>{
               return {
                   invoicesData: state.invoicesData.concat(invoicesInfo)
               }
            });
            console.log(this.state.invoicesData);
        });
    }

    render(){
        return(
            <div>
                <InvoicesTable
                    invoicesData = {this.state.invoicesData}
                    handleDelete={this.deleteHandler}
                />
                <DialogWindow
                    show ={this.state.show}
                    title ={this.state.title}
                    content ={this.state.content}
                    closeHandler = {this.closeWindow}
                />     
            </div>
           
        );
    }
}