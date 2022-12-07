import React, { useState } from "react";

import Img from './Img.jsx'
import "./search.css";
const Search = () => {
    const [img, setimg] = useState("");
    const inputE = (e) => {
        setimg(e.target.value)
    }
  return (
    <><div className="search">
      <h1>Hello , Search image by name</h1>
      <div className="input">
        <input type={'text'} placeholder="type..." onChange={inputE} value={img}></input>
          </div>
          <div className="image">
              {img===""?<><h3 style={{textAlign:'center'}}>Type Above To Search Image....  waiting....</h3></>:<Img userInput={img }/>}
              
          </div></div>
    </>
  );
};

export default Search;
