import React, { useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
} from '@material-ui/core';
import useStyles from '../../style/theme';
import AddProduct from '../product/AddProduct';

const SearchCard = ({ productId, image, link, merchant, price, title }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid container item xs={12} sm={6} md={4} lg={3} direction="column">
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'flex-end',
          }}
        >
          <CardActionArea style={{ height: 300 }}>
            <CardMedia
              className={classes.productCardMedia}
              image={image}
              title={title}
            />
          </CardActionArea>
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography
              className={classes.productPrice}
              variant="h4"
              color="primary"
            >
              ${price}
            </Typography>
            <Typography variant="subtitle1">
              <a href={link} target="_blank">
                {merchant}
              </a>
            </Typography>
            <Typography variant="overline" display="block">
              Product Id: {productId}
            </Typography>
          </CardContent>
          <CardActions
            style={{
              width: '100%',
            }}
          >
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="secondary"
              size="small"
              style={{
                flexGrow: 1,
                justifyContent: 'center',
              }}
            >
              Save Product
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <AddProduct
          setOpen={setOpen}
          productUrl={link}
          productId={productId}
          productName={title}
        />
      </Dialog>
    </>
  );
};

export default SearchCard;
