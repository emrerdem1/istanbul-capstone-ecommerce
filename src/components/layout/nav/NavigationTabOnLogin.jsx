import React from "react";
import "./NavigationTabOnLogin.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, popUpStatus } from "../../redux/actions/index";
import { useTranslation } from "react-i18next";

// This is the user dropdown panel that only can be seen by logged in users.
const NavigationTabOnLogin = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const isAdmin = useSelector((state) => state.authentication.isAdmin);
  const dispatch = useDispatch();
  const loggingOut = () => {
    dispatch(logOut());
    if (isAdmin) {
      history.push("/");
    }
    dispatch(popUpStatus(true));
  };

  const profilePageListItem = (
    <NavLink to="/profile">
      <Col className="loggedInBoxItems profilePageItemContainer">
        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
          <i className="fas fa-id-card-alt profilePageIcon"></i>
        </Col>
        <Col>{t("homepage.loggedInTab.profile")}</Col>
      </Col>
    </NavLink>
  );

  const adminPageListItem = (
    <NavLink to="/dashboard">
      <Col className="loggedInBoxItems profilePageItemContainer">
        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
          <i className="fas fa-user-shield adminPageIcon"></i>
        </Col>
        <Col>Admin Panel</Col>
      </Col>
    </NavLink>
  );

  const logOutListItem = (
    <Col className="loggedInBoxItems logOutIconContainer" onClick={loggingOut}>
      <Col xl={2} lg={2} md={2} sm={2} xs={2}>
        <i className="fas fa-window-close logOutIcon"></i>
      </Col>
      <Col>{t("homepage.loggedInTab.logout")}</Col>
    </Col>
  );

  return (
    <Container className="loggedInBox">
      {isAdmin ? adminPageListItem : profilePageListItem}
      {logOutListItem}
    </Container>
  );
};

export default NavigationTabOnLogin;
