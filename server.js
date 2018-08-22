const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;
const config = require('./config');
if (config.credentials.client_id == null || config.credentials.client_secret == null) {
    console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
    return;
}

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/buckets', require('./routes/buckets'));
app.use('/api/jobs', require('./routes/jobs'));
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
