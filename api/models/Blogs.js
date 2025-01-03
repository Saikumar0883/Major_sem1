const mongoose=require('mongoose')
const blogSchema = new mongoose.Schema({
    writerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide a writer ID"]
    },
    title: {
        type: String,
        required: [true, "Please enter a blog title"],
    },
    description: {
        type: String,
        required: [true, "Please provide a blog description"],
    },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
