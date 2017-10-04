/* eslint-env mocha */
'use strict'

require('should')
let Parser = require('../')
let parser = new Parser()

describe('Parser parses', function () {
  it('single star', function () {
    parser
      .parse('hello.*', 'hello.world')
      .should.deepEqual(['hello.world', 'world'])
  })

  it('single star in middle', function () {
    parser
      .parse('brave.*.world', 'brave.new.world')
      .should.deepEqual(['brave.new.world', 'new'])
  })

  it('two stars', function () {
    parser
      .parse('*.new.*', 'brave.new.world')
      .should.deepEqual(['brave.new.world', 'brave', 'world'])
  })

  it('hash', function () {
    parser
      .parse('brave.#', 'brave.new.world')
      .should.deepEqual(['brave.new.world', 'new.world'])
  })

  it('hash with no words', function () {
    parser.parse('brave.new.#', 'brave.new.')
  })

  it('stars and hash', function () {
    parser
      .parse('*.new.#', 'brave.new.world')
      .should.deepEqual(['brave.new.world', 'brave', 'world'])
  })

  it('no stars or hash', function () {
    parser
      .parse('brave.new.world', 'brave.new.world')
      .should.deepEqual(['brave.new.world'])
  })

  it('hash in beginning', function () {
    parser
      .parse('#.new.world', 'my.brave.new.world')
      .should.deepEqual(['my.brave.new.world', 'my.brave'])
  })

  it('hash in middle', function () {
    parser
      .parse('brave.#.world', 'my.brave.new.world')
      .should.deepEqual(['brave.new.world', 'new'])
  })

  it('word with - with star', function () {
    parser
      .parse('*.new.world', 'my-brave.new.world')
      .should.deepEqual(['my-brave.new.world', 'my-brave'])
  })

  it('word with - with hash', function () {
    parser
      .parse('#.new.world', 'my-brave.new.world')
      .should.deepEqual(['my-brave.new.world', 'my-brave'])
  })

  it('many stars', function () {
    parser
      .parse('brave.new.*.*.happy.*', 'brave.new.world.is.happy.world')
      .should.deepEqual([
        'brave.new.world.is.happy.world',
        'world',
        'is',
        'world'
      ])
  })

  it('many stars 2', function () {
    parser
      .parse('brave.new.*.*.happy.*', 'brave.new.world.is.happy.world')
      .should.deepEqual([
        'brave.new.world.is.happy.world',
        'world',
        'is',
        'world'
      ])
  })
})
