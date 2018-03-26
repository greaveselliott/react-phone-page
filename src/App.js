import React, { Component } from 'react';
import './App.scss';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

import Radio from './components/radio/radio.jsx';
import Rating from './components/rating/rating.jsx'

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
          capacity: capacityOptions[0].name,
          capacityOptions,
          color: colorOptions[0].name,
          colorOptions
        })

        return deviceSummary;
      })
      .then(deviceSummary => {
        this.selectDevice();
      })
  }
  
  massageData(deviceSummary) {
    let colorOptions = [];
    let capacityOptions = [];

    deviceSummary.forEach(device => {
        colorOptions.push({ name: device.colourName, value: device.colourHex });
        capacityOptions.push({ name: device.memory, value: device.memory});
    });

    colorOptions = _.uniqBy(colorOptions, object => object.name);
    capacityOptions = _.uniqBy(capacityOptions, object => object.name);

    return {
      colorOptions,
      capacityOptions
    }
  }

  selectColor = (event) => {
    this.setState({
      color: event.target.id
    }, () => {
      this.selectDevice();
    });
  }

  selectCapacity = (event) => {
    this.setState({
      capacity: event.target.id
    }, () => {
      this.selectDevice();
    });
  }

  selectDevice() {
    this.setState({
      currentDevice: _.findIndex(this.state.data.deviceSummary, { colourName: this.state.color, memory: this.state.capacity })
    });
  }

  getMonthlyPrice() {
    const price = _.get(this.state, `data.deviceSummary[${this.state.currentDevice}]priceInfo.bundlePrice.monthlyPrice.gross`,"N/A");

    return `£${price}`;
  }

  getUpfrontPrice() {
    const price = _.get(this.state, `data.deviceSummary[${this.state.currentDevice}]priceInfo.hardwarePrice.oneOffPrice.gross`,"N/A");

    return `£${price}`;
  }

  getProductTitle() {
    return _.get(this.state, `data.deviceSummary[${this.state.currentDevice}]displayName`);
  }

  getProductImage() {
    return _.get(this.state, `data.deviceSummary[${this.state.currentDevice}]merchandisingMedia[0].value`);
  }

  getProductDescription() {
    return _.get(this.state, `data.deviceSummary[${this.state.currentDevice}]displayDescription`);
  }

  render() {
    return (
      <main className="product" itemProp="itemListElement" itemScope itemType="http://schema.org/Product">
          <div className="product__column">
            <figure className="product__media">
                <img className="product__image" itemProp="image" src={this.getProductImage()} alt=""/>
            </figure>
          </div>
          <div className="product__column">
            <h1 className="product__title" itemProp="model">{this.getProductTitle()}</h1>
            <Rating rating={this.state.data.rating}/>
            <p className="product__description" itemProp="description">{this.getProductDescription()}</p>
            
            <form className="product__customisation">
              <h2 className="semantics-only">Product customisation</h2>
              <Radio handler={this.selectColor} options={this.state.colorOptions} name="Color" selected={this.state.color}/>
              <Radio handler={this.selectCapacity} options={this.state.capacityOptions} name="Capacity" selected={this.state.capacity} innerText/>
            </form>

            <section className="product__price">
              <h2 className="semantics-only">Price</h2>
              <p className="product__price-breakdown" itemProp="price">From <span className="product__price-emphasis">{this.getUpfrontPrice()}</span> upfront cost</p>
              <p className="product__price-breakdown" itemProp="price">When you pay <span className="product__price-emphasis">{this.getMonthlyPrice()}</span> a month</p>
            </section>
          </div>
      </main>
    );
  }
}

export default App;
