const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: "DO004PM4P7NYAEYTBHQP",
    secretAccessKey: "L2B71k4o3zOEACgy95hqWFHSxpSVhiB6nYjmvqTUsGw"
});

const spacesEndpoint = new aws.Endpoint('https://fra1.digitaloceanspaces.com/');
const s3 = new aws.S3({
    endpoint: spacesEndpoint
});
const name = Date.now()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'exogames-file-storage',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (request, file, cb) {
            if (!file) {
                cb("upload a file", null);
            } else {
                cb(null, name + '_' + file.originalname);
            }
        }
    })
}).array('upload', 1);

const uploadFile = async (req, res) => {

    upload(req, res, function (error) {
        
        if (req.files.length === 0) {
            return res.status(400).json({
                message: "Please upload a file"
            });
        }
        if (error) {
            console.log("console log del callback", error);
            return res.status(500).json({ error: error.message });
        }

        res.json({ url: "https://exogames-file-storage.fra1.digitaloceanspaces.com/" + name + '_' + req.files[0].originalname });
    });


};

module.exports = {
    uploadFile
}