import logo from './logo.svg';
import './App.css';
import history from './router/history';
import { BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';
import ShowVideos from "./showVideos/showVideos";
import  {FormDirectVideo} from "./formDirectVideo/formDirectVideo";
import PackagePayement from "./PackagePayement/PackagePayement";
import {Connexion} from "./connexion/connexion";
import {SignUp} from "./signUp/signUp";
import {ContactClient} from "./contactClient/contactClient";
import {CompteSettings} from "./compteSettings/compteSettings";
import Calendar from "./Calendar/Calendar";

function App() {
  return (
      <div className="App">

        <BrowserRouter history={history}>
          <Switch>
            <Redirect exact from="/" to="/showVideos" />
              <Route exact path='/showVideos' component={ShowVideos} />
              <Route exact path='/FormDirectVideo' component={FormDirectVideo} />
              <Route exact path='/PackagePayement' component={PackagePayement}/>
              <Route exact path='/connexion' component={Connexion}/>
              <Route exact path='/signUp' component={SignUp}/>
              <Route exact path='/contactClient' component={ContactClient}/>
              <Route exact path='/compteSettings' component={CompteSettings}/>
              <Route exact path='/calendar' component={Calendar} />
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
