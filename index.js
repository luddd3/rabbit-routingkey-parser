'use strict'

class RoutingKeyParser {
  constructor () {
    this.rules = [
      [/\./g, '\\.'],
      [/\*/g, '([\\w|-]+)'],
      [/#/g, '([\\w|.|-]*)']
    ]

    this.replaceParse = this.#memoize((pattern) => {
      const p = this.#replace(pattern)
      return new RegExp(p)
    })
    this.replaceTest = this.#memoize((pattern) => {
      const p = this.#replace(pattern)
      return new RegExp(`^${p}$`)
    })
  }

  #memoize (fn) {
    const cache = new Map()
    return param => {
      if (cache.has(param)) {
        return cache.get(param)
      }
      const result = fn(param)
      cache.set(param, result)
      return result
    }
  }

  #replace (pattern) {
    let p = pattern
    for (const rule of this.rules) {
      p = p.replace(rule[0], rule[1])
    }
    return p
  }

  parse (pattern, key) {
    const re = this.replaceParse(pattern)
    return re.exec(key).slice(0)
  }

  test (pattern, key) {
    const re = this.replaceTest(pattern)
    return re.test(key)
  }
}

module.exports = RoutingKeyParser
