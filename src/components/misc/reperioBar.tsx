import React from 'react'
const image = require('../../assets/reperio-color-band.png');

const ReperioBar = (props: any) => (
    <div className="r-bar-container" style={{height: `${props.height}`}}>
        <img className="r-bar" src={image} />
    </div>
);

export default ReperioBar;