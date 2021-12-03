import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import { insertInfo } from '../../store/actions/info';

const Login = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState({ id: '', pw: '' });

  const onHandleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  }, [inputText]);


  const onHandleSubmit = () => {
    if (inputText.id !== 'recore' || inputText.pw !== 'recore123') {
      alert('not certified information');
      return;
    }

    cookies.set('token', inputText.id);
    dispatch(insertInfo(inputText.id));
  };

  return (
    <LoginWrap>
      <HeadWrap>
        LOGIN
      </HeadWrap>
      <BodyWrap>
        <BodyContainer>
          <BodyContent>
            <InputCotent>ID</InputCotent>
            <input name='id' value={inputText.id} onChange={onHandleChangeInput} />
          </BodyContent>
          <BodyContent>
            <InputCotent>PW</InputCotent>
            <input name='pw' type='password' value={inputText.pw} onChange={onHandleChangeInput} />
          </BodyContent>
          <ButtonWrap>
            <ButtonStyle onClick={onHandleSubmit}>로그인</ButtonStyle>
          </ButtonWrap>

        </BodyContainer>
      </BodyWrap>
    </LoginWrap>
  );
};

const LoginWrap = styled.div`
  height: 400px;
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
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const BodyContainer = styled.div``;

const BodyContent = styled.div`
  height: 30px;
  margin: 10px 0;
  display: flex;
  gap: 5px;

  input {
    width: 150px;
  }
`;
const InputCotent = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  &:after {
    content: ':';
  }
`;

const ButtonWrap = styled.div`
  height: 30px;
  margin: 40px 0;
  display: flex;
  gap: 5px;
`;

const ButtonStyle = styled('button')`
  width: 100%;
  height: 40px;
  border: 0;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

export default Login;
