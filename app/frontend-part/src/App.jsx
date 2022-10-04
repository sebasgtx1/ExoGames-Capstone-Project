import { LogoExogames } from "./components/LogoExogames";
import { LogoGlobant } from "./components/LogoGlobant";
import { ButtonContainer } from "./components/ButtonContainer";
import { Grid } from "./components/Grid";
import { GridEvents } from "./components/GridEvents";
import { GridVenues } from "./components/GridVenues";
import { GridCompetitors } from "./components/GridCompetitors";
import { GridUsers } from "./components/GridUsers";
import { PageNotFound } from "./components/PageNotFound";
import { CardDetails } from "./pages/CardDetails";
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';

export function App() {
    return (
        <Router>
            <div>
                <header>
                    <LogoExogames />
                    <ButtonContainer />
                </header>
                <main>
                <Routes>
                    <Route exact path='/' element={< Grid />}></Route>
                    <Route exact path='/venues' element={< GridUsers />}></Route>
                    <Route exact path='/competitors' element={< GridCompetitors />}></Route>
                    <Route exact path='/login' element={< GridCompetitors />}></Route>
                    <Route exact path='/events/:eventId' element={< CardDetails />}></Route>
                    <Route exact path='*' element={< PageNotFound />}></Route>
                </Routes>
                </main>
                <footer>
                    <LogoGlobant />
                </footer>
            </div>
        </Router>
    );
}