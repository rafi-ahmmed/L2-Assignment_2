import app from './app.js';
import config from './config/index.js';
import { initDB } from './db/index.js';

app.listen(config.port, async () => {
   await initDB();
   console.log(`DevPulse server is running in port ${config.port}`);
});
