import { app, port } from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
