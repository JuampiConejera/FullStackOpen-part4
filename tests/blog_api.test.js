const { test, after, beforeEach} = require('node:test')
const { mongoose } = require('mongoose')
const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'titulo',
        author: 'juampi',
        url: 'juampi.com',
        likes: 1
    },
    {
        title: 'otro titulo',
        author: 'iara',
        url: 'iara.net',
        likes: 8
    },
    {
        title: 'ultimo titulo',
        author: 'copito',
        url: 'copito.dev',
        likes: 4
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
  })

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/)
})

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 3)
})

test('verify the unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body[0].id, response.body[0]._id)
})

after(async () => {
    await mongoose.connection.close()
})
