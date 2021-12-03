import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import ChefHome from './pages/ChefHome/ChefHome';
import Home from './pages/Home/Home';
import Request from './pages/Request/Request'

function App() {
  return (
      <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/login" exact component={LogIn} />
                    <Route path="/request" exact component={Request} />
                    <Route path="/chef" exact component={ChefHome} />
                </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;
