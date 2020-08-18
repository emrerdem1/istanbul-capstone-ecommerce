import React from "react";
import ProductCard from "../layout/productCard/ProductCard";
import { Row } from "react-bootstrap";
import { MOCK_DATABASE } from "../common/MockDatabase";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { HOME, PRODUCTS } from "../../containers/Route.paths";

const TEXT = "products";

export default function Products() {
  // We don't want to use a dynamic path finder like useRouteMatch because we are having this component in HomePage as well.
  // In that case, it would render the `path` and `url` as `/` which will not work in our favour.

  const { pathname } = useLocation();
  let cutPathAfterSlash = `${pathname.slice(12)} / ${TEXT}`;

  const sectionTitle =
    pathname === HOME || pathname === PRODUCTS ? TEXT : cutPathAfterSlash;

  return (
    <div className="productsSectionContainer">
      <h1 className="productsTitle">{sectionTitle}</h1>
      <Row>
        {MOCK_DATABASE.map((info, index) => (
          <ProductCard info={info} index={index} />
        ))}
      </Row>
    </div>
  );
}
