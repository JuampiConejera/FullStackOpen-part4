const { test, describe, after, beforeEach} = require('node:test')
const { mongoose } = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
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

const newBlog = {
    title: 'titulo test',
    author: 'tester',
    url: 'test.com',
}

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

describe('geters tests', () => {

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
        
        response.body.forEach(blog => {
            assert(blog.id)
            assert(!blog._id)
        })
    })
})
describe('post tests', () => {
    test('a blog can be added', async () => {
        
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    })

    test('a blog without likes will have 0 likes', async () => {
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
        
        assert.strictEqual(response.body.likes, 0)
    })
    
    test('a blog without title or url will return bad request', async () => {
        await api
        .post('/api/blogs')
        .send({ author: 'test without title or url', likes: 1})
        .expect(400)
    } )
})

describe('delete tests', () => {
    test('a blog can be deleted', async () => {
        const response = await api.get('/api/blogs')
        const id = response.body[0].id
        await api
            .delete('/api/blogs/' + id)
            .expect(204)
    })
})

describe('put tests', () => {
    test('a blog can be update likes', async () => {
        const response = await api.get('/api/blogs')
        const id = response.body[0].id
        const likes = response.body[0].likes + 10
        const updatedBlog = { likes: likes }

        await api
            .put('/api/blogs/' + id)
            .send(updatedBlog)
            .expect(200)

        assert.strictEqual(likes, 11)
    })
})
after(async () => {
    await mongoose.connection.close()
})
