import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import HatForm from './HatForm';
import HatsList from './HatsList';
import Nav from './Nav';

function App(props) {
  if (props.hats === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="">
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="hats">
            <Route path="new" element={<HatForm />} />
            <Route
              path=""
              element={<HatsList hats={props.hats} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
