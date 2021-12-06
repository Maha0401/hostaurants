import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import ChefHome from './pages/ChefHome/ChefHome';
import Home from './pages/Home/Home';
import Request from './pages/Request/Request'
import Booking from './pages/Booking/Booking';
import ViewChefMenu from './pages/ViewChefMenu/ViewChefMenu';
import ViewChefGallery from './pages/ViewChefGallery/ViewChefGallery';
import ViewChefAbout from './pages/ViewChefAbout/ViewChefAbout'

function App() {
  return (
      <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/login" exact component={LogIn} />
                    <Route path="/request" exact component={Request} />
                    <Route path='/book/:foodId/:chefId' exact component={Booking} />
                    
                    <Route path="/viewchef/about/:chefId" exact component={ViewChefAbout} />
                    <Route path="/viewchef/menu/:chefId" exact component={ViewChefMenu} />
                    <Route path="/viewchef/gallery/:chefId" exact component={ViewChefGallery} />

                    <Route path="/chef" exact component={ChefHome} />
                    <Route path="/chef/about" exact component={ChefHome} />
                    <Route path="/chef/menu" exact component={ChefHome} />
                    <Route path="/chef/gallery" exact component={ChefHome} />
                    
                </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;
