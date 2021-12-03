import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import Login from '../Login/Login';
import BookMark from '../BookMark/BookMark';
import { RootState } from '../../store/reducer';
import { insertInfo } from '../../store/actions/info';


interface Props {
  children: React.ReactNode;
  onClick: Function;
  onHandleInput: Function;
  setIsSortDate: Function;
  search: string;
  isSortDate: boolean;
}

const Layout = ({ children, onClick, onHandleInput, search, isSortDate }: Props) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.infoReducer);


  const onHandleClickLogout = () => {
    cookies.set('token', '');
    dispatch(insertInfo(''));
  };

  return (
    <>
      <Nav>
        <NavContent />
        <NavContent>
          <input value={search} onChange={(e) => onHandleInput(e)} />
          <i className='bx bx-search' onClick={() => onClick(search, isSortDate)} />
        </NavContent>
        <NavContent>
          {token && <i className='bx bx-log-out' onClick={onHandleClickLogout} />}
        </NavContent>
      </Nav>
      <Wrap>
        <Container>
          <ArticleWrap>
            {children}
          </ArticleWrap>
          <LeftNavWrap>
            {token ? <BookMark /> : <Login />}
          </LeftNavWrap>
        </Container>

      </Wrap>
    </>

  );
};

const Nav = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  background-color: #000000;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;


  input {
    width: 100%;
    min-height: 30px;
    border-radius: 10px;
    color: #000000;
    font-size: 20px;

    &:focus {
      outline: none;
    }
  }

  i {
    font-size: 30px;
    color: #fec0bd;
    cursor: pointer;
    margin-right: 20px;
  }
`;

const Wrap = styled.div`
  padding-top: 50px;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ArticleWrap = styled.div`
  width: 80%;
`;

const LeftNavWrap = styled.div`
  width: 20%;
  min-height: 500px;
  height: auto;
  padding: 20px;
  position: fixed;
  right: 0;
  top: calc(50px + 10%);
  z-index: 1;
`;

export default Layout;
