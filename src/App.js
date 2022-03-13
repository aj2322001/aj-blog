import Navbar from './navbar';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

function App() {
  const title = 'AJ Blog';
  return (
    <Router>
      <div className="App">
        <Navbar/> 
        <div className="content">
          <Switch> {/* will help to switch b/w different smoothly */}
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/create'>
              <Create/>
            </Route>
            <Route path='/blogs/:id'> {/*any thing having `:` before it can have a dynamic value*/}
              <BlogDetails/>
            </Route>
            <Route path='*'>
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
