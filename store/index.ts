import { createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import rootReducers from './reducer';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

const bindMiddleware = (middleware : Middleware[]): StoreEnhancer =>{
  if(process.env.NODE_ENV !== 'production'){
    const {composeWithDevTools} = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// @ts-ignore
const makeStore: MakeStore<{}> = () => {
  const store = createStore(rootReducers, {}, bindMiddleware([]));
  return store;
};

// @ts-ignore
export const wrapper = createWrapper<{}>(makeStore, { debug: true });
