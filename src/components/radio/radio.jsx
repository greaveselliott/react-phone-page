import React from 'react';
import PropTypes from 'prop-types';
import './radio.scss';

const Radio = ({ options, name, handler, selected }) => (
    <fieldset className="radio">
    <legend className="radio__title" itemProp="color">{name}:<strong className="radio__value">{selected}</strong></legend>
    {
        options.map(option => {
            return <input 
                        className={`radio__button ${option.name === selected ? 'radio__button--checked': ''}`} 
                        style={{'background-color': option.value}} 
                        onChange={handler} key={option.name} 
                        checked={option.name === selected} 
                        type="radio" 
                        id={option.name} 
                        name={name} 
                        value={option.value} 
                    />
        })
    }
  </fieldset>
);

Radio.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    selected: PropTypes.string,
}

export default Radio;