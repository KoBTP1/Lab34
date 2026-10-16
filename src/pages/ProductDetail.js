import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import { products } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = products.find((current) => String(current.id) === id);

  return (
    <div>
      <Card>
        <Card.Body>
          <Button
            variant="outline-secondary"
            className="mb-3"
            onClick={() => navigate(-1)}
          >
            Quay lại danh sách
          </Button>
          <Row>
            <Col md={5}>
              <img
                src="https://placehold.co/600x300"
                alt={item.name}
                className="img-fluid"
              ></img>
            </Col>
            <Col md={7}>
              <div className="d-flex flex-wrap justify-content-between gap-2">
                <h1 className="h3">{item.name}</h1>
              </div>
              <Row className="g-3">
                <div>ID: {item.id}</div>
                <div>Danh mục: {item.category}</div>
                <div>Giá: {Number(item.price).toLocaleString("vi-VN")} đ</div>
                <div>
                  ---------------------------------------------------------------
                </div>
                <p>Mô tả: {item.description || "Chưa có mô tả."}</p>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
