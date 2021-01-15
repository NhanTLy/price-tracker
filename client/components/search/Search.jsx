import React, { useState, useEffect, useRef } from 'react';
import useInput from '../hooks/useInput';
import useToggler from '../hooks/useToggler';
// import Loader from './Loader';
import { Button, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Spinner from './Spinner';
import useStyles from '../../style/theme';
import Response from '../alert/response';
import { useAuth } from '../routes/useAuth';

const Search = ({ getSearchedProducts }) => {
  const [searchValue, handleSearchValue, resetSearchValue] = useInput('');
  const [isFetching, toggler] = useToggler(false);
  const [spinner, setSpinner] = useState(false);
  const classes = useStyles();

  const [alert, setAlert] = useState({
    type: '',
    message: '',
    hide: true,
  });

  const auth = useAuth();
  const user = auth.getUser();

  if (!user) return auth.signout(() => history.push('/'));

  const token = user.token ? user.token : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue === '') {
      setAlert({
        type: 'error',
        message: 'Please fill in the search bar input!',
        hide: false,
      });
      return;
    }

    // reset alert.
    setAlert({
      type: '',
      message: '',
      hide: true,
    });

    // setSpinner(true);

    fetch(`/api/search/${searchValue}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        if (res.state === 403) {
          return auth.signout(() => {
            history.push('/');
          });
        }
        return res.json().then(({ err }) => {
          throw err;
        });
      })
      .then(({ items }) => {
        // setSpinner(false);
        getSearchedProducts(items);
      })
      .catch((err) => {
        // setSpinner(false);
        console.log('api search error', err);
        setAlert({
          type: 'error',
          message: err,
          hide: false,
        });
      });
  };

  return (
    <>
      <Response alert={alert} />
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.searchBar}
          variant="outlined"
          label="Search for a product"
          value={searchValue}
          onChange={handleSearchValue}
          inputProps={{ className: classes.searchBar }}
        />
      </form>
      <Button
        className={classes.searchBtn}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        endIcon={<SearchIcon />}
      >
        Search
      </Button>
    </>
  );
};
export default Search;
