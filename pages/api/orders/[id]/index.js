import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';

const handler = nc();
handler.use(isAuth);

handler.get(async (request, response) => {
  await db.connect();
  const order = await Order.findById(request.query.id);
  await db.disconnect();
  response.send(order);
});

export default handler;
