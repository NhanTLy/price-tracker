import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useStyles from '../../style/theme';
import useInput from '../hooks/useInput';
import { useAuth } from '../routes/useAuth';
import {
  Button,
  TextField,
  // IconButton,
  // Checkbox,
  DialogTitle,
  // Divider,
  Typography,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

const ProductForm = ({
  productId,
  productName,
  productUrl,
  formType,
  price,
  emailPreference,
}) => {
  const classes = useStyles();

  const auth = useAuth();
  const user = auth.getUser();

  if (!user) return auth.signout(() => history.push('/'));

  const token = user.token ? user.token : null;

  const [alert, setAlert] = useState({
    type: '',
    message: '',
  });

  const [desiredPrice, updateDesiredPrice, resetDesiredPrice] = useInput(
    formType === 'add' ? '$0.0' : price
  );

  const [emailNotification, setEmailNotification] = useState(
    formType === 'add' ? false : emailPreference
  );
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setEmailNotification(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!desiredPrice) {
      setAlert({
        type: 'error',
        message: 'Price input is required.',
      });
      return;
    }

    // const desired_price = Number(desiredPrice);
    const url =
      formType === 'add' ? '/api/products/' : `/api/products/${productId}`;

    fetch(url, {
      method: formType === 'add' ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        google_url: productUrl,
        desired_price: desiredPrice,
        email_preference: emailNotification,
      }),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 403) auth.signout(() => history.push('/'));

        return res.json().then(({ err }) => {
          throw err;
        });
      })
      .then(({ message, email_preference, desired_price }) => {
        setAlert({
          type: 'success',
          message: message,
        });
        if (formType === 'edit') {
          setEmailNotification(email_preference);
          updateDesiredPrice(desired_price);
        }
      })
      .catch((err) => {
        setAlert({
          type: 'error',
          message: err,
        });
      });
  };

  return (
    <>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        {formType === 'add' && (
          <TextField
            className={classes.loginTextField}
            id="email"
            disabled
            label="Product Name"
            variant="filled"
            value={productName}
          />
        )}
        <TextField
          className={classes.loginTextField}
          id="desiredPrice"
          label="Desired Price"
          variant="filled"
          value={desiredPrice}
          onChange={updateDesiredPrice}
          type="text"
        />

        <FormControlLabel
          style={{ marginLeft: 0, alignItems: 'flex-start' }}
          control={
            <Switch
              checked={emailNotification}
              onChange={handleChange}
              name="emailNotification"
              aria-label="email notification"
            />
          }
          label="Send Email Notifications"
          labelPlacement="top"
        />
        <Button
          className={classes.registerBtn}
          type="submit"
          variant="contained"
          color="primary"
        >
          {formType === 'add' ? 'Add Product' : 'Update Product'}
        </Button>
      </form>
    </>
  );
};

export default ProductForm;
