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
import VariantSet from './VariantSet.js'
import ReadGroupSet from './ReadGroupSet.js'
import FeatureSet from './FeatureSet.js'
import SearchVariants from './SearchVariants.js'
import ListVariantSets from './ListVariantSets.js'

let baseurl = "http://1kgenomes.ga4gh.org/"

ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="datasets" baseurl={baseurl} component={ListDatasets}/>
      <Route path="datasets/:datasetId" baseurl={baseurl} component={Dataset}>
        <Route path="variantsets" baseurl={baseurl} component={ListVariantSets}/>
      </Route>
      <Route path="referencesets" baseurl={baseurl} component={ListReferenceSets} >
        <Route path=":id" baseurl={baseurl} component={ReferenceSet} />
      </Route>
      <Route path="variantsets/:variantSetId" baseurl={baseurl} component={VariantSet}>
        <Route path="variants" baseurl={baseurl} component={SearchVariants} />
      </Route>
      <Route path="readgroupsets/:id" baseurl={baseurl} component={ReadGroupSet} />
      <Route path="featuresets/:id" baseurl={baseurl} component={FeatureSet} />
    </Route>
    <Route path="/about" component={About}/>
 </Router>, document.getElementById('root'));
