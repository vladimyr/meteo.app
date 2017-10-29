const { version } = require('./package.json');
const revision = require('git-rev-sync').short();

const bubleOptions = {
  transforms: {
    dangerousTaggedTemplateString: true,
    dangerousForOf: true,
    generator: false,
    modules: false
  },
  objectAssign: 'Object.assign'
};

module.exports = (options, req) => ({
  entry: './index.js',
  presets: [
    require('poi-preset-buble')({ loaderOptions: bubleOptions })
  ],
  html: {
    version,
    revision,
    template: 'index.html',
  },
  sourceMap: options.mode === 'development'
});
