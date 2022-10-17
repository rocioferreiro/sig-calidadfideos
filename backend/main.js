require('dotenv').config();

const server = require('./server');

const PORT = process.env.PORT || 8080;
const env = process.env.NODE_ENV;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT} with env ${env}`));
