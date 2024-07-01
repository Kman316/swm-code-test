import React from "react";
import "./Header.css";

/**
 * Header component
 *
 * article - prop which contains the article of the main news header
 */

const images = require.context(
  "../../assets/images",
  false,
  /\.(png|jpe?g|svg)$/,
);

const Header = ({ article }) => {
  const imageSrc = images(`./${article.image}`);

  return (
    <div className="header">
      <div className="header-content">
        <div className="title">
          <h2>{article.head}</h2>
          <p className="news-teaser">{article.teaser}</p>
        </div>
        <div className="byline">
          <p>{article.byline.text}</p>
        </div>
      </div>
      <div className="header-image">
        <img src={imageSrc} alt={article.head} />
      </div>
    </div>
  );
};

export default Header;
