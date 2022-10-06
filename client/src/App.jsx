import { LogoExogames } from "./components/LogoExogames";
import { LogoGlobant } from "./components/LogoGlobant";
import { ButtonContainer } from "./components/ButtonContainer";
import { ButtonUserContainer } from "./components/ButtonUserContainer";
import { GridEvents } from "./components/GridEvents";
import { GridVenues } from "./components/GridVenues";
import { GridCompetitors } from "./components/GridCompetitors";
import { PageNotFound } from "./components/PageNotFound";
import { CardEventDetails } from "./pages/CardEventDetails";
import { CardVenueDetails } from "./pages/CardVenueDetails";
import { CardCompetitorDetails } from "./pages/CardCompetitorDetails";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

export function App() {
    return (
        <Router>
            <body>
                <header>
                    <LogoExogames />
                </header>
                <main>
                <Routes>
                    <Route exact path='/' element={<>< ButtonContainer />< GridEvents /></>}></Route>
                    <Route exact path='/events' element={<>< ButtonContainer />< GridEvents /></>}></Route>
                    <Route exact path='/venues' element={<>< ButtonContainer />< GridVenues /></>}></Route>
                    <Route exact path='/competitors' element={<>< ButtonContainer />< GridCompetitors /></>}></Route>
                    <Route exact path='/users' element={<>< ButtonUserContainer /></>}></Route>
                    <Route exact path='/events/:eventId' element={< CardEventDetails />}></Route>
                    <Route exact path='/venues/:venueId' element={< CardVenueDetails />}></Route>
                    <Route exact path='/competitors/:competitorId' element={< CardCompetitorDetails />}></Route>
                    <Route path='/*' element={< PageNotFound />}></Route>
                </Routes>
                </main>
                <footer>
                    <LogoGlobant />
                </footer>
            </body>
        </Router>
    );
}