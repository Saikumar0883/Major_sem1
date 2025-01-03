const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    batch: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    jd: {
        type: String,
        required:true
    },
    questions: {
        type: String,
        required: true
    }
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
