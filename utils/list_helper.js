const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    }
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else if (blogs.length === 1) {
        return blogs[0]
    } else {
        return blogs.reduce((max, currentValue) => 
            max.likes > currentValue.likes ? max : currentValue)    
    }
}

module.exports = {
    dummy, totalLikes, favouriteBlog
}