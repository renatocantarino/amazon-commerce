import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (request, response) => {
  await db.connect();
  const _user = await User.findOne({ email: request.body.email });
  await db.disconnect();

  const isValid = await bcrypt.compare(request.body.password, _user.password);
  console.log(isValid);

  if (_user && bcrypt.compareSync(request.body.password, _user.password)) {
    const token = signToken(_user);
    response.send({ token, user: _user });
  } else {
    response.status(401).send('Unauthorized');
  }
});

export default handler;
