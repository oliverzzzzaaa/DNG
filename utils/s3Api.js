const AWS = require("aws-sdk");
const BUCKET_NAME = "pictionary-images";

let ID;
let SECRET;
if (process.env.NODE_ENV === "production") {
  ID = require("../config/keys_prod").AWSAccessKeyId;
  SECRET = require("../config/keys_prod").AWSSecretKey;
} else {
  ID = require("../config/keys").AWSAccessKeyId;
  SECRET = require("../config/keys").AWSSecretKey;
}

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

module.exports = (userId, imageDataUrl, saveImage) => {
  const buf = new Buffer(
    imageDataUrl.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const type = imageDataUrl.split(";")[0].split("/")[1];

  const params = {
    Bucket: BUCKET_NAME + "/images",
    Key: userId,
    Body: buf,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
    ResponseCacheControl: "no-cache"
  };

  //   const options = { "Cache-Control": "no-cache" };

  s3.upload(params, function(err, data) {
    if (err) {
      saveImage(userId, imageDataUrl);
      throw err;
    }
    saveImage(userId, data.Location);
  });
};
