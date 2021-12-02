import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as MaterialCore from '@material-ui/core';
import Layout from '../component/Layout';

//
// author: "Meredith Dietz"
// content: "Its no surprise that after a year of unprecedented (remember that word?) isolation, there was a significant surge in users seeking out remote therapy and mental health apps. In terms of increasing me… [+8644 chars]"
// description: "It’s no surprise that after a year of unprecedented (remember that word?) isolation, there was a significant surge in users seeking out remote therapy and mental health apps. In terms of increasing mental health awareness and decreasing mental health stigma, …"
// publishedAt: "2021-11-02T19:00:00Z"
// source: {id: null, name: 'Lifehacker.com'}
// title: "Do Therapy Apps Really Protect Your Privacy?"
// url: "https://lifehacker.com/do-therapy-apps-really-protect-your-privacy-1847983029"
// urlToImage: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,
interface articleInfo {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
// source: {id: null, name: 'Lifehacker.com'}
  title: string;
  url: string;
  urlToImage: string;
}

const Home = () => {
  const materialUITheme = MaterialCore.unstable_createMuiStrictModeTheme();
  const [articles, setArticles] = useState<articleInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const onClickSearch = async (search: string) => {
    if (!search) {
      alert('검색어를 입력하세요.');
      return;
    }
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await axios.get(`https://newsapi.org/v2/everything?apiKey=f0314630b1d64516bc522a83c6c5b6c0&q=${search}`);
      if (res.status === 200) {
        setArticles(res.data.articles);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const imgCheck = (urlToImage: string): string => {
    if (!urlToImage || urlToImage.indexOf('.html') - 1 > 0) {
      return '/image/no-image.svg';
    } else {
      return urlToImage;
    }
  };

  return (
    <MaterialCore.ThemeProvider theme={materialUITheme}>
      <Layout onClick={onClickSearch}>
        <HomeWrap>
          {isLoading && (
            <LoadingWrap>
              <MaterialCore.CircularProgress />
            </LoadingWrap>
          )}
          {articles.length ?
            articles.map((data, index) => (
              <CardWrap key={`articleInfo_${index}`}>
                <CardContainer>
                  <CardLeft>
                    <img src={imgCheck(data.urlToImage)} alt={data.url} />
                  </CardLeft>
                  <CardRight>
                    <TitleWrap>{data.title}</TitleWrap>
                    <ContentWrap><p>{data.description}</p></ContentWrap>
                    <EctWrap>
                      <AuthorWrap>
                        <i className='bx bx-user' />
                        <span>{data.author}</span>
                      </AuthorWrap>
                      <span>|</span>
                      <PublishedAtWrap>
                        <i className='bx bx-time' />
                        <span>{data.publishedAt.slice(0, 10)}</span>
                      </PublishedAtWrap>
                    </EctWrap>
                  </CardRight>
                </CardContainer>
              </CardWrap>),
            ) :
            <NoneDataWrap>No Data</NoneDataWrap>
          }
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
  //border: 1px solid black;
`;

const TitleWrap = styled.div`
  font-weight: bold;
  font-size: large;
  cursor: pointer;
  
  &:hover{
    color: blue;
    text-decoration: underline;
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

  //border: 1px solid black;
`;

const EctWrap = styled.div`
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
