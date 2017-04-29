'use strict';

const { list, mount } = require('redom');
const { fetchLocations, fetchReports } = require('./client.js');
const Report = require('./components/report.js');
const Cities = require('./components/cities.js');

const storage = {
  setItem(name, item) {
    return window.localStorage.setItem(name, JSON.stringify(item));
  },
  getItem(name) {
    let item = window.localStorage.getItem(name);
    return item && JSON.parse(item);
  }
};

const reports = list('.reports', Report);
const cities = new Cities({
  onSelected(data) {
    storage.setItem('city', data);
    displayCityReports(data.value);
  }
});

mount(document.body, cities);
mount(document.body, reports);

fetchLocations().then(locations => {
  cities.update(locations);
  let data = storage.getItem('city') || locations[0];
  cities.select(data);
});

function displayCityReports(city) {
  fetchReports(city).then(data => reports.update(data));
}
