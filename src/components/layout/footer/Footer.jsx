import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import "./Footer.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="footerWrapper">
      <Row className="footerLinks">
        <Col xl={6} lg={6} md={6} sm={12} xs={12} className="footerLinksLogo">
          <div className="footerLogo"></div>
          <span className="footerMotto">{t("footer.motto")}</span>
        </Col>
        <Col xl={3} lg={3} md={4} sm={8} xs={8} className="footerLinksBlogs">
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/blog">{t("footer.blogPost1")}</NavLink>
          <NavLink to="/blog">{t("footer.blogPost2")}</NavLink>
        </Col>
        <Col xl={3} lg={3} md={2} sm={4} xs={4} className="footerLinksPages">
          <NavLink to="/">{t("homepage.navbar.menuHome")}</NavLink>
          <NavLink to="/products">{t("homepage.navbar.menuProducts")}</NavLink>
          <NavLink to="/about">{t("homepage.navbar.menuAbout")}</NavLink>
        </Col>
      </Row>
      <Row className="footerSeparator"></Row>
      <Row className="footerIconsCopyright">
        <Col className="footerIcons">
          <a
            href="https://www.twitter.com/"
            className="footerSocialIcon twitter"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://www.gmail.com/" className="footerSocialIcon google">
            <FontAwesomeIcon icon={faGoogle} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/"
            className="footerSocialIcon facebook"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.github.com/" className="footerSocialIcon github">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </Col>
        <Col className="footerCopyright">&copy; {t("footer.copyright")}</Col>
      </Row>
    </Container>
  );
};

export default Footer;
