/**
* basics.js – Basic Node.js XMLBuilder Tests
* Copyright (c) 2012 Sebastian Müller <code@semu.mp>, all rights reserved
*
* Permission is hereby granted, free of charge, to any person obtaining a copy 
* of this software and associated documentation files (the "Software"), to deal 
* in the Software without restriction, including without limitation the rights 
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
* copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
* FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN 
* AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['../src/XMLBuilder.js'], function(XMLBuilder, require) {
  exports['element structure'] = function (test) {
    var xml = new XMLBuilder();
    xml.root('lorem')
      .element('ipsum')
        .empty('dolor', {sit: 'amet'});
    var xmlString = '<lorem><ipsum><dolor sit="amet" /></ipsum></lorem>'
    
    test.equal(xml.get(), xmlString);
    test.done();
  };
  
  exports['text in elements'] = function (test) {
    var xml = new XMLBuilder();
    xml.root('lorem')
      .element('ipsum')
        .element('dolor', {sit: 'amet'}, 'consectetur adipiscing elit');
    var xmlString = '<lorem><ipsum><dolor sit="amet">consectetur adipiscing elit</dolor></ipsum></lorem>'
    
    test.equal(xml.get(), xmlString);
    test.done();
  };
  
  exports['multiple childs'] = function (test) {
    var xml = new XMLBuilder();
    xml.root('lorem');
    xml.empty('ipsum');
    xml.empty('dolor', {sit: 'amet'});
    
    var xmlString = '<lorem><ipsum /><dolor sit="amet" /></lorem>'
    
    test.equal(xml.get(), xmlString);
    test.done();
  };
  
  exports['invalid element'] = function (test) {
    test.throws(function () {
      var xml = new XMLBuilder();
      xml.root('lorem');
      xml.empty('ip sum');
      xml.empty('dolor', {sit: 'amet'});
    });
    
    test.done();
  };
  
  return exports;
});
