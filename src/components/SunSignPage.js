import React, { useState } from 'react';

const SunSignPage = () => {
  const [dob, setDob] = useState('');
  const [zodiac, setZodiac] = useState(null);

  const findZodiacSign = async () => {
    if (!/^\d{2}-\d{2}$/.test(dob)) {
      alert('Please enter DOB in DD-MM format');
      return;
    }

    const [day, month] = dob.split('-').map(Number);
    const inputDate = new Date(2000, month - 1, day); // use fixed year

    try {
      const res = await fetch('/zodiac_signs.json');
      const signs = await res.json();

      const matched = signs.find(sign => {
        const [start, end] = sign.date_of_birth.split(' to ');
        const startDate = new Date(2000, parseInt(start.split('-')[0]) - 1, parseInt(start.split('-')[1]));
        const endDate = new Date(2000, parseInt(end.split('-')[0]) - 1, parseInt(end.split('-')[1]));

        if (startDate <= endDate) {
          return inputDate >= startDate && inputDate <= endDate;
        } else {
          // For Capricorn (spans year end)
          return inputDate >= startDate || inputDate <= endDate;
        }
      });

      if (matched) {
        setZodiac(matched);
      } else {
        setZodiac(null);
        alert('No matching zodiac sign found');
      }
    } catch (err) {
      console.error('Error loading zodiac data:', err);
    }
  };

  return (
    <div className="background-container">
      <h1 className="main-heading">Know Your Sun Sign</h1>
      <input
        type="text"
        placeholder="Enter your DOB (DD-MM)"
        className="input-field"
        value={dob}
        onChange={e => setDob(e.target.value)}
      />
      <button className="reveal-button" onClick={findZodiacSign}>Reveal Sun Sign</button>

      {zodiac && (
        <div className="info-box" style={{ marginTop: '30px' }}>
          <div className="info-text">
            <h2>{zodiac.sign} ({zodiac.symbol})</h2>
            <p><strong>Element:</strong> {zodiac.element}</p>
            <p><strong>Ruling Planet:</strong> {zodiac.ruling_planet}</p>
            <p><strong>Strengths:</strong> {zodiac.strengths.join(', ')}</p>
            <p><strong>Weaknesses:</strong> {zodiac.weaknesses.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SunSignPage;
