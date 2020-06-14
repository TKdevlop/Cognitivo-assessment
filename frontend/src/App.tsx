import React, { useState } from 'react';
import Header from './header';
import Artist from './artist';
import Genres from './genres';
import { Button, Grid, Container } from '@material-ui/core';

function App() {
  const [currentComponent, setCurrentComponent] = useState<number>(1);
  const renderCurrentComponent = () => {
    switch (currentComponent) {
      case 1:
        return <Artist />;
      case 2:
        return <Genres />;
    }
  };
  const changeCurrentComponent = (id: number) => () => {
    setCurrentComponent(id);
  };
  return (
    <>
      <Header />
      <Container disableGutters style={{ textAlign: 'center' }}>
        <Grid container style={{ marginTop: 10 }} justify='center'>
          <Grid item style={{ marginRight: 30 }}>
            <Button
              variant='contained'
              onClick={changeCurrentComponent(1)}
              color={currentComponent === 1 ? 'secondary' : 'default'}
            >
              Top 10 Artist
            </Button>
          </Grid>
          <Grid item>
            <Button
              color={currentComponent === 2 ? 'secondary' : 'default'}
              variant='contained'
              onClick={changeCurrentComponent(2)}
            >
              Trending Genres
            </Button>
          </Grid>
        </Grid>

        {renderCurrentComponent()}
      </Container>
    </>
  );
}

export default App;
