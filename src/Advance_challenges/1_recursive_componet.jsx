import React, { useState } from 'react';

const Recursive_componet = ({depth}) => {
    if(depth===0) {
        return null;
    }
     
    return (
       <>
       <h1>hello</h1>
      
        <Recursive_componet depth={depth-1}/>
       
       </>
    );
};

export default Recursive_componet;

