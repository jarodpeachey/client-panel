/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { createBrowserHistory } from 'history';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import Application from './Application';
import Store from './Store';

const history = createBrowserHistory({
  // forceRefresh: true,
});

const firebaseConfig = {
  apiKey: 'AIzaSyDU5OSSk8aj6TjjiiEJuEK-c-d_JDEBrd8',
  authDomain: 'client-panel-957ba.firebaseapp.com',
  databaseURL: 'https://client-panel-957ba.firebaseio.com',
  projectId: 'client-panel-957ba',
  storageBucket: 'client-panel-957ba.appspot.com',
  messagingSenderId: '12626742331',
  appId: '1:12626742331:web:4c24c2efce2f1d6a1b601e',
};

const reactReduxFirebaseConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  allowMultipleListeners: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const store = Store();

const reactReduxFirebaseProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// const persistor = persistStore(store);

const renderApp = () => {
  ReactDOM.render(
    <>
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
          <Router history={history}>
            <Route
              render={props => (
                <Application
                  {...props}
                  database={firebase}
                />
              )}
            />
          </Router>
        </ReactReduxFirebaseProvider>
        {/* </PersistGate> */}
      </Provider>
    </>,
    document.getElementById('app'),
  );
};

renderApp();
