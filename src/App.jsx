import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Home from './components/Home';
import {Toaster} from 'react-hot-toast';
import Dashboard from './components/Dashboard';

const App = () => {

  return (
    <>

      <div><Toaster/></div>

      <Router>

        <Routes>

          <Route path='/' element={<Home/>} />
          <Route path='/dashboard' element={<Dashboard/>} />

        </Routes>

      </Router>
    </>
  )
}

export default App
