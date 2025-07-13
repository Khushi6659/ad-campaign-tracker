const mongoose = require('mongoose');
const campaignSchema = new mongoose.Schema({
    name:String,
    platform:String,
    status:String,
    impressions:Number,
    clicks:Number,
    spend:Number,
});
module.exports = mongoose.model('Campaign',campaignSchema);