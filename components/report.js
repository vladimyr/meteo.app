'use strict';

const { el, list } = require('redom');
const Forecast = require('./forecast.js');

class Report {
  constructor() {
    this.el = el('.report',
      this.date = el('span.date'),
      this.forecasts = list('ul.forecasts', Forecast));
  }
  update({ date, forecasts }) {
    this.date.textContent = date;
    this.forecasts.update(forecasts);
  }
}

module.exports = Report;
