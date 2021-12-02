import React, { useState } from 'react';
import styled from 'styled-components';
import Login from '../Login/Login';


interface Props {
  children: React.ReactNode;
  onClick: Function;
}

const Layout = ({ children, onClick }: Props) => {
  const [search, setSearch] = useState('');
  const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Nav>
        <input value={search} onChange={onHandleInput} />
        <i className='bx bx-search' onClick={() => onClick(search)} />
      </Nav>
      <Wrap>
        <Container>
          <ArticleWrap>
            {children}
          </ArticleWrap>
          <LeftNavWrap>
            <Login />
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
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #000000;

  input {
    width: 20%;
    min-height: 30px;
    border-radius: 10px;
    color: #000000;
    font-size: 15px;

    &:focus {
      outline: none;
    }
  }

  i {
    font-size: 25px;
    color: #fec0bd;
    cursor: pointer;
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
  //border: 1px solid black;
`;

export default Layout;
