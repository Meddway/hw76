import express, { Request, Response } from 'express';
import fileDb from './fileDb';
import crypto from 'crypto';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

fileDb.init();

app.post('/messages', async (req: Request, res: Response) => {
  const { author, message } = req.body;

  if (!author || !message) {
    return res.status(400).json({ error: 'Author and message must be present in the request' });
  }

  const id = crypto.randomUUID();
  const datetime = new Date().toISOString();

  const newMessage = { id, author, message, datetime };
  await fileDb.addItem(newMessage);

  res.json(newMessage);
});

app.get('/messages', async (req: Request, res: Response) => {
  if (req.query.datetime) {
    const queryDate = req.query.datetime as string;
    const date = new Date(queryDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const messages = await fileDb.getItems();
    const newMessages = messages.filter((msg) => new Date(msg.datetime) > date);
    res.json(newMessages);
  } else {
    const messages = await fileDb.getItems();
    const last30Messages = messages.slice(0, 30);
    res.json(last30Messages);
  }
});


app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});
