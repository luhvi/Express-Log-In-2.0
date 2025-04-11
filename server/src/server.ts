import express from 'express';
import type { Request, Response } from 'express';
const app = express();

const PORT: string | 3000 = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http:/localhost:${PORT}`);
});
