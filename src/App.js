import './App.css';
import Main from './comp/main';
import {useState} from 'react';

function App() {
  const [on, setOn] = useState(true);
  const onToggle = () => setOn(s => !s);

  return (
    <div>
      {on && <Main/>}
      <button onClick={onToggle}>Toggle On/Off</button>
    </div>
  );
}

export default App;
