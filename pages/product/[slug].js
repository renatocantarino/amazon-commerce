import React, { useContext } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from '@material-ui/core';

import db from '../../utils/db';
import Product from '../../models/Product';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import axios from 'axios';
import { Store } from '../../utils/context/Store';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const classes = useStyles();
  const router = useRouter();

  if (!product) {
    return <p>Product not found</p>;
  }

  const addToCartHandler = async () => {
    const item = state.cart.cartItems.find((it) => it._id === product._id);
    const quantity = item ? item.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/Cart');
  };

  return (
    <>
      <Layout title={product.name} description={product.description}>
        <div className={classes.section}>
          <NextLink href="/" passHref>
            <Link>
              <Typography>back to products</Typography>
            </Link>
          </NextLink>
        </div>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={600}
              layout="responsive"
            ></Image>
          </Grid>
          <Grid item md={3} xs={12}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand: {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography> Description: {product.description}</Typography>
              </ListItem>
              <ListItem>
                Stars : {product.rating} / 5 ({product.numReviews} reviews)
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography>Price:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography>Status:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.countInStock > 0 ? 'In Stock' : 'Unavalaible'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={addToCartHandler}
                  >
                    ADD TO CART
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: { product: db.convertDocToObj(product) },
  };
}
