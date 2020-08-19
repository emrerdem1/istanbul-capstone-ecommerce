import React, { useState, useRef } from "react";
import { auth } from "../../config/firebaseConfig";
import db from "../../config/firebaseConfig";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Spinner from "react-bootstrap/Spinner";
import {
  logIn,
  logOut,
  logInError,
  popUpStatus,
} from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ALERT_OPEN_SECONDS = 2500;

const LogInForm = () => {
  const { isLoggedIn, isAuthFailed, isAuthSucceeded } = useSelector(
    (state) => state.authentication
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [authErrorTargetUi, setAuthErrorTargetUi] = useState(null);
  const authAlertContainerUi = useRef(null);
  const [isValidating, setIsValidating] = useState(false);
  const VALIDATING_TEXT = t("homepage.loginform.validate");

  const userLogout = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      dispatch(logOut());
      dispatch(logInError(false, false));
      dispatch(popUpStatus(false));
    });
  };

  const userLogin = async (e) => {
    e.preventDefault();
    setIsValidating(true);
    let userLogin;
    try {
      userLogin = await auth.signInWithEmailAndPassword(
        emailValue,
        passwordValue
      );
    } catch (error) {
      dispatch(logInError(true, false));
      setIsValidating(false);
      setTimeout(() => dispatch(logInError(false, false)), ALERT_OPEN_SECONDS);
    }

    if (userLogin) {
      await db
        .collection("users")
        .doc(userLogin.user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setIsValidating(false);
            dispatch(logIn(doc.data().name, doc.data().isAdmin));
            dispatch(popUpStatus(true));
            dispatch(logInError(false, true));
            setTimeout(
              () => dispatch(logInError(false, false)),
              ALERT_OPEN_SECONDS
            );
          } else {
            dispatch(logInError(true, false));
            setIsValidating(false);
            setTimeout(
              () => dispatch(logInError(false, false)),
              ALERT_OPEN_SECONDS
            );
          }
        })
        .catch((error) => {
          dispatch(logInError(true, false));
          setIsValidating(false);
          setTimeout(
            () => dispatch(logInError(false, false)),
            ALERT_OPEN_SECONDS
          );
        });
    }
  };

  const handleClick = (e) => {
    setAuthErrorTargetUi(e.target);
  };

  const emailGroup = (
    <Form.Group controlId="formGroupEmail" className="formGroupEmail">
      <Form.Label className="formInputLabel">
        {t("homepage.loginform.email")}
      </Form.Label>
      <div className="formInputWrapper">
        <i className="fas fa-user-circle"></i>
        <Form.Control
          type="email"
          placeholder={t("homepage.loginform.emailPlaceholder")}
          className="formInput"
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </div>
    </Form.Group>
  );

  const passwordGroup = (
    <Form.Group controlId="formGroupPassword">
      <Form.Label className="formInputLabel">
        {t("homepage.loginform.password")}
      </Form.Label>
      <div className="formInputWrapper">
        <i className="fas fa-key"></i>
        <Form.Control
          type="password"
          placeholder={t("homepage.loginform.passwordPlaceholder")}
          className="formInput"
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </div>
    </Form.Group>
  );

  const authErrorUi = (
    <Overlay
      show={isAuthFailed}
      target={authErrorTargetUi}
      placement="bottom"
      container={authAlertContainerUi.current}
      containerPadding={20}
    >
      <Popover>
        <Popover.Title as="h2" className="authFailedText">
          {t("homepage.loginform.loginFailed")}
        </Popover.Title>
      </Popover>
    </Overlay>
  );

  const authSuccessUi = (
    <Overlay
      show={isAuthSucceeded}
      target={authErrorTargetUi}
      placement="bottom"
      container={authAlertContainerUi.current}
      containerPadding={20}
    >
      <Popover>
        <Popover.Title as="h2" className="authSucceededText">
          {t("homepage.loginform.loginSuccess")}
        </Popover.Title>
      </Popover>
    </Overlay>
  );

  const handleOnSubmit = (e) => {
    if (isLoggedIn) {
      userLogout(e);
    } else {
      userLogin(e);
    }
  };

  const validationButton = (
    <Button variant="info" size="md" className="loginButton" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
        className="validationSpinner"
      />
      {VALIDATING_TEXT}
    </Button>
  );

  const loginButton = (
    <Button
      variant="info"
      size="md"
      className="loginButton"
      type="submit"
      onClick={(e) => handleClick(e)}
    >
      {isLoggedIn
        ? t("homepage.loginform.logout")
        : t("homepage.loginform.login")}
    </Button>
  );

  return (
    <>
      <Col className="signupForm">
        <Form onSubmit={handleOnSubmit} ref={authAlertContainerUi}>
          <fieldset disabled={isAuthSucceeded}>
            {emailGroup}
            {passwordGroup}
            {isValidating ? validationButton : loginButton}
            {isAuthFailed && authErrorUi}
            {isAuthSucceeded && authSuccessUi}
          </fieldset>
        </Form>
      </Col>
    </>
  );
};

export default LogInForm;
