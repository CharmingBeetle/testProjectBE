import { db } from './utils/db';

db.then(() => console.log('✅ MySQL Connected'))
  .catch((err) => console.error('❌ DB Connection Error:', err));
