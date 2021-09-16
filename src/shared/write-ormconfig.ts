import { config } from './config.service';

const fs = require('fs');

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(config.getTypeOrmConfig(), null, 2),
);
