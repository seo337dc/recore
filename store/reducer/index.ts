import { combineReducers } from 'redux';
import { infoReducer, bookmarkReducer } from './info';
import { articlesReducer } from './article';

const rootReducers = combineReducers({ infoReducer, bookmarkReducer, articlesReducer });

export default rootReducers;

export type RootState = ReturnType<typeof rootReducers>

