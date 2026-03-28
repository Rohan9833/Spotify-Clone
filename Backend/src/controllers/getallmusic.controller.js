const musicModel = require("../model/music.model")


async function Getallmusic(req,res) {
    const musics = await musicModel.find()
    res.status(200).json({
        message:"You got all musics api running",
        musics:musics
    })
}

module.exports = {Getallmusic} 