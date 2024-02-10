import React from 'react';
import { Provider } from 'react-redux'

import Navigations from './src/navigations';
import { store } from './src/store';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <Navigations/>
    </Provider>
  );
}
export default App;
