import React, { useState, useEffect } from 'react';
import 'common/css/reset.less';

const List = props => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count => count + 1);
    setTimeout(() => {
      setList(new Array(props.length ?? 20000).fill().map(l => ({ value: props.text })));
    }, 500);
  }, [props.text]);
  return [
    <p>{'我被触发了' + count + '次'}</p>,
    <ul>
      {list.map(item => (
        <li>{item.value}</li>
      ))}
    </ul>,
  ];
};

const App = () => {
  const [text, setText] = useState("喵爸");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <input value={text} onChange={handleChange}/>
      <List text={text} length={500}/>
    </div>
  );
};

export { App as default, List };
