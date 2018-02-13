/* eslint-env mocha */
require('should')
const Parser = require('../')
const parser = new Parser()

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

  it('many stars in end match', function () {
    parser.test('brave.*.*', 'brave.new.world').should.equal(true)
  })

  it('many stars in end not match', function () {
    parser.test('brave.*.*', 'brave.new').should.equal(false)
  })
})
