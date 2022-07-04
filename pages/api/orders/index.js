import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({ onError });

handler.use(isAuth);

handler.post(async (request, response) => {
  await db.connect();
  const order = await new Order({
    ...request.body,
  });

  await order.save();
  await db.disconnect();
  response.status(201).send(order);
});

export default handler;
