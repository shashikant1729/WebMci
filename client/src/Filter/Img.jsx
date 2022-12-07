import React from "react";  

const Img = (props) => {
    const imgSrc = `https://source.unsplash.com/900x450/?{${props.userInput}}`
    return (
        <>
            <img alt = 'image' src = {imgSrc}/>
        </>
    )
}

export default Img;