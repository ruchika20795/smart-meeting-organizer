import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddMeeting from './containers/AddMeeting';
import Home from './containers/Home';
import { getAllBuildingsQuery } from './utils/queries';
import { useQuery } from '@apollo/client';
import Loader from './components/Loader';

function App() {

    const { loading, data } = useQuery(getAllBuildingsQuery);

    if (loading) {
        return <Loader fullHeight />
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home data={data.Buildings} />
                </Route>
                <Route path="/add-meeting">
                    <AddMeeting buildingsList={data.Buildings} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
