const { S3Client, PutObjectCommand, PutObjectCommandInput, DeleteObjectCommand, DeleteObjectCommandInput } = require('@aws-sdk/client-s3');
const { v4: uuidv4, v5: uuid } = require('uuid');
const sharp = require('sharp');
const _ = require('lodash');
const Aigle = require('aigle');

const client = new S3Client({
    credentials: {
        accessKeyId: config.aws.accessKey,
        secretAccessKey: config.aws.secretAccessKey,
    },
    region: config.aws.region,
});

module.exports.S3 = {
    uploadFile: async function (path, fileObjs) {
        try {
            Aigle.mixin(_);

            const _files_ = [];

            await Aigle.forEach(fileObjs, async function (_file, _index) {
                // SECTION 파일 업로드
                // SECTION 원본

                const key = `${path}/${uuid(_index.toString(), uuidv4())}`;
                let mimeType = _.split(_file.mimetype, '/')[1];

                const originParams = {
                    Bucket: config.aws.s3Image,
                    Key: `${key}.${mimeType}`,
                    Body: _file.buffer,
                    ContentType: _file.mimetype,
                };

                await client.send(new PutObjectCommand(originParams));
                // !SECTION

                // SECTION 썸네일
                const resized = await sharp(_file.buffer);
                const metadata = await resized.metadata();

                const resizeWith = 500 < metadata.width ? 500 : metadata.width;

                const thumbParams = {
                    Bucket: config.aws.s3Image,
                    Key: `${key}_thumb.${mimeType}`,
                    Body: await sharp(_file.buffer).resize(resizeWith).withMetadata().toBuffer(),
                    ContentType: _file.mimetype,
                };

                await client.send(new PutObjectCommand(thumbParams));
                // !SECTION
                // !SECTION

                const withSort = _.assign(originParams, { index: _index });

                _files_.push(withSort);
            });

            const _return_ = _.chain(_files_).orderBy(['index'], ['asc']).map('Key').value();

            return _return_;
        } catch (error) {
            console.error(`[aws] ${error.message}`);
        }
    },
};
