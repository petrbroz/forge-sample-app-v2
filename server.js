const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/buckets', require('./routes/buckets'));
app.use('/api/jobs', require('./routes/jobs'));
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
