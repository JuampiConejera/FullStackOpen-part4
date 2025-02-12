const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (username === undefined || password === undefined) {
        return response.status(400).json( { error: 'content missing' } )
    }
    else if (username.length < 3 || password.length < 3) {
        return response.status(400).json( { error: 'username or password length must be at least 3' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    blogs = await Blog.find({})

    const user = new User({
        username,
        name,
        passwordHash,
        blogs: blogs
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, url: 1 })

    response.json(users)
})

module.exports = usersRouter