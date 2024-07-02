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

  const renderArticle = (article, index, className, displayImage, displayTeaser, displayByline) => (
    <Article
      key={index}
      className={className}
      article={article}
      displayImage={displayImage}
      displayTeaser={displayTeaser}
      displayByline={displayByline}
    />
  );

  return (
    <div className="news">
      <div className="news-left">
        {articles[0] && <Header article={articles[0]} />}
        <div className="articles">
          <div className="article-long">
            {articles[5] && renderArticle(articles[5], 5, "article", () => setDisplayImage(true), () => setDisplayTeaser(true), () => setDisplayByline(true))}
          </div>
          <div className="article-short">
            {articles[2] && renderArticle(articles[2], 2, "article-short-top", displayImage, () => setDisplayTeaser(true), () => setDisplayByline(true))}
            {articles[3] && renderArticle(articles[3], 3, "article-short-bottom", displayImage, () => setDisplayTeaser(true), () => setDisplayByline(true))}
          </div>
          <div className="article-long">
            {articles[4] && renderArticle(articles[4], 4, "article", () => setDisplayImage(true), () => setDisplayTeaser(true), () => setDisplayByline(true))}
          </div>
        </div>
      </div>
      <div className="news-right">
        {articles[1] && renderArticle(articles[1], 1, "article", () => setDisplayImage(true), displayTeaser, () => setDisplayByline(true))}
        <div className="article-titles">
          {articles.slice(6).map((article, index) =>
            renderArticle(article, index + 6, "article", displayImage, displayTeaser, displayByline)
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
