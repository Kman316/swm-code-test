import React, { useState, useEffect } from "react";
import axios from "axios";
import Article from "./components/Article/Article";
import Header from "./components/Header/Header";
import "./App.css";

const App = () => {
  /**
   * App component
   *
   * articles - state object to store the news data. Initially set to empty array.
   * displayImage - state value to keep track of images to display.
   * displayTeaser - state value to keep track of teaser text to display.
   * displayByline - state value to keep track of Byline text to display.
   */
  const [articles, setArticles] = useState([]);
  const [displayImage, setDisplayImage] = useState(false);
  const [displayTeaser, setDisplayTeaser] = useState(false);
  const [displayByline, setDisplayByline] = useState(false);

  /**
   * fetch the news data from AWS and remove the prefix from the image file names.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://41hraofw9f.execute-api.ap-southeast-2.amazonaws.com/dev/news",
        );
        const modifiedData = removePrefixFromImages(response.data);
        console.log(modifiedData);
        setArticles(modifiedData.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  /**
   * function to remove the prefix C- followed by digits and a slash from the image file name using regex.
   * @param {Object} data - The data object containing the articles array.
   * @returns {Object} - A new data object with the articles array where the image filenames have the prefix removed.
   */
  const removePrefixFromImages = (data) => {
    return {
      ...data,
      articles: data.articles.map((article) => ({
        ...article,
        image: article.image.replace(/^C-\d+\//, ""),
      })),
    };
  };

  return (
    <div className="news">
      <div className="news-left">
        {articles[0] && <Header article={articles[0]} />}
        <div className="articles">
          <div className="article-long">
            {articles[5] && (
              <Article
                className="article"
                article={articles[5]}
                displayImage={() => setDisplayImage(true)}
                displayTeaser={() => setDisplayTeaser(true)}
                displayByline={() => setDisplayByline(false)}
              />
            )}
          </div>
          <div className="article-short">
            {articles[2] && (
              <Article
                className="article-short-top"
                article={articles[2]}
                displayImage={displayImage}
                displayTeaser={() => setDisplayTeaser(true)}
                displayByline={() => setDisplayByline(false)}
              />
            )}

            {articles[3] && (
              <Article
                className="article-short-bottom"
                article={articles[3]}
                displayImage={displayImage}
                displayTeaser={() => setDisplayTeaser(true)}
                displayByline={() => setDisplayByline(false)}
              />
            )}
          </div>
          <div className="article-long">
            {articles[4] && (
              <Article
                className="article"
                article={articles[4]}
                displayImage={() => setDisplayImage(true)}
                displayTeaser={() => setDisplayTeaser(true)}
                displayByline={() => setDisplayByline(false)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="news-right">
        {articles[1] && (
          <Article
            className="article"
            article={articles[1]}
            displayImage={() => setDisplayImage(true)}
            displayTeaser={displayTeaser}
            displayByline={() => setDisplayByline(false)}
          />
        )}

        <div className="article-titles">
          {articles.slice(6).map((article) => (
            <Article
              className="article"
              article={article}
              displayImage={displayImage}
              displayTeaser={displayTeaser}
              displayByline={displayByline}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
