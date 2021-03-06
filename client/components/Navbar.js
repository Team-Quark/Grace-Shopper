import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { AppBar, Toolbar, Button} from '@material-ui/core';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }} style={{backgroundColor: "#F7F1F1", borderRadius:"10px"}}>
      <img src='logo.png' width={250}/>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Toolbar>
              <Button component={Link} to="/shoes">Shoes</Button>
              <Button component={Link} to="/cart">Cart</Button>
              <Button component={Link} to="/orders">Order History</Button>
              {isAdmin ? (
                <>
                  <Button component={Link} to="/createshoe">Add New Shoe</Button>
                  <Button component={Link} to="/users">Admin Features</Button>
                </>
                ) : (
                ''
              )}
              <Button onClick={handleClick}>Logout</Button>
          </Toolbar>
          {/* <Link to="/home">Home</Link>
          <Link to="/orders">Your Orders</Link>
          <Link to="/cart">Cart</Link>

          <Link to="/shoes">Shoes</Link> */}

          {/* {isAdmin ? (
            <Link className="navigator" to="/createshoe">
              Create Shoe
            </Link>
          ) : (
            ''
          )}
          {isAdmin ? <Link to="/users">Users</Link> : ''}
          <Link to="/users/settings">Edit Profile</Link> */}

          {/* <a href="#" onClick={handleClick}>
            Logout
          </a> */}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
            <Toolbar>
              <Button component={Link} to="/shoes">Shoes</Button>
              <Button component={Link} to="/cart">Cart</Button>
              <Button component={Link} to="/login">Login</Button>
              <Button component={Link} to="/signup">Signup</Button>
            </Toolbar>
            {/* <Link to="/home">Home</Link>
            <Link to="/shoes">Shoes</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link> */}
        </div>
      )}
    </AppBar>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
