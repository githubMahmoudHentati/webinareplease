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
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./utils/grapqhQL/shemaGraphQL";
import {setAppSetLogin} from "./utils/redux/actions";

function App() {
  const [verificationToken, setVerificationToken] = useState(false);
  const dispatch = useDispatch()
  const token = localStorage.getItem('jwtToken')?localStorage.getItem('jwtToken'):'';
  console.log("token",token)
  const {loading:tokenVerification_loading, data: dataVerificationToken}
      = useQuery(graphQL_shema().tokenVerification, {
    fetchPolicy:  "cache-and-network",
    variables: { token : `Bearer ${token}`},
    onCompleted :async (data)=>{
      if (data.tokenverification.Code===200)
      {
        await dispatch(setAppSetLogin(localStorage.getItem('jwtToken')));
      }
      setVerificationToken(true)
    }
  })
  console.log("verificationToken",verificationToken)
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
              <Route exact path='/contactClient' component={ContactClient}/>
              <Route exact path='/compteSettings' > {!credentialsValues.appState.loggedIn?<Redirect exact  to="/connexion" /> :<CompteSettings/>}</Route>
              <Route exact path='/calendar' component={Calendar} />
          </Switch>
        </BrowserRouter>
        }
      </div>
  );
}

export default App;
