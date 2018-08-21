const fs = require('fs');
const express = require('express');
const multer  = require('multer');
const { BucketsApi, ObjectsApi, PostBucketsPayload } = require('forge-apis');

const { getClient, getInternalToken } = require('./common/oauth');

let router = express.Router();

// Middleware for obtaining a token for each request
router.use(async (req, res, next) => {
    const token = await getInternalToken();
    req.oauth_token = token;
    req.oauth_client = getClient();
    next();
});

router.get('/', async (req, res, next) => {
    const buckets = await new BucketsApi().getBuckets({ limit: 64 }, req.oauth_client, req.oauth_token);
    res.json(buckets.body.items.map((bucket) => {
        return {
            id: bucket.bucketKey,
            text: bucket.bucketKey,
            type: 'bucket',
            children: true
        };
    }));
});

router.get('/:bucket_id', async (req, res, next) => {
    const objects = await new ObjectsApi().getObjects(req.params.bucket_id, {}, req.oauth_client, req.oauth_token);
    res.json(objects.body.items.map((object) => {
        return {
            id: Buffer.from(object.objectId).toString('base64'),
            text: object.objectKey,
            type: 'object',
            children: false
        };
    }));
});

router.post('/', async (req, res, next) => {
    let payload = new PostBucketsPayload();
    payload.bucketKey = req.body.bucketKey;
    payload.policyKey = 'transient'; // expires in 24h
    try {
        await new BucketsApi().createBucket(payload, {}, req.oauth_client, req.oauth_token);
        res.status(200).end();
    } catch(err) {
        next(err);
    }
});

let upload = multer({ dest: 'uploads/' });
router.post('/:bucket_id', upload.single('document'), async (req, res, next) => {
    fs.readFile(req.file.path, async (err, data) => {
        if (err) {
            next(err);
        }
        try {
            const api = new ObjectsApi()
            await api.uploadObject(req.params.bucket_id, req.file.originalname, data.length, data, {}, req.oauth_client, req.oauth_token);
            res.status(200).end();
        } catch(err) {
            next(err);
        }
    });
});

module.exports = router;
