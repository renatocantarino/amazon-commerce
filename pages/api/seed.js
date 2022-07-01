import nc from 'next-connect';
import Product from '../../models/Product';
import db from '../../utils/db';
import data from '../../utils/data';
import User from '../../models/User';

const handler = nc();

handler.get(async (request, response) => {
  await db.connect();

  await User.deleteMany();
  await User.insertMany(data.users);

  await Product.deleteMany();
  await Product.insertMany(data.products);

  await db.disconnect();
  response.send({ message: 'success' });
});

export default handler;
