/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 21 Apr 2025
 * Time: 2:58 PM
 * Email: mdmehedihasanroni28@gmail.com
 */

import React from 'react';

const ImageView = ({url, style, onClick, cursor = "pointer"}) => {

    if (url) {
        return <img
            style={{...style, cursor}}
            src={url}
            onClick={onClick ? onClick : null}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/images/no_image_icon.png"
            }}
            alt="no_image"
        />
    }

    return <img style={style} src="/assets/images/no_image_icon.png" alt="no_image"/>

}

export default ImageView;
