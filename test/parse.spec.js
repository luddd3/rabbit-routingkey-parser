/*global describe it*/
'use strict'

let Parser = require('../')
let parser = new Parser()

describe('Parser', function () {
  it('can parse single star', function () {
    parser.parse('hello.*', 'hello.world').should.deepEqual([
      'hello.world',
      'world'
    ])
  })

  it('can parse single star in middle', function () {
    parser.parse('brave.*.world', 'brave.new.world').should.deepEqual([
      'brave.new.world',
      'new'
    ])
  })

  it('can parse two stars', function () {
    parser.parse('*.new.*', 'brave.new.world').should.deepEqual([
      'brave.new.world',
      'brave',
      'world'
    ])
  })

  it('can parse hash', function () {
    parser.parse('brave.#', 'brave.new.world').should.deepEqual([
      'brave.new.world',
      'new.world'
    ])
  })

  it('can parse hash with no words', function () {
    parser.parse('brave.new.#', 'brave.new.')
  })

  it('can parse stars and hash', function () {
    parser.parse('*.new.#', 'brave.new.world').should.deepEqual([
      'brave.new.world',
      'brave',
      'world'
    ])
  })

  it('can parse no stars or hash', function () {
    parser.parse('brave.new.world', 'brave.new.world').should.deepEqual([
      'brave.new.world'
    ])
  })

  it('can parse hash in beginning', function () {
    parser.parse('#.new.world', 'my.brave.new.world').should.deepEqual([
      'my.brave.new.world',
      'my.brave'
    ])
  })

  it('can parse hash in middle', function () {
    parser.parse('brave.#.world', 'my.brave.new.world').should.deepEqual([
      'brave.new.world',
      'new'
    ])
  })

  it('can parse word with - with star', function () {
    parser.parse('*.new.world', 'my-brave.new.world').should.deepEqual([
      'my-brave.new.world',
      'my-brave'
    ])
  })

  it('can parse word with - with hash', function () {
    parser.parse('#.new.world', 'my-brave.new.world').should.deepEqual([
      'my-brave.new.world',
      'my-brave'
    ])
  })

  it('can parse many stars', function () {
    parser.parse('brave.new.*.*.happy.*', 'brave.new.world.is.happy.world').should.deepEqual([
      'brave.new.world.is.happy.world',
      'world',
      'is',
      'world'
    ])
  })
})
