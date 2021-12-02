import { INSERT_INFO, UPDATE_BOOKMARK } from './actionTypes';
import { Bookmark } from '../types/state';

export const insertInfo = (token: string) => ({
  type: INSERT_INFO,
  payload: {
    token,
  },
});

export const updateBookMark = (bookMarkList: Bookmark[]) => ({
  type: UPDATE_BOOKMARK,
  payload: {
    bookmark: bookMarkList,
  },
});


export type InfoAction = | ReturnType<typeof insertInfo>;
export type bookmarkAction = | ReturnType<typeof updateBookMark>;
