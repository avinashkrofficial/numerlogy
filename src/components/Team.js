import React from 'react';

const Team = () => (
  <>
    <div className="heading-container">
      <h1 className="team-heading">Meet the Team</h1>
    </div>
    <div className="about-us">
      <div className="card-container">
        {[
          { name: 'Vanshika Vats', img: '/vanshika.jpg' },
          { name: 'Ananyaa Gupta', img: '/ananyaa.jpg' },
          { name: 'Avinash Kumar', img: '/Avinash.jpg' },
          { name: 'Alankrit Shukla', img: '/allu.png' },
        ].map((member, index) => (
          <div key={index} className="profile-card">
            <img src={member.img} alt={member.name} className="profile-img" />
            <div className="info">
              <h2>{member.name}</h2>
              <p>Full Stack Developer</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Team;