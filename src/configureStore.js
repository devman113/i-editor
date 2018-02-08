import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './redux/reducers';
import rootSaga from './redux/sagas';

export default function configureStore() {
  const rootReducer = combineReducers({
    ...reducers
  });

  const sagaMiddleware = createSagaMiddleware();

  let enhancer = applyMiddleware(sagaMiddleware);
  if (process.env.NODE_ENV !== 'production') {
    enhancer = composeWithDevTools({})(enhancer);
  }

  const store = createStore(rootReducer, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
}
