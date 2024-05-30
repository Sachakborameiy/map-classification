// services/api.ts
 const fetchProvincesAndCities = async () => {
    const response = await fetch('http://localhost:8100/province_city/', {
      headers: {
        'Accept': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return response.json();
  };
  