import React from "react";
import utils from "../other-components/math-utils";

const StarsDisplay = props => {

    return(
        <>
            {utils.range(1, props.stars).map(item => (
                <div key={item} className="star"></div>
            ))}
        </>
    )
  };


  export default StarsDisplay;