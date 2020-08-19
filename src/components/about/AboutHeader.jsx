import React from "react";
import aboutHero from "../../assets/img/aboutHero.jpg";
import "./style.scss";
import { useTranslation } from "react-i18next";

export default function AboutHeader() {
  const { t } = useTranslation();

  return (
    <div className="aboutHeader">
      <div className="aboutHeaderImgBox">
        <img src={aboutHero} alt="about page header" />
      </div>
      <div className="aboutLine"></div>
      <h1>{t("about.whoAreWe")}</h1>
      <p className="aboutDescription">{t("about.descripition")}</p>
    </div>
  );
}
