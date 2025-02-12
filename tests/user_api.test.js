const { test, describe,after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const { mongoose } = require('mongoose')
const app = require ('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        username: 'locro27',
        name: 'comida',
        password: 'asado'
    },
    {
        username: 'cars',
        name: 'toy story',
        password: 'frozen'
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
})


describe('users tests', () => {
    test('a user without min length 3 characters of name and password return a status 400', async () => {
        await api
            .post('/api/users')
            .send({ "username": "aa", "name": "bbb", "password": "ccc" })
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})