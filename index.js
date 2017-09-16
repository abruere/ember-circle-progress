/* jshint node: true */
'use strict';

var MergeTrees = require('broccoli-merge-trees');
var Funnel     = require('broccoli-funnel');
var map        = require('broccoli-stew').map;

module.exports = {
  name: 'ember-circle-progress',

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/circle-progress.js');
  },

  treeForVendor(vendorTree) {
    let trees = [];
    let circleProgress = new Funnel('bower_components/jquery-circle-progress/dist', {
      files: ['circle-progress.js']
    });

    if (vendorTree) {
      trees.push(vendorTree);
    }

    circleProgress = map(circleProgress, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    trees.push(circleProgress);

    return new MergeTrees(trees);
},

};
