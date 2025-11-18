/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 21 Apr 2025
 * Time: 3:01 PM
 * Email: mdmehedihasanroni28@gmail.com
 */

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
