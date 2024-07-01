import React from "react";
import "./Article.css";

/**
 * Article component
 * 
 * className - prop containing className
 * article - prop containing the article
 * displayImage - prop conatining boolean value to display the image
 * displayTeaser - prop conatining boolean value to display the teaser text
 * displayByline - prop conatining boolean value to display the byline text
 */

const images = require.context(
  "../../assets/images",
  false,
  /\.(png|jpe?g|svg)$/,
);

const Article = ({
  className,
  article,
  displayImage,
  displayTeaser,
  displayByline,
}) => {
  const imageSrc = images(`./${article.image}`);

  return (
    <div className={className}>
      {displayImage && <img src={imageSrc} alt={article.head} />}
      <div className="content">
        <h3>{article.head}</h3>
        {displayTeaser && <p>{article.teaser}</p>}
        {displayByline && <p className="byline">{article.byline.text}</p>}
      </div>
    </div>
  );
};

export default Article;
