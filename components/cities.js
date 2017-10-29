'use strict';

import { el, list } from 'redom';
const noop = Function.prototype;
const map = (arr, cb = noop) => [].map.call(arr, cb);

class City {
  constructor() {
    this.el = el('option');
  }
  update({ value, name }) {
    this.el.textContent = name;
    this.el.setAttribute('value', value);
  }
}

export default class Cities {
  constructor({ onSelected } = {}) {
    this.el = el('.cities',
      el('label', { for: 'cities' }, 'City:'),
      this.picker = list('select', City));
    this.picker.el.setAttribute('name', 'cities');
    this.picker.el.addEventListener('change', e => this.onChange(e));
    this.onSelected = onSelected;
  }
  update(data) {
    this.picker.update(data);
  }
  onChange() {
    let list = this.picker;
    let data = map(list.el.selectedOptions, ({ value, textContent }) =>
      ({ value, name: textContent }));
    this.onSelected(data[0]);
  }
  select(data) {
    this.picker.el.value = data.value;
    this.onSelected(data);
  }
}
