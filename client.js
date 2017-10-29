'use strict';

import $ from 'cash-dom';
import r from 'qwest';
import urlJoin from 'url-join';

const baseUrl = 'http://prognoza.hr/';
const proxy = url => `https://cors-proxy.now.sh/?url=${url}`;

function getLocation(el) {
  let [ value ] = el.getAttribute('href').split('.');
  let name = value.replace(/_/g, ' ');
  return { value, name };
}

export function fetchLocations() {
  let url = urlJoin(baseUrl, `/tri/`);
  return r.get(proxy(url), null, { responseType: 'html' })
    .then((_, html) => parseLocations(html));
}

function parseLocations(html) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, 'text/html');
  let $root = $(doc);
  let locations = $root.find('td a').map(el => getLocation(el)).slice(1);
  return locations;
}

export function fetchReports(location) {
  let url = urlJoin(baseUrl, `/tri/${ location }.xml`);
  return r.get(proxy(url), null, { responseType: 'xml' })
    .then((_, xml) => parseReports(xml));
}

function parseReports(xmldoc) {
  let $root = $(xmldoc);
  let data = $root.find('dan').map(day => {
    let $day = $(day);
    let date = $day.attr('datum');
    let forecasts = $day.find('doba_dana').map(data => parseForecast(data));
    return { date, forecasts };
  });
  return data;
}

function symbol(name, suffix='.gif') {
  return { name, url: `${ baseUrl }/alasimboli/${ name }${ suffix }` };
}

function parseForecast(data) {
  let $data = $(data);
  return {
    conditions: symbol($data.find('simbol').text(), 's.gif'),
    wind: symbol($data.find('vjetar').text()),
    temperature: {
      max: parseInt($data.find('tmax').text(), 10),
      min: parseInt($data.find('tmin').text(), 10)
    }
  };
}
