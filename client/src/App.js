import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Importing components
import Gallery from './components/gallery/Gallery'
import AddPainting from './components/addPainting/AddPainting'
import EditPainting from './components/editPainting/editPainting'
import Navbar from './components/navbar/Navbar'
import Modal from './components/modal/Modal'

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Gallery} />
          <Route path='/add' component={AddPainting} />
          <Route path='/:id' component={EditPainting} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
