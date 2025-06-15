import React from 'react';
import '../styles/about.scss';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About MyBlog</h1>

      <p className="about-paragraph">
        <strong>Naihati Locals</strong> is a personal blogging platform built and maintained by <strong>Reshmi</strong>, 
        a Computer Science graduate (B.Tech CSE, 2025) from JIS College of Engineering, Kalyani, West Bengal.
      </p>

      <p className="about-paragraph">
        This platform allows users to write, publish, and share blog posts with ease. It includes features 
        like user authentication, personalized profiles, blog CRUD operations, and a responsive design using 
        modern technologies like React, Node.js, MongoDB, and SCSS.
      </p>

      <p className="about-paragraph">
        MyBlog was created to explore full-stack development and provide a clean yet powerful space for 
        sharing knowledge, experiences, and thoughts online. It reflects Reshmi’s passion for elegant UI, 
        logical backend architecture, and secure web practices.
      </p>

      <p className="about-paragraph">
        If you'd like to collaborate, share feedback, or connect for future opportunities, feel free to reach out.
      </p>

      <a href="mailto:reshmigupta1111@gmail.com" className="about-button contact-button">
        📧 Contact Me
      </a>
    </div>
  );
};

export default About;
