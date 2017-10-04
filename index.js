'use strict'
let memoize = require('ramda').memoize

module.exports = function RoutingKeyParser () {
  if (!(this instanceof RoutingKeyParser)) return new RoutingKeyParser()

  let rules = [
    [new RegExp('\\.', 'g'), '\\.'],
    [new RegExp('\\*', 'g'), '([\\w|-]+)'],
    [new RegExp('#', 'g'), '([\\w|.|-]*)']
  ]

  let replaceParse = memoize(function (pattern) {
    let p = replace(pattern)
    return new RegExp(p)
  })
  let replaceTest = memoize(function (pattern) {
    let p = replace(pattern)
    return new RegExp('^' + p + '$')
  })

  return {
    parse: parse,
    test: test
  }

  function parse (pattern, key) {
    let re = replaceParse(pattern)
    return re.exec(key).slice(0)
  }

  function test (pattern, key) {
    let re = replaceTest(pattern)
    return re.test(key)
  }

  function replace (pattern) {
    let p = pattern
    rules.forEach(function (rule) {
      p = p.replace(rule[0], rule[1])
    })
    return p
  }
}
