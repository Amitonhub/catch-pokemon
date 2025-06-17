import React from 'react';
import './styles/Loading.css';

const Loading = ({ name }) => (
  <div className="status-box">
    <h2>Loading {name}... (xxx)</h2>
    <div className="dots">● ● ●</div>
  </div>
);

export default Loading;
