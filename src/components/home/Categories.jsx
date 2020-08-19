import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./categories.scss";
import sportImg from "../../assets/img/dumbbell.jpg";
import glassesImg from "../../assets/img/glasses.jpg";
import setUpImg from "../../assets/img/setup.jpg";
import shoesImg from "../../assets/img/shoes.jpg";
import sterhoscopeImg from "../../assets/img/sterhoscope.jpg";
import NutritionImg from "../../assets/img/supplements.jpg";
import selfCareimg from "../../assets/img/selfCare.jpg";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SLIDER_SETTINGS = {
  centerMode: true,
  centerPadding: "40px",
  autoplay: false,
  autoplaySpeed: 10000,
  speed: 1000,
  arrows: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  dots: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

export default function Categories() {
  const { t } = useTranslation();
  const CATEGORIES_INFO = [
    {
      name: t("homepage.categories.sports"),
      img: sportImg,
    },
    {
      name: t("homepage.categories.glasses"),
      img: glassesImg,
    },
    {
      name: t("homepage.categories.setUp"),
      img: setUpImg,
    },
    {
      name: t("homepage.categories.shoes"),
      img: shoesImg,
    },
    {
      name: t("homepage.categories.health"),
      img: sterhoscopeImg,
    },
    {
      name: t("homepage.categories.nutrition"),
      img: NutritionImg,
    },
    {
      name: t("homepage.categories.personalCare"),
      img: selfCareimg,
    },
  ];

  const Category = (props) => {
    return (
      <div className="card">
        <img alt={props.category.name} src={`${props.category.img}`} />
        <p className="cardTitle">{props.category.name.toLocaleUpperCase()}</p>
      </div>
    );
  };

  return (
    <div className="categoriesContainer">
      <h1 className="categoryTitle">
        {t("homepage.categories.categoryHeader")}
      </h1>

      <Slider {...SLIDER_SETTINGS} className="cardWrapper">
        {CATEGORIES_INFO.map((cat) => (
          <NavLink to={`/categories/${cat.name.toLowerCase()}`} key={cat.name}>
            <Category category={cat} className="row" />
          </NavLink>
        ))}
      </Slider>
    </div>
  );
}
