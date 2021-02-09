import React, { Component } from 'react';

class Input extends Component {

    componentDidMount(){
        const name = document.getElementById(this.props.id);
        name.addEventListener('blur',()=>{
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
        return (
            <div>
                <label className='Label'>{this.props.label}</label>
                <textarea
                className={'form-control'}
                id = {this.props.id}
                value={this.props.value}
                onChange={this.props.changed}
            />
            </div>
        )
    }
}

export default Input;