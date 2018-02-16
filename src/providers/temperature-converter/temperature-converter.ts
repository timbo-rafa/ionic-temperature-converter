import { Injectable } from '@angular/core';

/*
  Generated class for the TemperatureConverterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TemperatureConverterProvider {

  constructor() {
    console.log('Hello TemperatureConverterProvider Provider');
  }

  temperatures = {
    Celsius:    { //to
      Celsius   : this.identity,
      Kelvin    : this.kelvinToCelsius,
      Fahrenheit: this.fahrenheitToCelsius
    },
    Kelvin:     { //to
      Celsius   : this.celsiusToKelvin,
      Kelvin    : this.identity,
      Fahrenheit: this.fahrenheitToKelvin
    },
    Fahrenheit: { //to
      Celsius   : this.celsiusToFahrenheit,
      Kelvin    : this.kelvinToFahrenheit,
      Fahrenheit: this.identity
    }
  }
  defaultTemperature = 'Celsius'

  define(temperature, tableOfConvertersObject, newTemperatureToCelsius, newTemperatureToKelvin, newTemperatureToFahrenheit) {
    this.temperatures[temperature] = tableOfConvertersObject
    this.temperatures.Celsius[temperature]    = newTemperatureToCelsius
    this.temperatures.Kelvin[temperature]     = newTemperatureToKelvin
    this.temperatures.Fahrenheit[temperature] = newTemperatureToFahrenheit
  }

  setDefaultTemperature(temperature) {
    this.defaultTemperature = temperature
    return this.defaultTemperature
  }

  factory() {
    var factory = {
      getConverter: function(temperature) {
        if (arguments.length === 0) temperature = factory.defaultTemperature
        if (!(temperature in this.temperatures)) throw new Error('Unknown temperature specified: ' + temperature)
        return this.temperatures[temperature]
      },
      defaultTemperature: this.defaultTemperature,
      temperatures() {
        return Object.keys(this.temperatures)
      }
    }
    return factory
  }

  // Converter functions
  identity(temperature: number) : number {
    console.log('identity', temperature)
    return temperature
  }

  celsiusToKelvin(celsius: number) : number {
    console.log('celsiusToKelvin', celsius)
    return celsius + 273.15
  }

  celsiusToFahrenheit(celsius: number) : number {
    return celsius * 1.8 + 32
  }

  kelvinToFahrenheit(kelvin: number) : number {
    return (9/5 * kelvin) - 459.67
  }

  kelvinToCelsius(kelvin: number) : number {
    return kelvin - 273.15
  }

  fahrenheitToCelsius(fahrenheit: number) : number {
    return (fahrenheit - 32)/ 1.8
  }

  fahrenheitToKelvin(fahrenheit: number) : number {
    return (fahrenheit + 459.67) * 5/9
  }
}
