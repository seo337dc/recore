import { UPDATE_ARTICLE } from './actionTypes';
import { articleInfo } from '../types/state';

export const updateArticle = (articleList: articleInfo[]) => ({
  type: UPDATE_ARTICLE,
  payload: articleList,
});


export type articleAction = | ReturnType<typeof updateArticle>;
