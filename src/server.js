const app = require('./app');
const config = require('./config/config');

app.listen(config.port, () => {
  console.info(`Text classification API listening on port ${config.port}`);
});
