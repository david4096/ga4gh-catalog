import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Router, Route, browserHistory } from 'react-router'
import leaf from './leaf.js'
import About from './About.js'
import Container from './Container.js'

//initialize router paths
ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/readgroups/:id" container="readgroups/" baseurl="http://1kgenomes.ga4gh.org/"
      component={leaf}/>
    <Route path="/variants/:id" prevContainer="variantsets/" container="variants/" baseurl="http://1kgenomes.ga4gh.org/"
      component={leaf}/>
    <Route path="/features/:id" container="features/" baseurl="http://1kgenomes.ga4gh.org/"
      component={leaf}/>
    <Route path="/referencesets/:id" container="referencesets/" baseurl="http://1kgenomes.ga4gh.org/"
      component={Container}/>
    <Route path="/datasets/:id" container="datasets/" baseurl="http://1kgenomes.ga4gh.org/"
      component={Container}/>
    <Route path="/variantsets/:id" prevContainer="dataset/" container="variantsets/" baseurl="http://1kgenomes.ga4gh.org/"
      component={Container}/>
    <Route path="/featuresets/:id" container="featuresets/" baseurl="http://1kgenomes.ga4gh.org/"
      component={Container}/>
    <Route path="/about" component={About}/>
 </Router>, document.getElementById('root'));
