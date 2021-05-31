import logo from './logo.svg';
import './App.css';
import history from './router/history';
import { BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';


function App() {
  return (
      <div className="App">

        <BrowserRouter history={history}>
          <Switch>
            <Redirect exact from="/" to="/" />

          </Switch>
        </BrowserRouter>

      </div>
  );
}

export default App;
