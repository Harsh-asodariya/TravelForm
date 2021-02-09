import React, { Component } from 'react';

class Select extends Component {

    render() {
        return (
            <div>
                <label className='Label'>{this.props.label}</label>
                <select
                id={this.props.id}
                
                className={'form-select'}
                value={this.props.value}
                onChange={this.props.changed}>
                {this.props.options.map(option => (
                    <option key={option.value}  value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            </div>
        )
    }
}

export default Select;