import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = 3333;
// eslint-disable-next-line no-console
app.listen(3333, () => console.log(`🚀 Server running on port ${port} 🚀`));
