const { ImageKit } = require("@imagekit/nodejs");

const fs = require("fs");

const client = new ImageKit({
  privateKey: process.env.imagekitkey,
});

async function imagekitupload(file) {
  const musicfilestream = {
    file: fs.createReadStream(file.path),
    fileName: file.originalname,
  };
  const response = await client.files.upload(musicfilestream);
    console.log(response);


  fs.unlink(file.path, (err) => {
    if (err) {
      console.log("Error deleting file:", err);
    } else {
      console.log("File deleted");
    }
  });

  return response;
}

async function bulkupload(files) {
  // console.log(files);
  let links = [];
  for (let file of files) {
    const response = await client.files.upload({
      file: fs.createReadStream(file.path),
      fileName: file.originalname,
    });
    // console.log(response.url,"url yaha response");
    links.push(response.url);

    fs.unlink(file.path,()=>{});
    // console.log(file.path)
  }

  // console.log(links,"links")
  return links;
  
}

module.exports = { imagekitupload , bulkupload};
