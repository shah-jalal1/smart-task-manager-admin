import React from 'react';
import {Spin} from 'antd';

const LoadingSuspense = ({height = "100%", width = "100%"}) => {

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        width
    }

    return (
        <div style={style}>
            <Spin size='large'/>
        </div>
    );
}

export default LoadingSuspense;
