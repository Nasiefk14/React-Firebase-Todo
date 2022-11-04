import { Route, Routes } from 'react-router-dom'
import Login from "./components/Login";
import Todos from './components/Todos';

function App() {
  return (
    <div>
      <h2>Welcome ^_^</h2>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path='/Todos' element={<Todos />} />
        </Routes>
    </div>
  );
}

export default App;
