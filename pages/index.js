import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';

import NextLink from 'next/link';
import Layout from '../components/Layout';
import data from '../utils/data';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1></h1>

        <Grid container spacing={3}>
          {data.products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      title={product.name}
                      image={product.image}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button variant="contained" color="primary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
