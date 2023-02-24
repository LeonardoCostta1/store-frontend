import React from 'react';

import'./style.css';

function Title({title}) {
  return <div className='title'>
    <div className='title_default'>{title}</div>
  </div>;
}

export default Title;