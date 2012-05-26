XMLBuilder.js
=============

Create XML files with Node.js

    var xml = new XMLBuilder();
    xml.root('lorem')
      .element('ipsum')
        .element('dolor', {sit: 'amet'}, 'consectetur adipiscing elit');

    var xml = new XMLBuilder();
    xml.root('lorem')
      .empty('ipsum')
      .empty('dolor', {sit: 'amet'});

    xml.get()
 