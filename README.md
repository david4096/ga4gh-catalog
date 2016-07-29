ga4gh-catalog
=====================

An application for listing the contents of a genomics server that uses a GA4GH interface.

### Description

This is a catalog for GA4GH's API (found at [1kgenomes.ga4gh.org](http://1kgenomes.ga4gh.org)). It makes API calls which return a JSON object, and the application renders useful information from that. There are currently only large containers of data which include the dataset, reference set, feature set, and read group sets. In progress: accessing smaller and more spsecific data such as a list of variants within a variant set, possibly through links to other pages. 

Features: if you click on an ID, the ID will copy itself to your clipboard. 

### Usage

```
npm install
npm start
open http://localhost:3000
```

Now edit `src/App.js`.  
Your changes will appear without reloading the browser like in [this video](http://vimeo.com/100010922).

### Linting

This project includes React-friendly ESLint configuration.

```
npm run lint
```

### Using `0.0.0.0` as Host

You may want to change the host in `server.js` and `webpack.config.js` from `localhost` to `0.0.0.0` to allow access from same WiFi network. This is not enabled by default because it is reported to cause problems on Windows. This may also be useful if you're using a VM.

### Dependencies

* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)