import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LogIn from './pages/LogIn/LogIn';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import './App.css';

function App() {
  return (
      <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={LogIn} />
                </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;
