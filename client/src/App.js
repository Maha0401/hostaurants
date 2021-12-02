import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import ChefHome from './pages/ChefHome/ChefHome';
import Home from './pages/Home/Home';

function App() {
  return (
      <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/chef" component={ChefHome} />
                </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;
