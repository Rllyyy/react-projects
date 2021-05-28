  
import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  //fetch from Api
  const fetchJobs = async() => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  }

  //UseEffect
  useEffect(()=>{
    fetchJobs();
  }, [])

  if (loading){
    return (
      <section className="section loading">
      <h2>Loading...</h2>
      </section>
    );
  }
  //Do if loading is false
  const {company, dates, duties, title} = jobs[value];
  return(
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, index)=>{
            return (
              <button 
              // Add second css class to button if the index is equal to the value. Circuit operator
              className={`job-btn ${index===value ? "active-btn":""}`}
              key={job.id} 
              onClick={()=>setValue(index)} >
                {job.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index)=>{
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"/>
                <p>
                  {duty}
                </p>
              </div>
            )
          })}
        </article>
      </div>
      
    </section>
    
  ); 
}

export default App;