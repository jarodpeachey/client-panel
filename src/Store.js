import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import 'firebase/firestore';
// import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
// import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducer from './reducers';

const middleware = [thunk];

// const persistConfig = {
//   key: 'root',
//   storage,
//   stateReconciler: autoMergeLevel2,
// };

// const rootReducer = combineReducers({
//   firebase: firebaseReducer,
//   firestore: firestoreReducer,
//   dataReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

const initialState = {};

export default () => createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
