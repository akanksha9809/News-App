import React from 'react'
// import './News.css'

function News({news}) {
  return (
    <div className="news-card">
        <div className='news-card-main'>
          <img src={news.urlToImage} alt={news.title} />
          <h2>{news.title}</h2>
          <p>{news.description}</p>
        </div>
        <div className='footer'>
          <p>{news.publishedAt}</p>
          <button className='save' onClick={() => window.open(news.url)} >Read More</button>
        </div>
    </div>
  )
}

export default News