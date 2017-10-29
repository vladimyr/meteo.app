'use strict';

import { el } from 'redom';

export default class Forecast {
  constructor() {
    this.el = el('li.forecast',
      el('.conditions',
        this.conditions = el('img')),
      el('.wind',
        this.wind = el('img')),
      el('.temperature',
        this.tempHigh = el('span.high'),
        this.tempLow = el('span.low')));
  }
  update({ conditions, wind, temperature }) {
    this.conditions.src = conditions.url;
    this.conditions.alt = conditions.name;
    this.wind.src = wind.url;
    this.wind.alt = wind.name;
    this.tempHigh.textContent = `${temperature.max}°`;
    this.tempLow.textContent = `/${temperature.min}°`;
  }
}
