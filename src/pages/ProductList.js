import React, { useEffect } from "react";
import { Row, Col, Pagination, Form, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

import { products } from "../data/products";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

export default function ItemList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";

  const pageParam = Number(searchParams.get("page") || 1);

  const currentPage =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const pageSize = 3;

  const categories = [
    ...new Set(
      products.map((item) => item.category).filter(Boolean)
    ),
  ];

  const updateParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        value === "all" ||
        value === "default" ||
        (key === "page" && Number(value) === 1)
      ) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    setSearchParams(nextParams);
  };

  const changeSearch = (value) => {
    updateParams({
      search: value,
      page: 1,
    });
  };

  const changeCategory = (value) => {
    updateParams({
      category: value,
      page: 1,
    });
  };

  const changeSort = (value) => {
    updateParams({
      sort: value,
      page: 1,
    });
  };

  const filteredItems = products.filter((item) => {
    const matchName = item.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchCategory =
      category === "all" || item.category === category;

    return matchName && matchCategory;
  });

  if (sort === "asc") {
    filteredItems.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sort === "desc") {
    filteredItems.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage !== safePage) {
      updateParams({ page: safePage });
    }
  }, [currentPage, safePage]);

  const handlePageChange = (nextPage) => {
    updateParams({ page: nextPage });
  };

  const displayedItems = filteredItems.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  return (
    <div className="container mt-4">
      <Row className="g-2 mb-3">
        <Col xs={12} md={6}>
          <SearchBar
            value={search}
            onChange={changeSearch}
          />
        </Col>

        <Col xs={12} md={3}>
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={changeCategory}
          />
        </Col>

        <Col xs={12} md={3}>
          <Form.Select
            value={sort}
            onChange={(e) => changeSort(e.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="asc">Tên A - Z</option>
            <option value="desc">Tên Z - A</option>
          </Form.Select>
        </Col>
      </Row>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-4">
        <div>
          <span>Tổng: {filteredItems.length}</span>
          {" | "}
          <small>
            Trang: {safePage}/{totalPages}
          </small>
        </div>

        {filteredItems.length > 0 && (
          <Pagination className="mb-0">
            <Pagination.Prev
              disabled={safePage === 1}
              onClick={() => handlePageChange(safePage - 1)}
            >
              Previous
            </Pagination.Prev>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((number) => (
              <Pagination.Item
                key={number}
                active={number === safePage}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </Pagination.Item>
            ))}

            <Pagination.Next
              disabled={safePage === totalPages}
              onClick={() => handlePageChange(safePage + 1)}
            >
              Next
            </Pagination.Next>
          </Pagination>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center mt-4">
          Không tìm thấy sản phẩm.
        </p>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="mt-3"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {displayedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <Link
                    to={`/products/${item.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}