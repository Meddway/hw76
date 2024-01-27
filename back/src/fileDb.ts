import { promises as fs } from 'fs';
import crypto from 'crypto';

interface Message {
  id: string;
  author: string;
  message: string;
  datetime: string;
}

const filename = '../database.json';
let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      await fs.access(filename);
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      await this.save();
    }
  },

  async getItems() {
    return data;
  },

  async addItem(item: Omit<Message, 'id'>) {
    const id = crypto.randomUUID();
    const message = { id, ...item };
    data.push(message);
    await this.save();

    return message;
  },

  async save() {
    await fs.writeFile(filename, JSON.stringify(data));
  },
};

export default fileDb;
