import axios from "axios";
export const fetchData = async (url:string, data:any,config:config,cb:Function,setNexSelect?:Function,
  setError?: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
      var response;
      if(config.method == "POST") {
        console.log(data,'data')
         response = await axios.post(url, data, config.headers);
      } else{
         response = await axios.get(url);
      }
     
      let restData = config.resName ?  response.data[config.resName] : response.data;
      // setNexSelect && setNexSelect(restData[0].name.split('*')[0])
      cb(restData);
    } catch (err) {
      console.log(err);
      if (setError) {
        setDefaultResultOrder(err.message);
      }
    }
  }; 