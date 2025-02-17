const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0
    else if (blogs.length === 1) return blogs[0].likes

    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) return null 
    else if (blogs.length === 1) return blogs[0] 
    
    return blogs.reduce((max, currentValue) => 
            max.likes > currentValue.likes ? max : currentValue)    
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    else if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 }

    const authorCount = lodash.countBy(blogs, 'author')
    const authorMax = lodash.maxBy(Object.keys(authorCount), (o) => authorCount[o])

    return { author: authorMax, blogs: authorCount[authorMax] }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    else if (blogs.length === 1) return { author: blogs[0].author, likes: blogs[0].likes }

    const authorGroup = lodash.groupBy(blogs, 'author')
    const authorLikes = lodash.mapValues(authorGroup, (o) => lodash.sumBy(o, 'likes'))
    const authorMax = lodash.maxBy(Object.keys(authorLikes), (o) => authorLikes[o])
    
    return { author: authorMax, likes: authorLikes[authorMax]}
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}