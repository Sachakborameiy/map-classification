"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProvinceCity {
  name: string;
}

const ProvinceList: React.FC = () => {
  const [data, setData] = useState<ProvinceCity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8100/province_city/');
        setData(response.data.province_city);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Provinces and Cities</h1>
      <select onChange={handleChange} defaultValue="">
        <option value="" disabled>Select a province</option>
        {data.map((item, index) => (
          <option key={index} value={item.name}>{item.name}</option>
        ))}
      </select>
      {selectedProvince && (
        <div>
          <h2>Selected Province/City</h2>
          <p>{selectedProvince}</p>
        </div>
      )}
    </div>
  );
};

export default ProvinceList;
