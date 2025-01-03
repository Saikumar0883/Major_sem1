const mongoose=require('mongoose')
const resumeSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: [true, "Please enter Id"],
    },
    resume: {
        type: String,
    }
})


const Resume = mongoose.model('User', resumeSchema);
module.exports = Resume