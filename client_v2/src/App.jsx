import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CreateEvent from './pages/CreateEvent'
import NotFound from './pages/NotFound'
import { EventDetails } from './pages/EventDetalis'
import { LogoExogames } from './components/LogoExogames'
import { LogoGlobant } from './components/LogoGlobant'
import {ButtonContainer} from './components/ButtonContainer'
import {ButtonUserContainer} from './components/ButtonUserContainer'

function App() {


  return (

    <>
      <header>
        <LogoExogames />
      </header>
      <main>
        <Routes>
          <Route exact path='/' element={<> <ButtonContainer /> <LandingPage /></>} />
          <Route exact path='/events' element={<> <ButtonContainer /> <LandingPage /></>} />
          <Route exact path='/venues' element={<> <ButtonContainer /> <LandingPage /></>} />
          <Route exact path='/competitors' element={<> <ButtonContainer /> <LandingPage /></>} />
          <Route exact path='/users' element={<> <ButtonUserContainer /> </>} />
          <Route path="/create_event" element={<> <ButtonUserContainer /> <CreateEvent /></>} />
          <Route path="/create_competitor" element={<> <ButtonUserContainer /> </>} />
          <Route exact path='/event/:id' element={<> <ButtonContainer /> < EventDetails /></>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <LogoGlobant />
      </footer>
    </>
  )
}

export default App
