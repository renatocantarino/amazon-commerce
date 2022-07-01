import React from 'react';
import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';

export default function Register() {
  const classes = useStyles();
  return (
    <Layout title="Register">
      <Typography component="h1" variant="h1">
        New User
      </Typography>
      <form className={classes.form}>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              inputProps={{ type: 'text' }}
              label="Name"
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
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
              inputProps={{ type: 'password' }}
              label="Password"
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" fullWidth type="submit" color="primary">
              Register
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
