import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Router, Route, browserHistory } from 'react-router'
import About from './About.js'
import Container from './Container.js'
import Dataset from './Dataset.js'
import ListDatasets from './ListDatasets.js'
import ListReferenceSets from './ListReferenceSets.js'
import ReferenceSet from './ReferenceSet.js'
import ListReferences from './ListReferences.js'

ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="datasets" baseurl="http://1kgenomes.ga4gh.org/" component={ListDatasets} >
        <Route path=":id" baseurl="http://1kgenomes.ga4gh.org/" component={Dataset} />
      </Route>
      <Route path="referencesets" baseurl="http://1kgenomes.ga4gh.org/" component={ListReferenceSets} >
        <Route path=":id" baseurl="http://1kgenomes.ga4gh.org/" component={ReferenceSet} />
      </Route>
    </Route>
    <Route path="/about" component={About}/>
 </Router>, document.getElementById('root'));
