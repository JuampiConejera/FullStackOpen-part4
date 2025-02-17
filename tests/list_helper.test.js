const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]
const list = [
  {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
  },
  {
        _id: '5a422aa71b54a676234d17f8',
        title: 'La Guerra Del Arte',
        author: 'no me acuerdo',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 10,
        __v: 0
  },
  {
        _id: '5a422aa71b54a676234d17f8',
        title: 'El Sutil Arte De Que Te Importe Una Mierda',
        author: 'no me acuerdo',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 7,
        __v: 0
  },
]

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(list)
    assert.strictEqual(result, 22)
  })
})

describe('favourite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favouriteBlog([])
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog equals the blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favouriteBlog(list)
    assert.deepStrictEqual(result, list[1])
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, null)
  })
    
  test('when list has only one blog equals the author and 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, { author: listWithOneBlog[0].author, blogs: 1 })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(list)
    assert.deepStrictEqual(result, { author: 'no me acuerdo', blogs: 2 })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog equals the author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, { author: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(list)
    assert.deepStrictEqual(result, { author: 'no me acuerdo', likes: 17 })
  })
})