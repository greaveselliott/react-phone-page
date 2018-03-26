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
      currentDevice: _.find(this.state.data.deviceSummary, { colourName: this.state.color, memory: this.state.capacity })
    });
  }

  getMonthlyPrice() {

  }

  render() {
    return (
      <main className="product" itemProp="itemListElement" itemScope itemType="http://schema.org/Product">
          <div className="product__column">
            <figure className="product__media">
                <img className="product__image" itemProp="image" src={_.get(this.state.currentDevice, "merchandisingMedia[0].value", "")} alt=""/>
            </figure>
          </div>
          <div className="product__column">
            <h1 className="product__title" itemProp="model">{this.state.currentDevice.displayName}</h1>
            <Rating rating={this.state.data.rating}/>
            <p className="product__description" itemProp="description">{this.state.currentDevice.displayDescription}</p>
            <form className="product__customisation">
              <h2 className="semantics-only">Product customisation</h2>

              <Radio handler={this.selectCapacity} options={this.state.capacityOptions} name="Capacity" selected={this.state.capacity}/>
              <Radio handler={this.selectColor} options={this.state.colorOptions} name="Color" selected={this.state.color}/>
            </form>

            <section className="product__price">
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
