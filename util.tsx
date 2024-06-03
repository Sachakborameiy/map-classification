import axios from "axios";
export const fetchData = async (url:string, data:any,config:config,cb:Function,setNexSelect?:Function) => {
    try {
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // };
      var response;
      if(config.method == "POST") {
        console.log(data,'data')
         response = await axios.post(url, data, config.headers);
      } else{
         response = await axios.get(url);
      }
     
      // const response = await axios.get('http://127.0.0.1:8100/province_city');
      let restData = config.resName ?  response.data[config.resName] : response.data;
      setNexSelect && setNexSelect(restData[0].name.split('*')[0])
      cb(restData);
    //   setLoading(false);
    } catch (err) {
      console.log(err);
    //   setError('Failed to fetch data');
    //   setLoading(false);
    }
  }; 