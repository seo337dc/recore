import { articleInfo } from '../types/state';
import { UPDATE_ARTICLE } from '../actions/actionTypes';
import { articleAction } from '../actions/article';


const initialState: articleInfo[] = [];

export const articlesReducer = (state = initialState, action: articleAction) => {
  switch (action.type) {
    case UPDATE_ARTICLE:
      return action.payload;
    default :
      return state;
  }
};
