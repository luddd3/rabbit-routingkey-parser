'use strict'
const { describe, it } = require('node:test')
const Parser = require('../')
const parser = new Parser()

describe('Parser parses', () => {
  it('single star', t => {
    const result = parser.parse('hello.*', 'hello.world')
    t.assert.deepStrictEqual(result, ['hello.world', 'world'])
  })

  it('single star in middle', t => {
    const result = parser.parse('brave.*.world', 'brave.new.world')
    t.assert.deepStrictEqual(result, ['brave.new.world', 'new'])
  })

  it('two stars', t => {
    const result = parser.parse('*.new.*', 'brave.new.world')
    t.assert.deepStrictEqual(result, ['brave.new.world', 'brave', 'world'])
  })

  it('hash', t => {
    const result = parser.parse('brave.#', 'brave.new.world')
    t.assert.deepStrictEqual(result, ['brave.new.world', 'new.world'])
  })

  it('hash with no words', t => {
    parser.parse('brave.new.#', 'brave.new.')
  })

  it('stars and hash', t => {
    const result = parser.parse('*.new.#', 'brave.new.world')
    t.assert.deepStrictEqual(result, ['brave.new.world', 'brave', 'world'])
  })

  it('no stars or hash', t => {
    const result = parser.parse('brave.new.world', 'brave.new.world')
    t.assert.deepStrictEqual(result, ['brave.new.world'])
  })

  it('hash in beginning', t => {
    const result = parser.parse('#.new.world', 'my.brave.new.world')
    t.assert.deepStrictEqual(result, ['my.brave.new.world', 'my.brave'])
  })

  it('hash in middle', t => {
    const result = parser.parse('brave.#.world', 'my.brave.new.world')
    t.assert.deepStrictEqual(result, ['brave.new.world', 'new'])
  })

  it('word with - with star', t => {
    const result = parser.parse('*.new.world', 'my-brave.new.world')
    t.assert.deepStrictEqual(result, ['my-brave.new.world', 'my-brave'])
  })

  it('word with - with hash', t => {
    const result = parser.parse('#.new.world', 'my-brave.new.world')
    t.assert.deepStrictEqual(result, ['my-brave.new.world', 'my-brave'])
  })

  it('many stars', t => {
    const result = parser.parse(
      'brave.new.*.*.happy.*',
      'brave.new.world.is.happy.world'
    )
    t.assert.deepStrictEqual(result, [
      'brave.new.world.is.happy.world',
      'world',
      'is',
      'world'
    ])
  })

  it('many stars 2', t => {
    const result = parser.parse(
      'brave.new.*.*.happy.*',
      'brave.new.world.is.happy.world'
    )
    t.assert.deepStrictEqual(result, [
      'brave.new.world.is.happy.world',
      'world',
      'is',
      'world'
    ])
  })

  it('ends with many stars match', t => {
    const result = parser.parse('brave.*.*', 'brave.new.world')
    t.assert.deepStrictEqual(result, ['brave.new.world', 'new', 'world'])
  })
})
