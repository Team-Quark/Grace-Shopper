import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import AllShoes from './components/AllShoes';
import { me } from './store';
import SingleShoe from './components/singleShoe';
import Cart from './components/Cart';
import Admin from './components/Admin';
import UpdateShoe from './components/UpdateShoe';
import AddShoe from './components/AddShoe';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/shoes" component={AllShoes} />
            <Route exact path="/shoes/:id" component={SingleShoe} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/shoes/:id/update" component={UpdateShoe} />
            <Route exact path="/createshoe" component={AddShoe} />

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={AllShoes} />
            <Route exact path="/shoes/:id" component={SingleShoe} />
            <Route exact path="/shoes" component={AllShoes} />
            <Route path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />

            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
