import React from 'react';
import './input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement']
    if(props.invalid && props.touched){
        inputClasses.push('Invalid')
    }

    switch (props.elementType) {
        case 'Input':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case 'Select':
            inputElement = <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            break;
        case 'Checkbox':
            inputElement = <div
                style={{ textAlign: 'left', }}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <div key={option.value}>
                        <input type="checkbox" id={option.id} value={option.value} />
                        <label htmlFor={option.id}>{option.displayValue}</label>
                    </div>
                ))}
            </div>
            break;
        case 'Radio':
            inputElement = <div
                style={{ textAlign: 'left', display: 'inline-flex', justifyContent: 'space-evenly' }}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <div key={option.value}>
                        <input type="radio" name='delivery' id={option.id} value={option.value} />
                        <label htmlFor={option.id}>{option.displayValue}</label>
                    </div>
                ))}
            </div>
            break;
        case 'TextArea':
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.changed}
            />
    }

    return (
        <div className='InputFields'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;