/**
 * XMLBuilder.js – Node.js XMLBuilder
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

/**
 * Initialize XMLBuilder
 */
var XMLBuilder = function() {
  this.clear();
};

/**
 * Clear XMLBuilder internal data storage
 */
XMLBuilder.prototype.clear = function() {
  this.raw     = '';
  this.stack   = [];
  this.current = {};  
};

/**
 * Create root XML element
 * 
 * @param string name XML root element name
 * @return XMLBuilder
 */
XMLBuilder.prototype.root = function(name) {
  this.raw = '';

  return this.element(name);
};

/**
 * Encode XML element's attribute value
 * 
 * @param string value
 * @return string
 */
XMLBuilder.prototype.encodeAtrributeValue = function(value) {
  return value;
};

/**
 * Encode XML element's value
 * 
 * @param string value
 * @return string
 */
XMLBuilder.prototype.encodeElementValue = function(text) {
  return text;
};

/**
 * Check XML element name
 * 
 * @param string value
 * @return string
 */
XMLBuilder.prototype.checkName = function(name) {
  if (name.match(/^[a-zA-Z]+$/)) {
    return name;
  } else {
    throw new Error('invalid char in XML element: ' + name);
  }
};

/**
 * Create empty XML element
 * 
 * @param string name XML element name
 * @param object attr XML element's attributes
 * @return XMLBuilder
 */
XMLBuilder.prototype.empty = function(name, attr) {
  this.raw += '<' + this.checkName(name);
  
  if (attr) {
    for (var n in attr) {
      this.raw += ' ' + n + '="' + this.encodeAtrributeValue(attr[n]) + '"';
    }
  }
  
  this.raw += ' />';
};

/**
 * Create XML element
 * 
 * @param string name XML element name
 * @param object attr XML element's attributes
 * @param string text XML element's value
 * @return XMLBuilder
 */
XMLBuilder.prototype.element = function(name, attr, text) {
  this.raw += '<' + this.checkName(name);
  this.stack.push(name);
  
  if (attr) {
    this.current.hasAttributes = true;
    
    for (var n in attr) {
      this.raw += ' ' + n + '="' + this.encodeAtrributeValue(attr[n]) + '"';
    }
  }
  
  this.raw += '>';
  
  if (text) {
    this.raw += this.encodeElementValue(text); }
  
  return this;
}

/**
 * Close XML elements
 *
 * @access private
 * @return XMLBuilder
 */
XMLBuilder.prototype.close = function() {
  while (this.stack.length > 0) {
    this.raw += '</' + this.stack.pop() + '>'; }
  return this;
}

/**
 * Get XML data
 * 
 * @return string
 */
XMLBuilder.prototype.get = function(name, attr) {
  return this.close().raw;
}

define(function(require) {
  return XMLBuilder;
});