import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (request, response) => {
  await db.connect();
  const _product = await Product.find({});
  await db.disconnect();
  response.send(_product);
});

export default handler;
