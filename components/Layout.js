import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import useStyles from '../utils/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Container,
  Badge,
  Link,
  CssBaseline,
} from '@material-ui/core';
import { Store } from '../utils/context/Store';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;

  const Theme = createTheme({
    typography: {
      h1: { fontSize: '1.6rem', fontWeight: 400, margin: '1rem 0 ' },
      h2: { fontSize: '1.4rem', fontWeight: 400, margin: '1rem 0 ' },
      body1: { fontWeight: 'normal' },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: { main: '#FFCF62' },
      secondary: { main: '#208080' },
    },
  });
  const classes = useStyles();

  const darkModeChangeHandler = () => {
    dispatch({
      type: darkMode ? 'TOGGLE_DARK_MODE_ON' : 'TOGGLE_DARK_MODE_OFF',
    });

    const _darkTheme = !darkMode;
    Cookies.set('cookie-theme', _darkTheme ? 'ON' : 'OFF');
  };

  return (
    <div>
      <Head>
        <title>{title ? `amazon .: ${title} :.` : 'amazon'} </title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>
                  Amazon E-Commerce
                </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}> </div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        overlap="rectangular"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </Typography>
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>cantarino@2022</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
export default dynamic(() => Promise.resolve(Layout), { ssr: false });
