'use strict'

module.exports = function RoutingKeyParser () {
  if (!(this instanceof RoutingKeyParser)) return new RoutingKeyParser()

  let rules = [
    [new RegExp('\\*', 'g'), '([\\w|-]+)'],
    [new RegExp('#', 'g'), '([\\w|.|-]*)']
  ]

  return {
    parse: parse
  }

  function parse (pattern, key) {
    let p = pattern
    for (let rule of rules) {
      p = p.replace(rule[0], rule[1])
    }
    return new RegExp(p).exec(key).slice(-3)
  }
}
