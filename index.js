const memoize = require('memoize-immutable')

module.exports = function RoutingKeyParser () {
  if (!(this instanceof RoutingKeyParser)) return new RoutingKeyParser()

  const rules = [
    [new RegExp('\\.', 'g'), '\\.'],
    [new RegExp('\\*', 'g'), '([\\w|-]+)'],
    [new RegExp('#', 'g'), '([\\w|.|-]*)']
  ]

  const replaceParse = memoize(function (pattern) {
    const p = replace(pattern)
    return new RegExp(p)
  })
  const replaceTest = memoize(function (pattern) {
    const p = replace(pattern)
    return new RegExp('^' + p + '$')
  })

  return {
    parse: parse,
    test: test
  }

  function parse (pattern, key) {
    const re = replaceParse(pattern)
    return re.exec(key).slice(0)
  }

  function test (pattern, key) {
    const re = replaceTest(pattern)
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
