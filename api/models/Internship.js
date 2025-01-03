const mongoose=require('mongoose')
const internshipSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: [true, "Please enter Id"],
        
    },
    companyName: {
        type: String,
        required: [true, "Enter the company name"]
    },
    projectName: {
        type: String,
        required: [true, "Enter the project name"]
    },
    description: {
        type: String,
        required: [true, "Enter the description of the Project"]
    },
    mode: {
        type: String,
        required: true,
        enum: ['Offline', 'Remote'],
        message: 'Mode must be either "Offline" or "Remote"'
    }
});

const Internship = mongoose.model('Internship', internshipSchema);
module.exports = Internship;
