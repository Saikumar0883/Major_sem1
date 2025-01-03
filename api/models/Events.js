const mongoose=require('mongoose')
const eventSchema = new mongoose.Schema({
    
    images: [{
        type: String,  // assuming images will be stored as URLs or file paths
        required: false
    }]
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
