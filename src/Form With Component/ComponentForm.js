import React, { Component } from 'react';
import Input from '../Form Components/Input/input';
import Select from '../Form Components/Select/select';
import Checkbox from '../Form Components/Checkbox/checkbox';
import Radio from '../Form Components/Radio/radio';
import Textarea from '../Form Components/Textarea/textarea';
import Dropzone from '../Form Components/Dropzone/dropzone';

class ComponentFrom extends Component {
    state = {
        formdata: {
            name: '',
            email: '',
            car: 'tesla',
            music: [],
            delivery: '',
            address: '',
            droppdedFile: null
        },
        formIsValid: {
            name: false,
            email: false,
            delivery: false,
            address: false,
            droppdedFile: false
        },
    }

    validationHandler = (id, check) => {
        let updatedstate = {
            ...this.state.formIsValid
        }
        updatedstate[id] = check
        this.setState({ formIsValid: updatedstate })
    }

    radioValidation = (id) => {
        const name = document.getElementsByName(id);
        var formValid = false;
        var i = 0;
        while (!formValid && i < name.length) {
            if (name[i].checked) formValid = true;
            i++;
        }
        let updatedstate = {
            ...this.state.formIsValid
        }
        updatedstate[id] = formValid
        this.setState({ formIsValid: updatedstate })
        return formValid;
    }

    dropzoneSubmitHandler = (file) => {
        let updatedState = {
            ...this.state.formdata
        }
        updatedState.droppdedFile = file
        let check
        if (file !== null) {
            check = true
        } else {
            check = false
        }
        this.validationHandler('droppdedFile', check)
        this.setState({ formdata: updatedState })
    }

    inputChangeHandler = (event) => {
        let val
        if (event.value) {
            val = event.value
        } else {
            val = event.target.id
        }
        if (val === 'option1' || val === 'option2' || val === 'option3') {
            val = 'music'
        }
        if (val === 'radio1' || val === 'radio2' || val === 'radio3') {
            val = 'delivery'
        }
        if (val === 'tesla' || val === 'lamborgini' || val === 'jaguar' || val === 'fortuner') {
            val = 'car'
        }
        let updatedState = {
            ...this.state.formdata
        }
        if (val === 'music') {
            if (!updatedState.music.includes(event.target.value)) {
                updatedState.music.push(event.target.value)
            }
            else {
                const index = updatedState.music.indexOf(event.target.value)
                updatedState.music.splice(index, 1)
            }
        }
        else if (val === 'car') {
            updatedState[val] = event.value;
        }
        else {
            updatedState[val] = event.target.value;
        }
        if (val === 'delivery') {
            this.radioValidation('delivery')
        }
        this.setState({ formdata: updatedState })
    }

    submitEventHandler = (event) => {
        event.preventDefault()
        let valid = {
            ...this.state.formIsValid
        }
        let validation = true
        for (let key in valid) {
            validation = validation && valid[key]
        }
        if (validation) {
            alert('success')
        }
        else {
            alert('please fill all the field correctly')
        }
        document.getElementById('componentForm').reset()
        console.log(this.state)
    }

    render() {
        let musicOptions = [
            { id: 'option1', value: 'jass', displayValue: 'Jass' },
            { id: 'option2', value: 'classical', displayValue: 'Classical' },
            { id: 'option3', value: 'pop', displayValue: 'Pop' }
        ];
        let carOptions = [
            { value: 'tesla', label: 'Tesla' },
            { value: 'lamborgini', label: 'Lamborgini' },
            { value: 'jaguar', label: 'Jaguar' },
            { value: 'fortuner', label: 'Fortuner' }
        ]
        let deliveryOptions = [
            { id: 'radio1', value: 'moderate', displayValue: 'Moderate' },
            { id: 'radio2', value: 'faster', displayValue: 'Faster' },
            { id: 'radio3', value: 'fastest', displayValue: 'Fastest' },
        ]
        return (
            <div>
                <form id='componentForm' className='Form'>
                    <Input validation='^[a-zA-Z\s]+$' valid={this.validationHandler} id='name' type='text' placeholder='Enter Your Name' value={this.state.formdata.name} label='Name' changed={this.inputChangeHandler} />
                    <Input validation='^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$' valid={this.validationHandler} id='email' type='email' placeholder='Enter Your Email' value={this.state.formdata.email} label='Email' changed={this.inputChangeHandler} />
                    <Select id='car' options={carOptions} label='Car' value={this.state.formdata.car} changed={this.inputChangeHandler} />
                    <Checkbox id='music' options={musicOptions} label='Music' value={this.state.formdata.music} changed={this.inputChangeHandler} />
                    <Radio id='delivery' name='delivery' options={deliveryOptions} label='Delivery' value={this.state.formdata.delivery} changed={this.inputChangeHandler} />
                    <Textarea validation="^[A-Za-z0-9'\.\-\s\,]+$" valid={this.validationHandler} label='Address' id='address' type='text' placeholder='Enter Your Address' value={this.state.formdata.address} changed={this.inputChangeHandler} />
                    <Dropzone onsubmit={this.dropzoneSubmitHandler} label='Select your image' />
                    <button style={{ margin: '20px auto' }} className={'btn btn-primary'} onClick={this.submitEventHandler} >Submit</button>
                </form>
            </div>
        )
    }
}

export default ComponentFrom;