// Purpose: Sets the routes for the different pages that can be viewed in the app. When the page is visited it renders the component.

import { Route } from "react-router-dom";
import React, { Component } from "react";
// import the Home component
import Home from "./home/Home";
// import the Welcome component
import Welcome from "./welcome/Welcome";
// imports register component
import Register from "./auth/Register";
// import Login component
import Login from "./auth/Login";
// import CreelList component
import CreelList from "./creel/CreelList";
// import FishList component
import FishList from "./fish/FishList";
// import Profile components
import ProfileList from "./profile/ProfileList";
import ProfileCard from "./profile/ProfileCard";

export default class ApplicationViews extends Component {
  // checks to see if the user is logged in and stored in session storage
  isUserAuthenticated = () => sessionStorage.getItem("activeUser") !== null;
  // converts the activeUser value in session storage to an integer
  activeUser = () => parseInt(sessionStorage.getItem("activeUser"));
  // if true it's the active user's data, if false it will only display other users info
  userpage = true;

  render() {
    return (
      <React.Fragment>
        {/* route user to Register page and injects the Register component */}
        <Route
          path="/register"
          render={props => {
            return (
              <Register
                {...props}
                changeLogoutState={this.props.changeLogoutState}
              />
            );
          }}
        />
        {/* route user to login page and injects the Login component */}
        <Route
          path="/login"
          render={props => {
            return (
              <Login
                {...props}
                changeLogoutState={this.props.changeLogoutState}
              />
            );
          }}
        />

        {/* route if the user is authenticated render the Home Component otherwise render the Welcome comopnent */}
        <Route
          exact
          path="/"
          render={props => {
            if (this.isUserAuthenticated()) {
              return (
                <Home
                  // pass activeUser, userpage, userId, and props into the Component
                  activeUser={this.activeUser}
                  userpage={this.userpage}
                  userId={parseInt(props.match.params.userId)}
                  {...props}
                />
              );
            } else {
              return <Welcome />;
            }
          }}
        />

        {/* route to render a specific CreelList component for a user */}
        <Route
          exact
          path="/creels"
          render={props => {
            if (this.isUserAuthenticated()) {
              return (
                <CreelList
                  // pass activeUser, userpage, and props into the Component
                  userpage={this.userpage}
                  activeUser={this.activeUser}
                  {...props}
                />
              );
            } else {
              return <Welcome />;
            }
          }}
        />

        {/* Route that renders the details of a creel with the FishList component */}
        <Route
          exact
          path="/creels/:creelId(\d+)"
          render={props => {
            return (
              <FishList
                // pass userpage, activeUser, creelId, & props into FishList
                userpage={this.userpage}
                activeUser={this.activeUser}
                creelId={parseInt(props.match.params.creelId)}
                {...props}
              />
            );
          }}
        />

        {/* route that renders the ProfileList component */}
        <Route
          exact
          path="/users"
          render={props => {
            return (
              <ProfileList
                userpage={this.userpage}
                // passes activeUser and props into the component
                activeUser={this.activeUser}
                {...props}
              />
            );
          }}
        />

        {/* route that renders the ProfileCard component of a specific user. */}
        <Route
          exact
          path="/users/:userId(\d+)"
          render={props => {
            return (
              <ProfileCard
                // pass activeUser, userId, and props into the component
                activeUser={this.activeUser}
                // parses userId to an integer
                userId={parseInt(props.match.params.userId)}
                {...props}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
