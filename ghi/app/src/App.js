import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import HatForm from './HatForm';
import HatsList from './HatsList';
import Nav from './Nav';
import ShoeForm from './ShoeForm';
import ShoesList from './ShoesList';

function App(props) {
  if (props === undefined) {
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
          <Route path="shoes">
            <Route path="new" element={<ShoeForm />} />
            <Route path="" element={<ShoesList shoes={props.shoes}/>}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
