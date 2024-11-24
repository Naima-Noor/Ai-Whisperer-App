import React from 'react';
import aboutus from './images/aboutus.jpeg';
const About = () => {
  return (
    <React.Fragment>
      {/* Shop Header */}
      <section id="shopheader" className="aboutheader" style={{
        backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg72UcyELV4fU_y7v5BU4OBtXyX291q-6QcA&usqp=CAU)',
        width: '100%',
        height: '40vh',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '44px',
        textAlign: 'center',
      }}>
        <h2>#KnowUs</h2>
        <p>“Remember the carefree days of childhood, when you didn’t feel guilty about eating mountains of cereal with questionable nutrition?”</p>
      </section>

      {/* About Section */}
      <section id="abouthead" className="section-p1" style={{ display: 'flex', alignItems: 'center', padding: '40px 88px' }}>
        <img src={aboutus} alt="" style={{
          width: '100%',
          height: '500px',
          objectFit: 'cover',
        }} />
        <div style={{ paddingLeft: '90px' }}>
          <h2 style={{color:'#3bb19b'}}>About Us</h2>
          <p>Welcome to AI Whisperer, where innovation meets integrity in text analysis. Our mission is to provide advanced solutions for text verification and analysis, ensuring authenticity and quality in every piece of content. 
          </p>
          <p>At AI Whisperer, we understand the growing importance of distinguishing between human-generated and AI-generated text in today's digital world. Our platform leverages cutting-edge technology to offer comprehensive text analysis, helping users maintain the highest standards of originality and clarity. Whether you're in education, research, journalism, or content creation, AI Whisperer is designed to meet your needs with precision and efficiency.
          </p>
          <p>Our team consists of experts in artificial intelligence, natural language processing, and software development, all dedicated to creating a reliable and user-friendly tool. We continuously innovate and improve our services to stay ahead of the curve, providing you with the best possible experience.
          </p>
        <p>  Join us on our journey to revolutionize text analysis and ensure the integrity of written content. With AI Whisperer, you can trust that your words are truly your own.</p>
        </div>
      </section>

      {/* Video Container */}
      <div className="video-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/UCHhdaqw8Hg?si=a1U0r9ATxmIIa8W5"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </React.Fragment>
  );
};

export default About;
