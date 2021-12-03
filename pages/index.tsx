import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import styled from 'styled-components';
import * as MaterialCore from '@material-ui/core';
import Layout from '../component/Layout';
import { RootState } from '../store/reducer';
import { insertInfo, updateBookMark } from '../store/actions/info';
import { updateArticle } from '../store/actions/article';

interface articleInfo {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: null; name: string };
  title: string;
  url: string;
  urlToImage: string;
  isBookmark?: boolean;
}

const Home = () => {
  const materialUITheme = MaterialCore.unstable_createMuiStrictModeTheme();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.infoReducer);
  const { bookmark } = useSelector((state: RootState) => state.bookmarkReducer);
  const articles = useSelector((state: RootState) => state.articlesReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [isSortDate, setIsSortDate] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [ref, inView] = useInView();

  const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearch = async (search: string) => {
    if (!search) {
      alert('검색어를 입력하세요.');
      return;
    }
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=3df0778ab7324c82a6056226c1cb147e&q=${search}&page=1&pageSize=5`,
      );
      if (res.status === 200) {
        dispatch(
          updateArticle(
            res.data.articles.map((articleInfo: articleInfo) => {
              if (bookmark.find((data) => data.url === articleInfo.url)) {
                return { ...articleInfo, isBookmark: true };
              } else {
                return { ...articleInfo, isBookmark: false };
              }
            }),
          ),
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickBookMark = (info: articleInfo) => {
    const newArticleList = articles.map((articleInfo) => {
      if (articleInfo.url === info.url) {
        return { ...articleInfo, isBookmark: !articleInfo.isBookmark };
      } else {
        return { ...articleInfo };
      }
    });

    if (info.isBookmark) {
      const reduxBookMarkList = newArticleList
        .filter((data) => data.isBookmark)
        .map((data) => ({
          title: data.title,
          url: data.url,
          urlToImage: data.urlToImage,
        }));
      dispatch(updateBookMark(reduxBookMarkList));
      cookies.set('bookmark', reduxBookMarkList);
    } else {
      const newObj = { title: info.title, url: info.url, urlToImage: info.urlToImage };
      dispatch(updateBookMark(bookmark.concat(newObj)));
      cookies.set('bookmark', bookmark.concat(newObj));
    }

    dispatch(updateArticle(newArticleList));
  };

  const imgCheckFunc = (urlToImage: string): string => {
    if (!urlToImage || urlToImage.indexOf('.html') > -1) {
      return '/images/no-image.svg';
    } else {
      return urlToImage;
    }
  };

  const scrollGetDataFunc = async (changePage: number) => {
    if (isLoading) return;
    if (search === '') return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=3df0778ab7324c82a6056226c1cb147e&q=${search}&page=${changePage}&pageSize=5`,
      );
      if (res.status === 200) {
        dispatch(
          updateArticle(
            articles.concat(
              res.data.articles.map((articleInfo: articleInfo) => {
                if (bookmark.find((data) => data.url === articleInfo.url)) {
                  return { ...articleInfo, isBookmark: true };
                } else {
                  return { ...articleInfo, isBookmark: false };
                }
              }),
            ),
          ),
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = cookies.get('token') || '';
    const bookMarkList = cookies.get('bookmark');
    if (bookMarkList) dispatch(updateBookMark(bookMarkList));
    dispatch(insertInfo(token));
  }, [cookies.get('token')]);

  useEffect(() => {
    if (inView && !isLoading) {
      setPage((prevState) => prevState + 1);
      scrollGetDataFunc(page + 1);
    }
  }, [inView, isLoading]);

  return (
    <MaterialCore.ThemeProvider theme={materialUITheme}>
      <Layout
        onClick={onClickSearch}
        onHandleInput={onHandleInput}
        setIsSortDate={setIsSortDate}
        search={search}
        isSortDate={isSortDate}
      >
        <HomeWrap>
          {isLoading && (
            <LoadingWrap>
              <MaterialCore.CircularProgress />
            </LoadingWrap>
          )}

          {!articles.length && <NoneDataWrap>No Data</NoneDataWrap>}
          {articles.length &&
          articles.map((data, index) => {
            if (articles.length - 1 === index) {
              return (
                <CardWrap key={`articleInfo_${index}`} ref={ref}>
                  <CardContainer>
                    <CardLeft>
                      <img src={imgCheckFunc(data.urlToImage)} alt={data.url} />
                    </CardLeft>
                    <CardRight>
                      <TitleWrap>
                        <a href={data.url} rel='noreferrer noopener' target='_blank'>
                          {data.title}
                        </a>
                        {token && (
                          <i
                            className={`bx ${!data.isBookmark ? 'bx' : 'bxs'}-bookmark`}
                            onClick={() => onClickBookMark(data)}
                          />
                        )}
                      </TitleWrap>
                      <ContentWrap>
                        <p>{data.description}</p>
                      </ContentWrap>
                      <EctWrap>
                        {data.author && (
                          <AuthorWrap>
                            <i className='bx bx-user' />
                            <span>{data.author}</span>
                          </AuthorWrap>
                        )}
                        {data.author && <span>|</span>}
                        <PublishedAtWrap>
                          <i className='bx bx-time' />
                          <span>{data.publishedAt.slice(0, 10)}</span>
                        </PublishedAtWrap>
                      </EctWrap>
                      <AuthorWrap>
                        <span>source : {`${data.source.name}`}</span>
                      </AuthorWrap>
                    </CardRight>
                  </CardContainer>
                </CardWrap>
              );
            } else {
              return (
                <CardWrap key={`articleInfo_${index}`}>
                  <CardContainer>
                    <CardLeft>
                      <img src={imgCheckFunc(data.urlToImage)} alt={data.url} />
                    </CardLeft>
                    <CardRight>
                      <TitleWrap>
                        <a href={data.url} rel='noreferrer noopener' target='_blank'>
                          {data.title}
                        </a>
                        {token && (
                          <i
                            className={`bx ${!data.isBookmark ? 'bx' : 'bxs'}-bookmark`}
                            onClick={() => onClickBookMark(data)}
                          />
                        )}
                      </TitleWrap>
                      <ContentWrap>
                        <p>{data.description}</p>
                      </ContentWrap>
                      <EctWrap>
                        {data.author && (
                          <AuthorWrap>
                            <i className='bx bx-user' />
                            <span>{data.author}</span>
                          </AuthorWrap>
                        )}
                        {data.author && <span>|</span>}
                        <PublishedAtWrap>
                          <i className='bx bx-time' />
                          <span>{data.publishedAt.slice(0, 10)}</span>
                        </PublishedAtWrap>
                      </EctWrap>
                      <AuthorWrap>
                        <span>source : {`${data.source.name}`}</span>
                      </AuthorWrap>
                    </CardRight>
                  </CardContainer>
                </CardWrap>
              );
            }
          })}
        </HomeWrap>
      </Layout>
    </MaterialCore.ThemeProvider>
  );
};

const HomeWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadingWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoneDataWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: xxx-large;
  color: #666;
`;

const CardWrap = styled(MaterialCore.Card)`
  height: 150px;
  margin: 25px 10px;
`;

const CardContainer = styled(MaterialCore.CardContent)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardLeft = styled.div`
  width: 200px;
  height: 120px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const CardRight = styled.div`
  padding: 5px 10px;
  width: calc(100% - 200px);
  height: 120px;
  //border: 1px solid #000;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: large;

  a {
    cursor: pointer;

    &:hover {
      color: blue;
      text-decoration: underline;
    }
  }

  i {
    cursor: pointer;
  }
`;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;

  p {
    color: #666;
    line-height: 1.2em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const EctWrap = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  font-size: small;
`;

const AuthorWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;

  span {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const PublishedAtWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #3f63bf;
`;

export default Home;
