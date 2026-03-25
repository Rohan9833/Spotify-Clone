const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    title:{
        type : String,
        required: true,
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
    },
    music:{
        // type:mongoose.Schema.Types.ObjectId,
        type:[String],
        required:true,
        // ref:"music"
    }

    
});

const albumModel = mongoose.model("album",albumSchema);

module.exports = albumModel