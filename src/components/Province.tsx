"use client"

// components/ProvinceCityList.tsx
import React, { useEffect, useState } from 'react';

interface ProvinceCity {
  id: number;
  name: string;
  // Add other fields as necessary
}

export default function Home() {
  const [data, setData] = useState<ProvinceCity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchProvincesAndCities();
        setData(result);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Province and City List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProvinceCityList;
