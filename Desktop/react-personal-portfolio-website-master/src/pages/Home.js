import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import GithubIcon from "@material-ui/icons/GitHub";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="about">
        <h2 style={{ color: 'pink'}}> Hello World! My name is Jessica</h2>
        <div className="prompt">
          <p>A software developer with a passion for learning and creating.</p>
          <a href="https://www.linkedin.com/in/jessica-bull-b9aab9253/">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/j-bull2003">
            <GithubIcon />
          </a>
        </div>
      </div>
      <div className="skills">
        <h1> Skills</h1>
        <ol className="list">
          <li className="item">
            <h2> Front-End</h2>
            <span>
              ReactJS, Redux, HTML, CSS, NPM
            </span>
          </li>
          <li className="item">
            <h2>Back-End</h2>
            <span>
              Django, Digital Ocean, Postgres, DBeaver
            </span>
          </li>
          <li className="item">
            <h2>Languages</h2>
            <span>JavaScript, Java, Python, TypeScript</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Home;
