import app from './app.js';
import config from './config/index.js';

app.listen(config.port, () => {
   console.log(`DevPulse server is running in port ${config.port}`);
});
