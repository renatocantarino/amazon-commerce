import React, { useState } from 'react';
import {
  Button,
  List,
  ListItem,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import { useRouter } from 'next/router';

export default function Register() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const { redirect } = router.query;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/create', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      router.push(redirect || '/');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout title="Register">
      <Typography component="h1" variant="h1">
        New User
      </Typography>
      <form onSubmit={submitHandler} className={classes.form}>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              onChange={(e) => setName(e.target.value)}
              inputProps={{ type: 'text' }}
              label="Name"
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              inputProps={{ type: 'email' }}
              label="E-mail"
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ type: 'password' }}
              label="Password"
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" fullWidth type="submit" color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link> Already have an account?</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
