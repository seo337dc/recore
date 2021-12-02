import { useSelector, useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import { RootState } from '../../store/reducer';
import { updateBookMark } from '../../store/actions/info';
import { updateArticle } from '../../store/actions/article';

interface Bookmark {
  title: string;
  url: string; // key
  urlToImage: string;
}

const BookMark = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { bookmark } = useSelector((state: RootState) => state.bookmarkReducer);
  const articleList = useSelector((state: RootState) => state.articlesReducer);

  const onHandleDelete = (bookmarkData: Bookmark) => {
    dispatch(updateBookMark(bookmark.filter((data) => data.url !== bookmarkData.url)));
    cookies.set('bookmark',bookmark.filter((data) => data.url !== bookmarkData.url));
    dispatch(updateArticle(articleList.map((data) => {
      if (data.url === bookmarkData.url) {
        return { ...data, isBookmark: false };
      } else {
        return data;
      }
    })));
  };


  return (
    <BookMarkWrap>
      <HeadWrap>BookMark</HeadWrap>
      <BodyWrap>
        <CardWrap>
          {bookmark.slice(0).reverse().map((data,index) =>
            (<CardContainer key={`bookmark_${index}`}>
                <CardTop>
                  <i className='bx bx-x-circle' onClick={() => onHandleDelete(data)} />
                </CardTop>
                <CardBody>
                  <img src={data.urlToImage} alt={data.title}/>
                  <p>{data.title}</p>
                </CardBody>
              </CardContainer>),
          )}
        </CardWrap>
      </BodyWrap>
    </BookMarkWrap>
  );
};

const BookMarkWrap = styled.div`
  height: 600px;
  overflow-y: scroll;
  border: 1px solid black;
`;

const HeadWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
  font-size: x-large;
`;

const BodyWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrap = styled.div`
  width: 100%;
  padding: 10px;
`;

const CardContainer = styled.div`
  width: 100%;
  height: 200px;
  margin: 5px 0;
  border: 1px solid black;
`;

const CardTop = styled.div`
  height: 20px;
  margin: 5px;
  display: flex;
  flex-direction: row-reverse;

  i {
    cursor: pointer;
  }
`;

const CardBody = styled.div`
  height: calc(100% - 20px);

  img {
    width: 90%;
    height: 70%;
  }

  p {
    width: 100%;
    padding: 0 20px;
    font-size: small;
    font-weight: bold;
    line-height: 1.2em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  text-align: center;
`;

export default BookMark;
