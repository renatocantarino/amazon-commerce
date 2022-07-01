import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (request, response) => {
  await db.connect();

  const newUser = new User({
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password),
    isAdmin: false,
  });
  const _user = await newUser.save();
  await db.disconnect();

  const token = signToken(_user);
  response.send({
    token,
    _id: _user._id,
    name: _user.name,
    email: _user.email,
    isAdmin: _user.isAdmin,
  });
});

export default handler;
