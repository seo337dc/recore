import { useState } from "react";
import * as MaterialCore from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";

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

  const onClick = async () => {
    const res = await axios.get("https://newsapi.org/v2/everything?apiKey=f0314630b1d64516bc522a83c6c5b6c0&q=health");
    if (res.status === 200) {
      setArticles(res.data.articles);
    }
  };

  return (
    <MaterialCore.ThemeProvider theme={materialUITheme}>
      <button onClick={onClick}>확인</button>
      <HomeWrap>
        {articles?.map((data, index) => (
          <CardWrap key={`test_${index}`}>
            <CarContainer>
              {data.title}
            </CarContainer>
          </CardWrap>)
        )}
      </HomeWrap>
    </MaterialCore.ThemeProvider>);
};


const HomeWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

const CardWrap = styled(MaterialCore.Card)`
  width: 100px;
  height: 100px;
`;

const CarContainer = styled(MaterialCore.CardContent)``;


export default Home;
