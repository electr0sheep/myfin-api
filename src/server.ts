import https from 'https';
import fs from 'fs';
import app from './app.js';
import 'dotenv/config.js';

// Set UTC as default timezone
process.env.TZ = 'Etc/UTC';

const PORT = process.env.PORT || 3001;

if (process.env.SSL_CERT_PATH && process.env.SSL_KEY_PATH) {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH)
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`MyFin secure server listening on port ${PORT}`)
  });
} else {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`MyFin unsecured server listening on port ${PORT}`);
  });
}
