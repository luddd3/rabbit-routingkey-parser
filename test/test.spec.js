'use strict'
const { describe, it } = require('node:test')
const Parser = require('../')
const parser = new Parser()

describe('Parser tests', () => {
  it('single star match', t => {
    const result = parser.test('hello.*', 'hello.world')
    t.assert.ok(result)
  })

  it('single star not match', t => {
    const result = parser.test('hello.*', 'hell.world')
    t.assert.notOk(result)
  })

  it('single star in middle', t => {
    const result = parser.test('brave.*.world', 'brave.new.world')
    t.assert.ok(result)
  })

  it('single star in middle not match', t => {
    const result = parser.test('brave.*.world', 'brave.new.worldd')
    t.assert.notOk(result)
  })

  it('many stars in end match', t => {
    const result = parser.test('brave.*.*', 'brave.new.world')
    t.assert.ok(result)
  })

  it('many stars in end not match', t => {
    const result = parser.test('brave.*.*', 'brave.new')
    t.assert.notOk(result)
  })
})
