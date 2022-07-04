import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/context/Store';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import { useSnackbar } from 'notistack';
import CheckoutWizard from '../components/checkoutWizard';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';

export default function payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const {
    cart: { shippingAddress },
  } = state;
  const classes = useStyles();

  useEffect(() => {
    if (!shippinAdress.adress) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []);

  const submitHandler = async (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Please select a payment method', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      router.push('/placeOrder');
    }
  };
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentmethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></RadioGroup>
              <FormControlLabel
                label="PayPal"
                value="paypal"
                control={<Radio />}
              ></FormControlLabel>
              <FormControlLabel
                label="Stripe"
                value="stripe"
                control={<Radio />}
              ></FormControlLabel>
              <FormControlLabel
                label="Cash on Delivery"
                value="cash"
                control={<Radio />}
              ></FormControlLabel>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="outlined" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="outlined"
              onClick={() => router.push('/shipping')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
