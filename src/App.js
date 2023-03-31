import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
// import UpdateEmployee from './components/UpdateEmployee';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
          <div className="container">
            <Routes> 
              <Route path='/' exact element={<ListEmployeeComponent/>}></Route>
              <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
              <Route path='/add-employee/:id' element={<CreateEmployeeComponent/>}></Route>
              <Route path='/view-employee/:id' element={<ViewEmployeeComponent/>}></Route>
              {/* <Route path='/update-employee/:id' element={<UpdateEmployee/>}></Route> */}
            </Routes>
          </div>
          <FooterComponent></FooterComponent>
      </Router>
    </div>
  );
}

export default App;
