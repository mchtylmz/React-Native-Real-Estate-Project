import React from 'react';
import NavigationService from '../lib/NavigationService';
import AppContainer from './index';

class App extends React.Component {
  render() {
    return (
      <>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </>
    );
  }
}

export default App;
