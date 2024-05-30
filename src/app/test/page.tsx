"use client"

// pages/index.tsx
import React from 'react';
import ProvinceCityList from '../../components/Province';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Province and City Information</h1>
      <ProvinceCityList />
    </div>
  );
};

export default Home;
