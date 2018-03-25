import React, { Component } from 'react';
import './App.scss';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

class App extends Component {

  state = {
    currentDevice: [],
    data: [],
    color: undefined,
    capacity: undefined,
    capacityOptions: [],
    colorOptions: []
  };

  componentDidMount() {
    fetch('/api/phones.json')
      .then((response) => response.json())
      .then(data => {
        this.setState({ data: data[0] });

        return this.state.data.deviceSummary
      })
      .then(deviceSummary => {
        let { capacityOptions, colorOptions } = this.massageData(deviceSummary);

        this.setState({
          capacityOptions,
          colorOptions
        })
      });
  }
  
  massageData(deviceSummary) {
    let colorOptions = [];
    let capacityOptions = [];

    deviceSummary.forEach(device => {

        colorOptions.push({
          colourName: device.colourName,
          colourHex: device.colourHex
        });

        capacityOptions.push(device.memory);
    });

    colorOptions = _.uniqBy(colorOptions, object => object.colourName);
    capacityOptions = _.uniq(capacityOptions);

    return {
      colorOptions,
      capacityOptions
    }
  }

  selectColor() {

  }

  selectCapacity() {

  }

  selectDevice() {

  }

  render() {
    return (
      <main className="product" itemProp="itemListElement" itemScope itemType="http://schema.org/Product">
          <figure className="product__media">
              <img itemProp="image" src={this.state.currentDevice.merchandisingMedia} alt=""/>
          </figure>
          <div className="product__details">
            <h1 className="product__title" itemProp="model">Product title</h1>
            <p className="product__description" itemProp="description"></p>

            <section className="product__row">
              <h2 className="semantics-only">Customer rating</h2>
              <figure className="rating">
                <div className="rating__graphic"><i/><i/><i/><i/><i/></div>
                <figcaption className="" itemProp="aggregateRating">Rating</figcaption>
              </figure>
            </section>

            <form className="product__row">
              <h2 className="semantics-only">Product customisation</h2>

              <fieldset className="picker">
                <legend className="picker__title" itemProp="color">Colour: value</legend>
                <input type="radio" id="contactChoice1" name="color" value="email" />
                <input type="radio" id="contactChoice2" name="color" value="phone" />
                <input type="radio" id="contactChoice3" name="color" value="mail" />
              </fieldset>

              <fieldset className="picker">
                <legend className="picker__title">Capacity: value</legend>
                <input type="radio" id="contactChoice1" name="color" value="email" />
                <input type="radio" id="contactChoice2" name="color" value="phone" />
                <input type="radio" id="contactChoice3" name="color" value="mail" />
              </fieldset>
            </form>

            <section className="product__row price">
              <h2 className="semantics-only">Price</h2>
              <p className="price__breakdown" itemProp="price">from <span className="price__emphasis">X</span> upfront cost</p>
              <p className="price__breakdown" itemProp="price">when you pay <span className="price__emphasis">£43.10</span> a month</p>
            </section>
          </div>
      </main>
    );
  }
}

export default App;
