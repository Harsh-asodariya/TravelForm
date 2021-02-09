import React, { Component } from 'react';
class Input extends Component {
    componentDidMount(){
        const name = document.getElementById(this.props.id);
        name.addEventListener('blur',()=>{
            // validate  name here through reguler expression(regex)
            let regex = RegExp(this.props.validation);
            let str = this.props.value;
            if(regex.test(str)){
                name.classList.remove('Invalid');
                this.props.valid(this.props.id, true)
            }
            else{
                name.classList.add('Invalid');
                this.props.valid(this.props.id, false)
            }
        })
    }
    render() {
        const inputClasses = ['form-control']
       
        return (
            <div className='input-field'>
                <label className='Label'>{this.props.label}</label>
                <input
                    className={inputClasses.join(' ')}
                    id={this.props.id}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.changed}
                />
            </div>
        )
    }
}

export default Input;