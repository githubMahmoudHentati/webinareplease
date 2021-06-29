import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import history from './router/history';
import { BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';
import ShowVideos from "./showVideos/showVideos";
import FormDirectVideo from "./formDirectVideo/FormDirectVideo";
import PackagePayement from "./PackagePayement/PackagePayement";
import {Connexion} from "./connexion/connexion";
import {SignUp} from "./signUp/signUp";
import {ContactClient} from "./contactClient/contactClient";
import {CompteSettings} from "./compteSettings/compteSettings";
import Calendar from "./Calendar/Calendar";
import {useSelector} from "react-redux";
import {GraphQLFetchData} from "./utils/grapqhQL/graphQLFetchData";
import {ForgetPassword} from "./forgetPassword/forgetPassword";
import {ResetPassword} from "./resetPassword/resetPassword";
import Error from "./utils/components/Error";

function App() {
  const {verificationToken}= GraphQLFetchData()
  const credentialsValues = useSelector((state) => state.Reducer)

  return (
      <div className="App">
        {verificationToken&&
        <BrowserRouter history={history}>
          <Switch>
            <Redirect exact from="/" to="/connexion" />
            < Route exact path='/showVideos' component={ShowVideos} />
              <Route exact path='/FormDirectVideo' component={FormDirectVideo} />
              <Route exact path='/PackagePayement' component={PackagePayement}/>
              <Route exact path='/connexion'  > {!credentialsValues.appState.loggedIn?<Connexion/>:<Redirect exact  to="/showVideos" />}</Route>
              <Route exact path='/signUp' > {!credentialsValues.appState.loggedIn?<SignUp/>:<Redirect exact  to="/showVideos" />}</Route>
              <Route exact path='/forgot-password' > {!credentialsValues.appState.loggedIn?<ForgetPassword/>:<Redirect exact  to="/showVideos" />}</Route>
              <Route exact path='/reset-password' > {!credentialsValues.appState.loggedIn?<ResetPassword/>:<Redirect exact  to="/showVideos" />}</Route>
              <Route exact path='/contactClient' component={ContactClient}/>
              <Route exact path='/compteSettings' > {!credentialsValues.appState.loggedIn?<Redirect exact  to="/connexion" /> :<CompteSettings/>}</Route>
              <Route exact path='/calendar' component={Calendar} />
              <Route path={"*"} component={Error}/>
          </Switch>
        </BrowserRouter>
        }
      </div>
  );
}

export default App;
