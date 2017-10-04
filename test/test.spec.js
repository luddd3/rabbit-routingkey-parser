/* eslint-env mocha */
'use strict'

require('should')
let Parser = require('../')
let parser = new Parser()

describe('Parser tests', function () {
  it('single star match', function () {
    parser.test('hello.*', 'hello.world').should.equal(true)
  })

  it('single star not match', function () {
    parser.test('hello.*', 'hell.world').should.equal(false)
  })

  it('single star in middle', function () {
    parser.test('brave.*.world', 'brave.new.world').should.equal(true)
  })

  it('single star in middle not match', function () {
    parser.test('brave.*.world', 'brave.new.worldd').should.equal(false)
  })
})
