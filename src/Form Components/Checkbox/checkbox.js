import React, { Component } from 'react';

class Checkbox extends Component {

    render() {
        return (
            <div>
                <label className='Label'>{this.props.label}</label>
                <div
                style={{ textAlign: 'left', }}
                
                id={this.props.id}
                value={this.props.value}
                onChange={this.props.changed}>
                {this.props.options.map(option => (
                    <div key={option.value} className={'form-check'}>
                        <input className={'form-check-input'} type="checkbox" id={option.id} value={option.value} />
                        <label className={'form-check-label'} htmlFor={option.id}>{option.displayValue}</label>
                    </div>
                ))}
            </div>
            </div>
        )
    }
}

export default Checkbox;