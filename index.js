'use strict';

const $ = require('cash-dom');
const r = require('qwest');
const urlJoin = require('url-join');

const proxy = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'http://prognoza.hr/tri/';

function fetchReports(location) {
    let reportUrl = urlJoin(proxy, baseUrl, `${ location }.xml`)
    return r.get(reportUrl, null, { responseType: 'xml' })
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
    return { name, url: `http://prognoza.hr/alasimboli/${ name }${ suffix }` };
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

fetchReports('Trogir')
    .then(reports => console.log(JSON.stringify(reports, null, 2)));