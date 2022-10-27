import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { CreateEvent } from './pages/CreateEvent'
import { NotFound } from './pages/NotFound'
import { EventDetails } from './pages/EventDetalis'
import { LogoExogames } from './components/logos/LogoExogames'
import { LogoGlobant } from './components/logos/LogoGlobant'
import { ButtonContainer } from './components/button_containers/ButtonContainer'
import { ButtonUserContainer } from './components/button_containers/ButtonUserContainer'
import { MyEventsPage } from './pages/MyEventsPage'
import { CreateCompetitor } from './pages/CreateCompetitor'
import { CreateVenue } from './pages/CreateVenue'
import { CompetitorsPage } from './pages/CompetitorsPage'
import { VenuesPage } from './pages/VenuesPage'
import { CompetitorDetails } from './pages/CompetitorDetalis'
import { VenueDetails } from './pages/VenueDetalis'
import { MyCompetitorsPage } from './pages/MyCompetitorsPage'
import { MyVenuesPage } from './pages/MyVenuesPage'
import { MyEventDetails } from './pages/MyEventDetalis'
import { MyCompetitorDetails } from './pages/MyCompetitorDetalis'
import { MyVenueDetails } from './pages/MyVenueDetalis'
import { CreateMatch } from './pages/CreateMatch'
import { UpdateEvent } from './pages/UpdateEvent'
import { UpdateCompetitor } from './pages/UpdateCompetitor'
import { UpdateVenue } from './pages/UpdateVenue'
import { UpdateMatch } from './pages/UpdateMatch'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { UpdateEventCreation } from './pages/UpdateEventCreation'
import { LandingUserPage } from './pages/LandingUserPage'
import { VenuesUserPage } from './pages/VenuesUserPage'
import { CompetitorsUserPage } from './pages/CompetitorsUserPage'

function App() {


  return (
    <>
      <header>
        <LogoExogames />
      </header>
      <main>
        <Routes>

          {/* Default routes*/}
          <Route path='/' element={<> <ButtonContainer /> <LandingPage /></>} />
          <Route path="*" element={<NotFound />} />

          {/* Landing page without login */}
          <Route path='/events' element={<> <ButtonContainer /> <LandingPage /></>} />
          <Route path='/venues' element={<> <ButtonContainer /> < VenuesPage /></>} />
          <Route path='/competitors' element={<> <ButtonContainer /> <CompetitorsPage /></>} />

          {/* Detail pages without login */}
          <Route path='/event/:id' element={<> < EventDetails /></>} />
          <Route path='/competitor/:id' element={<>  < CompetitorDetails /></>} />
          <Route path='/venue/:id' element={<>  < VenueDetails /></>} />

          {/* Landing page with Login */}
          <Route path='/events/:user_id' element={<LandingUserPage/>} />
          <Route path='/venues/:user_id' element={<VenuesUserPage/>} />
          <Route path='/competitors/:user_id' element={<CompetitorsUserPage/>} />

          {/* Detail pages with login */}
          <Route path='/my_event/:user_id/:id' element={<> < MyEventDetails /></>} />
          <Route path='/my_competitor/:user_id/:id' element={<>  < MyCompetitorDetails /></>} />
          <Route path='/my_venue/:user_id/:id' element={<> < MyVenueDetails/></>} />

          <Route path='/event/:id/:user_id' element={<> < EventDetails /></>} />
          <Route path='/competitor/:id/:user_id' element={<> < CompetitorDetails /></>} />
          <Route path='/venue/:id/:user_id' element={<> < VenueDetails /></>} />

          {/* User views*/}
          <Route path="/my_events" element={<> <MyEventsPage/> </>} />
          <Route path="/my_competitors" element={<>  <MyCompetitorsPage /></>} />
          <Route path="/my_venues" element={<>  <MyVenuesPage /></>} />

          {/* create event flow*/}
          <Route path="/create_event" element={<> <CreateEvent/></>} />
          <Route path="/create_match/:event_id" element={<> <CreateMatch /></>} />
          
          {/* create venue flow*/}
          <Route path="/create_venue" element={<> <CreateVenue /></>} />

          {/* create competitor flow*/}
          <Route path="/create_competitor" element={<>  <CreateCompetitor /></>} />

          {/* update flow*/}
          <Route path="/update_create_event/:id" element={<>  <UpdateEventCreation /></>} />
          <Route path="/update_event/:id" element={<>  <UpdateEvent /></>} />
          <Route path="/update_competitor/:id" element={<>  <UpdateCompetitor /></>} />
          <Route path="/update_venue/:id" element={<>  <UpdateVenue /></>} />
          <Route path="/update_match/:id" element={<>  <UpdateMatch /></>} />

          {/* login / resgister */}
          <Route path="/login" element={<> <LoginPage /></>} />
          <Route path="/register" element={<> <RegisterPage /></>} />
        </Routes>

      </main>
      <footer>
        <LogoGlobant />
      </footer>
    </>
  )
}

export default App
