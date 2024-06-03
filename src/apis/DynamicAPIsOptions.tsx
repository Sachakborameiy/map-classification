import React, { useEffect, useState } from 'react'

const DynamicAPIsOptions = () => {
    const [values,setValues]=useState([])
    const [options,setOptions]=useState()
    
    useEffect(()=>{
     fetch("http://127.0.0.1:8000/api/company/").then((data)=>data.json()).then((val)=>setValues(val))
    },[])
    
    console.log(values,"values")
  return (
    <div>
    return(
        <div>
            <select onChange={(e)=>setOptions(e.target.value)}>
                {
                    values.map((opts,i)=><option key={i}>{opts.name}</option>)
                }
            </select>
            <h1>{options}</h1>
        </div>
    );
}
    </div>
  )
}

export default DynamicAPIsOptions
