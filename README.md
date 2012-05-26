XMLBuilder.js
=============

Create XML data with JavaScript, requires `RequireJS` for using and `nodeunit` for testing…

Usage
=====

``` js
var xml = new XMLBuilder();
xml.root('lorem')
  .element('ipsum')
    .element('dolor', {sit: 'amet'}, 'consectetur adipiscing elit');
console.log(xml.get());
```

``` js
var xml = new XMLBuilder();
xml.root('lorem')
  .empty('ipsum')
  .empty('dolor', {sit: 'amet'});
console.log(xml.get());
```