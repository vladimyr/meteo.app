'use strict';

import { el, list } from 'redom';
import Forecast from './forecast';

export default class Report {
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
