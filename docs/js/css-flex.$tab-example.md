```jsx

import React from 'react';
export default () => {
  const containerStyle = {
    fontSize: '24px',
    display: 'flex',
    border: 'solid 1px red',
    width: '300px',
    height: '300px',
    flexWrap: 'wrap',
    margin: 'auto',
  };
  const itemStyle = {
    backgroundColor: 'aqua',
    border: 'solid 1px yellow',
    height: '50px',
    width: '98px',
    flex: '0 0 auto',
  };
  return (
    <div style={containerStyle}>
      <div style={itemStyle}>paultion</div>
      <div style={itemStyle}>p</div>
      <div style={itemStyle}>nerix</div>
      <div style={itemStyle}>paultion</div>
      <div style={itemStyle}>p</div>
      <div style={itemStyle}>nerix</div>
      <div style={itemStyle}>paultion</div>
      <div style={itemStyle}>pfdxcl</div>
      <div style={itemStyle}>nerix</div>
    </div>
  );
};
```
