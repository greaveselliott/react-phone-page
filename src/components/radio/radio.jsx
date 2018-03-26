import React from 'react';
import PropTypes from 'prop-types';
import './radio.scss';

const Radio = ({ options, name, handler, selected, innerText }) => (
    <fieldset className="radio">
    <legend className="radio__title" itemProp="color">{name}:<strong className="radio__value">{selected}</strong></legend>
    {
        
        options.map(option => {
            return <span className="radio__wrapper" key={option.name}>
                    <input 
                        className={`radio__button ${option.name === selected ? 'radio__button--checked': ''} ${innerText ? 'radio__button--inner-text' : ''}`} 
                        style={{'backgroundColor': option.value}} 
                        onChange={handler}
                        checked={option.name === selected} 
                        type="radio" 
                        id={option.name} 
                        name={name} 
                        value={option.value}
                    />
                    {innerText && <span className="radio__overlay">{option.value}</span>}
                </span>
        })
    }
  </fieldset>
);

Radio.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    selected: PropTypes.string,
    innerText: PropTypes.bool
}

export default Radio;