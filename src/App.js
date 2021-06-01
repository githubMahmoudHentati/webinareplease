import logo from './logo.svg';
import './App.css';
import history from './router/history';
import { BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';
import ShowVideos from "./showVideos/showVideos";
import  {FormDirectVideo} from "./formDirectVideo/formDirectVideo";


function App() {
  return (
      <div className="App">

        <BrowserRouter history={history}>
          <Switch>
            <Redirect exact from="/" to="/" />
              <Route exact path='/showVideos' component={ShowVideos} />
              <Route exact path='/FormDirectVideo' component={FormDirectVideo} />
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
