import React, { Component } from 'react';
import Select from 'react-select';

const Checkbox = props => <input type="checkbox" {...props} />;

const Note = ({ Tag = 'div', ...props }) => (
    <Tag
        css={{
            color: 'hsl(0, 0%, 40%)',
            display: 'inline-block',
            fontSize: 12,
            fontStyle: 'italic',
            marginTop: '1em',
        }}
        {...props}
    />
);

class SelectField extends Component {
    state = {
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
        selectedValue : ''
    }
    componentDidMount() {
        this.setState({
            selectedValue: this.props.value,
        })
    }

    handleChange(selectedOption) {
        let value = selectedOption.value
        this.setState({ selectedValue : value});
    }

    toggleClearable = () =>
        this.setState({ isClearable: !this.state.isClearable })

    toggleDisabled = () =>
        this.setState({ isDisabled: !this.state.isDisabled });

    toggleLoading = () =>
        this.setState({ isLoading: !this.state.isLoading });

    toggleRtl = () =>
        this.setState({ isRtl: !this.state.isRtl });

    toggleSearchable = () =>
        this.setState({ isSearchable: !this.state.isSearchable });

    render() {

        return (
            <div>
                <label className='Label'>{this.props.label}</label>
                <Select
                    id={this.props.id}
                    onChange={this.props.changed}
                    className='basic-single'
                    classNamePrefix='select'
                    defaultValue={this.props.options[0]}
                    isDisabled={this.state.isDisabled}
                    isLoading={this.state.isLoading}
                    isClearable={this.state.isClearable}
                    isRtl={this.state.isRtl}
                    isSearchable={this.state.isSearchable}
                    name="car"
                    options={this.props.options}
                />
                <Note Tag="label">
                    <Checkbox
                        checked={this.state.isClearable}
                        onChange={this.toggleClearable}
                        id="cypress-single__clearable-checkbox"
                    />
          Clearable
        </Note>
                <Note Tag="label" style={{ marginLeft: '1em' }}>
                    <Checkbox
                        checked={this.state.isSearchable}
                        onChange={this.toggleSearchable}
                        id="cypress-single__searchable-checkbox"
                    />
          Searchable
        </Note>
                <Note Tag="label" style={{ marginLeft: '1em' }}>
                    <Checkbox
                        checked={this.state.isDisabled}
                        onChange={this.toggleDisabled}
                        id="cypress-single__disabled-checkbox"
                    />
          Disabled
        </Note>
                <Note Tag="label" style={{ marginLeft: '1em' }}>
                    <Checkbox
                        checked={this.state.isLoading}
                        onChange={this.toggleLoading}
                        id="cypress-single__loading-checkbox"
                    />
          Loading
        </Note>
                <Note Tag="label" style={{ marginLeft: '1em' }}>
                    <Checkbox
                        type="checkbox"
                        checked={this.state.isRtl}
                        onChange={this.toggleRtl}
                        id="cypress-single__rtl-checkbox"
                    />
          RTL
        </Note>
            </div>
        )
    }
}

export default SelectField;