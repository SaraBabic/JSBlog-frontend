import React, {useEffect, useState} from 'react'
import Moment from 'moment';
import Navbar from './components/Navbar';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(()=> {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  Moment.locale('en');

  return (
    <div>
      <Navbar />
      {(typeof backendData === "undefined") ? (
        <p>Loading ... </p>
      ): (
        backendData.map((article, i) => (


          <div className="card mt-4" key={i}>
                  <div className="card-body">
                    <h4 className="card-title">{article.title}</h4>
                    <div className="card-subtitle text-muted mb-2">
                      {Moment(article?.createdAt)?.format('d MMM Y')}
                    </div>
                    <div className="card-text mb-2">{ article.description }</div>
                    <a href="articles/<%= article.slug %>" className="btn btn-primary">Read More</a>
                    <a href="articles/edit/<%= article.id %>" className="btn btn-info">Edit</a>
                    <form action="/articles/<%= article.id %>?_method=DELETE" method="POST" className="d-inline">
                      <button type="submit" className="btn btn-danger">Delete</button>
                    </form>
                  </div>
                </div>




        ))
      )}
    </div>
  )
}

export default App