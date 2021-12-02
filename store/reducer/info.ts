import { Info } from '../types/state';
import { InfoAction, bookmarkAction } from '../actions/info';
import { INSERT_INFO, UPDATE_BOOKMARK } from '../actions/actionTypes';


const initialState: Info = {
  token: '',
  bookmark: [],
};


export const infoReducer = (state = initialState, action: InfoAction) => {
  switch (action.type) {
    case INSERT_INFO:
      return { ...state, token: action.payload.token };
    default :
      return state;
  }
};

export const bookmarkReducer = (state = initialState, action: bookmarkAction) => {
  switch (action.type) {
    case UPDATE_BOOKMARK:
      return { ...state, bookmark: action.payload.bookmark };
    default :
      return state;
  }
};
