XMLBuilder.js
=============

Create XML files with Node.js

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