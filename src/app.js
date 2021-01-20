import express from 'express';

const app = express();

// Accepts Content-type: application/json
app.use(express.json());

app.post('/', (req, res, next) => {
  res.json({ hello: 'm8' });
});

const port = process.env.PORT || '3000';

app.listen({ port }, () => {
  console.log(`Listening on port ${port} :)`);
});