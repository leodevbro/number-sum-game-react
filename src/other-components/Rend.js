import React from 'react';
import ReactDOM from 'react-dom';

function rend (Visual, containerID) {
    ReactDOM.render(
        <React.StrictMode>
          <Visual containerID={containerID} />
        </React.StrictMode>,
        document.getElementById(containerID)
    );
  }


export default rend;