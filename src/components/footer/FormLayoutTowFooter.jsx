import React from 'react';
import ImageView from "../viewer/ImageView.jsx";

const FormLayoutTwoFooter = ({title = "This product is powered by", url = "/assets/defai_logo.svg", style}) => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            {title} <ImageView
            url={url}
            style={{width: "103px", height: "103px", ...style}}/>
        </div>
    )
};

export default FormLayoutTwoFooter;