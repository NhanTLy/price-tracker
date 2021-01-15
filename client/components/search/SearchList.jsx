import React from 'react';
import SearchCard from './SearchCard';
import { v4 as uuidv4 } from 'uuid';
import { Typography, Divider, Grid } from '@material-ui/core';
import useStyles from '../../style/theme';

const SearchList = ({ searchResults }) => {
  const classes = useStyles();

  const resultList = searchResults.map(
    ({ id, title, image, link, merchant, price }) => (
      <>
        <SearchCard
          productId={id}
          key={uuidv4()}
          image={image}
          link={link}
          merchant={merchant}
          price={price}
          title={title}
        />
      </>
    )
  );
  return (
    resultList.length > 0 && (
      <>
        <Grid container item justify="center" xs={12}>
          <Typography variant="h5">Search Results</Typography>
          <Divider variant="middle" />
        </Grid>
        {resultList}
      </>
    )
  );
};

export default SearchList;
