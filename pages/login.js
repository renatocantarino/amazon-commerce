import {
  Button,
  List,
  ListItem,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Store } from '../utils/context/Store';

export default function Login() {
  const classes = useStyles();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
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
    <Layout title="Login">
      <Typography component="h1" variant="h1">
        Login
      </Typography>
      <form onSubmit={submitHandler} className={classes.form}>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ type: 'email' }}
              label="Email"
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
              Login
            </Button>
          </ListItem>

          <ListItem>
            <NextLink href="/register" passHref>
              <Link>Dont have an account? </Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
