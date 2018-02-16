import { Directive, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { TemperatureConverterProvider } from '../../providers/temperature-converter/temperature-converter'
/**
 * Generated class for the TemperatureConverterDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[temperature-converter]' // Attribute selector
})
export class TemperatureConverterDirective implements OnChanges {

  @Input('from')
  from: string

  @Input('to')
  to: string

  @Input('value')
  value: number

  @Output('result')
  resultEmitter: EventEmitter<number> = new EventEmitter<number>()

  result: number = 0
  temperatureConverter: any
  convertFrom: any
  convert: any

  constructor( temperatureConverter: TemperatureConverterProvider) {
    console.log('Hello TemperatureConverterDirective Directive');
    this.temperatureConverter = temperatureConverter
  }

  toChanged() {
    this.convertFrom = this.temperatureConverter.temperatures[this.to]
    //console.log('convertTo:', this.convertFrom)
  }

  ngOnChanges(changes : SimpleChanges){
    //console.log('directive ngOnChanges')
    //console.log('Available temperatures:', this.temperatureConverter.temperatures)
    //console.log(changes)
    console.log('from', this.from, 'to', this.to, this.value)
    
    if (changes.from) {
      this.from = changes.from.currentValue
    }

    if (changes.to) {
      this.to = changes.to.currentValue
      this.toChanged()
    }

    this.convert = this.convertFrom[this.from]
    this.result = this.convert(+this.value)
    this.resultEmitter.emit(+this.result)
  }

}
