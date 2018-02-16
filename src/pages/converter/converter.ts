import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { TemperatureConverterDirective } from '../../directives/temperature-converter/temperature-converter'

@Component({
  selector: 'page-converter',
  templateUrl: 'converter.html'
})
export class ConverterPage {

  from: string = "Celsius"
  to: string = "Kelvin"
  value: number = 0
  result: number = 0

  selectedFrom: any = {
    Celsius: true,
    Kelvin: false,
    Fahrenheit: false
  }

  selectedTo: any = {
    Celsius: false,
    Kelvin: true,
    Fahrenheit: false
  }

  constructor(public navCtrl: NavController) {

  }

  setFrom(from: string) {
    console.log('Converting from', from)
    this.from = from

    // color the selected button
    this.selectedFrom["Celsius"] = false
    this.selectedFrom["Kelvin"] = false
    this.selectedFrom["Fahrenheit"] = false
    this.selectedFrom[from] = true
  }

  setTo(to: string) {
    console.log('Converting to', to)
    this.to = to

    // color the selected button
    this.selectedTo["Celsius"] = false
    this.selectedTo["Kelvin"] = false
    this.selectedTo["Fahrenheit"] = false
    this.selectedTo[to] = true
  }

  updateResult(event) {
    console.log('updateResult:', event)
    this.result = event
  }
}
