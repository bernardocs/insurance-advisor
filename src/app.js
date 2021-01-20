import express from 'express';
import userSchema from './validation/user.schema.js';

const app = express();

// Accepts Content-type: application/json
app.use(express.json());

app.post('/', (req, res, next) => {
  const { value, error } = userSchema.validate(req.body);
  if (error) {
    console.error(JSON.stringify(error));
    const message = error.details.map(d => d.message).join(', ');

    return res.status(400).json({ error: message });
  }

  res.json(value);
});

const port = process.env.PORT || '3000';

app.listen({ port }, () => {
  console.log(`Listening on port ${port} :)`);
});