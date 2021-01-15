import React, { useState } from 'react';
import NavBar from './nav/NavBar';
import Search from './search/Search';
import ScrollTop from './product/ScrollTop';
import { Grid, Fab } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../components/routes/useAuth';
import SearchList from '../components/search/SearchList';

const Main = () => {
  const history = useHistory();
  const auth = useAuth();
  const user = auth.getUser();

  if (!user) return auth.signout(() => history.push('/'));

  const token = user ? user.token : null;

  // state
  const [list, setList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [fetchProduct, setFetch] = useState(false);
  const [productId, setProductId] = useState(null);

  // get all products from search API
  const getSearchedProducts = (products) => {
    setSearchResults(products);
  };

  // delete product from userList
  const deleteProduct = (productId) => setProductId(productId);

  return (
    <>
      <NavBar />
      <Grid container style={{ marginTop: 64 }}>
        <Grid
          id="back-to-top-anchor"
          container
          item
          justify="center"
          xs={12}
          style={{ margin: '2rem 0' }}
        >
          <Search getSearchedProducts={getSearchedProducts} />
        </Grid>
        <Grid
          container
          spacing={3}
          direction="row"
          style={{
            padding: '50px',
          }}
        >
          <SearchList searchResults={searchResults} />
        </Grid>
      </Grid>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Main;
