import React from "react";
import { useSelector } from "react-redux";
import CartDetail from "../cartdetail/CartDetail";
import { Row, Col, Button, Container } from "react-bootstrap";
import "../cartdetail/CartDetail.scss";
import { useHistory } from "react-router-dom";

export default function ShoppingList() {
  const productsData = useSelector((state) => state.productsData);
  const history = useHistory();

  const cartDetailHeaderRow = (
    <Row className="cartDetailHeader">
      <Col className="cartDetailTitle">Shopping Card</Col>
      <Col className="backToShoppingWrapper">
        <Button
          className="backToShopping"
          onClick={() => history.push("/products")}
        >
          Back to Shopping!
        </Button>
      </Col>
    </Row>
  );

  const titleHeaderRow = (
    <Row className="titleHeader">
      <Col
        xl={6}
        lg={6}
        md={6}
        sm={6}
        xs={6}
        className="productsHeader titleHeaderItem"
      >
        Products
      </Col>
      <Col className="quantityHeader titleHeaderItem">Quantity</Col>
      <Col className="priceHeader titleHeaderItem">Price</Col>
    </Row>
  );

  const emptyCart = (
    <span className="emptyCartWarning">
      Your shopping cart feels so lonely!
    </span>
  );

  return (
    <div className="shoppingListItemContainer">
      <Container className="cartDetailWrapper cartOutsideWrapper">
        {cartDetailHeaderRow}
        {titleHeaderRow}
      </Container>
      <Row className="cartItemDetailMapping">
        {productsData.length
          ? productsData.map((info, index) => (
              <CartDetail info={info} index={index} />
            ))
          : emptyCart}
      </Row>
    </div>
  );
}
