import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import dataReducer from './reducers/dataReducer';

const middleware = [thunk];

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
};

firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore(); // We will use this later

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

export const store = createStore(
  persistedReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase, reactReduxFirebaseConfig),
    reduxFirestore(firebase),
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export const persistor = persistStore(store);
