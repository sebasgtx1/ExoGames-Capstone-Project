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
import { ButtonContainerLoged } from './components/button_containers/ButtonContainerLoged'
import { UpdateEventCreation } from './pages/UpdateEventCreation'

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
          <Route path='/event/:id' element={<> <ButtonContainer /> < EventDetails /></>} />
          <Route path='/competitor/:id' element={<> <ButtonContainer /> < CompetitorDetails /></>} />
          <Route path='/venue/:id' element={<> <ButtonContainer /> < VenueDetails /></>} />

          {/* Landing page with Login */}
          <Route path='/events/:user_id' element={<> <ButtonContainerLoged user_id="4" /> <LandingPage /></>} />
          <Route path='/venues/:user_id' element={<> <ButtonContainerLoged user_id="4" /> <VenuesPage /></>} />
          <Route path='/competitors/:user_id' element={<> <ButtonContainerLoged user_id="4" /> <CompetitorsPage/></>} />

          {/* Detail pages with login */}
          <Route path='/event/:user_id/:id' element={<> <ButtonContainer user_id="4"/> < MyEventDetails /></>} />
          <Route path='/competitor/:user_id/:id' element={<> <ButtonContainer user_id="4"/> < MyCompetitorDetails /></>} />
          <Route path='/venue/:user_id/:id' element={<> <ButtonContainer user_id="4"/> < MyVenueDetails/></>} />

          <Route path='/event/:id/:user_id' element={<> <ButtonContainerLoged /> < EventDetails /></>} />
          <Route path='/competitor/:id/:user_id' element={<> <ButtonContainerLoged /> < CompetitorDetails /></>} />
          <Route path='/venue/:id/:user_id' element={<> <ButtonContainerLoged /> < VenueDetails /></>} />

          {/* User views*/}
          <Route path='/user' element={<> <ButtonUserContainer user_id="4"/> < MyEventsPage user_id="4" /></>} />
          <Route path="/my_events" element={<> <ButtonUserContainer user_id="4" />  <MyEventsPage user_id="4" /> </>} />
          <Route path="/my_competitors" element={<> <ButtonUserContainer user_id="4" /> <MyCompetitorsPage user_id="4" /></>} />
          <Route path="/my_venues" element={<> <ButtonUserContainer user_id="4" /> <MyVenuesPage user_id="4" /></>} />

          {/* create event flow*/}
          <Route path="/create_event" element={<> <ButtonUserContainer user_id="4"/> <CreateEvent /></>} />
          <Route path="/create_match/:event_id" element={<> <ButtonUserContainer user_id="4"/> <CreateMatch user_id="4" /></>} />
          
          {/* create venue flow*/}
          <Route path="/create_venue" element={<> <ButtonUserContainer user_id="4"/> <CreateVenue /></>} />

          {/* create competitor flow*/}
          <Route path="/create_competitor" element={<> <ButtonUserContainer user_id="4"/> <CreateCompetitor /></>} />

          {/* update flow*/}
          <Route path="/update_create_event/:id" element={<> <ButtonUserContainer user_id="4"/> <UpdateEventCreation /></>} />
          <Route path="/update_event/:id" element={<> <ButtonUserContainer user_id="4"/> <UpdateEvent /></>} />
          <Route path="/update_competitor/:id" element={<> <ButtonUserContainer user_id="4"/> <UpdateCompetitor /></>} />
          <Route path="/update_venue/:id" element={<> <ButtonUserContainer user_id="4"/> <UpdateVenue /></>} />
          <Route path="/update_match/:id" element={<> <ButtonUserContainer user_id="4"/> <UpdateMatch /></>} />

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
