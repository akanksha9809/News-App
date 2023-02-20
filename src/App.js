 import { useEffect, useRef, useState } from 'react';
 import {MdSearch} from 'react-icons/md';
import './App.css';
import News from './Components/News';

function App() {

  const[newsList,setNewsList]=useState([]);
  const[query,setQuery]=useState('tesla');

  const topicsTags = [
    'Trending',
    'India',
    'Sports',
    'Business',
    'Entertainment',
    'Technolgy'
  ]

  const date=new Date();
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();

  const apiKey='4ad114c217bb45fe9849927b85196b64';
  const apiUrl=`https://newsapi.org/v2/everything?q=${query}&from=${year}-${month}-${day}&sortBy=publishedAt&apiKey=${apiKey}`;

  const queryInputRef=useRef(null);

  useEffect(()=>{
      fetchData(); 
  },[query]);

  async function fetchData() {
    try
    {
      const response=await fetch(apiUrl);
      const jsonData=await response.json();
  
      setNewsList(jsonData.articles);
    }catch(e){
        console.lof(e,'erorr ocurred!!!');
    }

  }

  function handleSubmit(event){
    event.preventDefault();
      const queryValue=queryInputRef.current.value;
      queryInputRef.current.value='';
      setQuery(queryValue);
  }

  function handleClick(event){
    event.preventDefault();
    setQuery(event.target.value);
  }

  

  
  return (
    <div className="container">
      <div className='nav-bar'>
          {
            topicsTags.map((item)=>{
              return(
                <>
                    <input className="news-topic-link" onClick={handleClick} type="submit" value={item}/>
                </>
              )
            })
          }
          

      </div>
      <form className='search' onSubmit={handleSubmit}>
          <MdSearch className='search-icon' size='1.3em'/> 
          <input  
            className='search-area'
            type="text" 
            ref={queryInputRef}
            placeholder='search here...'/>
            <input className="btn-submit" onClick={handleSubmit} type="submit" value="Submit"/>
      </form>
      <div className='news-list-container'>
        <div className="news-list">
            {newsList.map((news)=>{
              return <News key={news.url} news={news}/>
            })}
        </div> 
      </div>
    </div>
  );
}

export default App;
