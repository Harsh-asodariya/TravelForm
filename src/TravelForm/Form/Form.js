import React, { Component } from 'react';
import Input from '../InputFields/Input';
import './Form.css';
import axios from '../../axios-travel';

class Form extends Component {

    state = {
        TravelForm: {
            name: {
                label: 'Name',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                    placeholder: 'Enter your name'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid: false,
                touched:false
            },
            email: {
                label: 'E-mail',
                elementType: 'Input',
                elementConfig: {
                    type: 'Email',
                    placeholder: 'Enter your Email'
                },
                value:'',
                validation:{
                    required:true,
                    regex:/^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$/
                },
                valid: false,
                touched:false
            },
            car:{
                label: 'Select your car',
                elementType: 'Select',
                elementConfig: {
                    options:[
                        {value:'tesla', displayValue:'Tesla'},
                        {value:'lamborgini', displayValue:'Lamborgini'},
                        {value:'jaguar', displayValue:'Jaguar'},
                        {value:'fortuner', displayValue:'Fortuner'}
                    ]
                },
                value:'tesla',
                validation:{
                    required:false
                },
                valid: true,
                touched:false
            },
            music:{
                label: 'Select music',
                elementType: 'Checkbox',
                elementConfig: {
                    options:[
                        {id:'option1', value:'jass', displayValue:'Jass'},
                        {id:'option2', value:'classical', displayValue:'Classical'},
                        {id:'option3', value:'pop', displayValue:'Pop'},
                        
                    ]
                },
                value:[],
                validation:{
                    required:false
                },
                valid: true,
                touched:false
            },
            delivery:{
                label: 'Select delivery method',
                elementType: 'Radio',
                elementConfig: {
                    options:[
                        {id:'radio1', value:'moderate', displayValue:'Moderate'},
                        {id:'radio2', value:'faster', displayValue:'Faster'},
                        {id:'radio3', value:'fastest', displayValue:'Fastest'},
                        
                    ]
                },
                value:'moderate',
                validation:{
                    required:true
                },
                valid: false,
                touched:false
            },
            address: {
                label: 'Address',
                elementType: 'TextArea',
                elementConfig: {
                    type: 'Text',
                    placeholder: 'Enter your address'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false,
                touched:false
            },
        },
        formIsValid:false
    }

    dataHandler = (event) =>{
        const formData = {};
        for(let formElement in this.state.TravelForm){
            formData[formElement] = this.state.TravelForm[formElement].value;
        }
        axios.post('/Booking.json',formData)
            .then(alert('success'))
            .catch(error =>{
                alert('tryagain')})
    }

    checkValidity = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
            if(rules.regex){
                isValid = rules.regex.test(value) && isValid;
            }
        }
        return isValid
    }

    inputChangeHandler = (event, inputIdentifier) =>{
        const updatedtravelForm = {
            ...this.state.TravelForm
        }
        const updatedFormElement = {
            ...updatedtravelForm[inputIdentifier]
        }
        if(inputIdentifier === 'music'){
            if(!updatedFormElement.value.includes(event.target.value) ){
                updatedFormElement.value.push(event.target.value)
            }
            else{
                const index = updatedFormElement.value.indexOf(event.target.value)
                updatedFormElement.value.splice(index,1)
            }
        }
        else{
        updatedFormElement.value = event.target.value;}
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedtravelForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for(let inputIdentifier in updatedtravelForm){
            formIsValid = updatedtravelForm[inputIdentifier].valid && formIsValid
        }
        
        this.setState({TravelForm: updatedtravelForm, formIsValid:formIsValid})
    }

    render() {

        let formElements = [];
        for (let key in this.state.TravelForm){
            formElements.push({
                id: key,
                config: this.state.TravelForm[key]
            })
        }

        let form = (
            <form onSubmit={this.dataHandler}>
                {
                    formElements.map(element =>(
                        <Input 
                            key={element.id}
                            elementType = {element.config.elementType}
                            label = {element.config.label}
                            elementConfig={element.config.elementConfig}
                            value = {element.config.value}
                            invalid = {!element.config.valid}
                            touched = {element.config.touched}
                            changed = {(event) =>this.inputChangeHandler(event, element.id)}/>
                    ))
                }
                <button style={{margin: '20px auto',
                                fontWeight: 'bold',
                                fontSize: 'larger'}}  
                    disabled={!this.state.formIsValid}>CONFIRM</button>
            </form>
        )

        return (
            <div className='Form'>
                <h1>Santa-Banta Travells</h1>
                {form}
            </div>);
    }
}

export default Form;