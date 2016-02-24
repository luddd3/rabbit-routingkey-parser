# rabbit-routingkey-parser
Parses routing keys for RabbitMq topics

## Installation
```bash
$ npm install rabbit-routingkey-parser
```

## Example
```javascript
let Parser = require('parser')
let parser = new Parser()

parser.parse('brave.*.world', 'brave.new.world') // ['brave.new.world', 'new']
```

