import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../spinner/spinner";
import "./marketing.css";

const Marketing = () => {
  const location = useLocation();
  const token = location?.pathname?.split("/")[2];
  const [product, setProduct] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await axios
        .post(`${process.env.REACT_APP_BASE_URL}/public/products/${token}`)
        .catch((err) => {
          console.log(err);
        });
      if (data) {
        console.log(data);
        setProduct(data.data);
        setLoaded(true);
      }
    };
    fetchProduct();
  }, []);
  return loaded ? (
    <>
    <Link to={"/"}>
    <i className="bi bi-arrow-left arrow-product-back fixed-top"></i>
  </Link>
    <div className="d-flex justify-content-center">
      <div className="product-info-wrapper bg-light margin-top-product color-energy">
        <h1 className="product-name pt-5">{product?.name}</h1>
        <div className="product-content d-flex justify-content-around col-12 mt-3">
          <img
            src={product?.image}
            className="img-fluid product-image max-width"
            alt={""}
          />
          <div className="product-details col-6 d-flex justify-content-center align-items-center flex-column">
            <table className="text-center max-width">
              <tr>
                <td className="fw-bold">Kategorija</td>
                <td>
                  {product?.category?.title ? product.category.title : "/"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Tip Proizvoda</td>
                <td>
                  {product?.subCategory?.title
                    ? product.subCategory.title
                    : "/"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Proizvođać</td>
                <td>{product?.manufacturer ? product.manufacturer : "/"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Jačina proizvoda</td>
                <td>{product?.power ? product.power + "W" : "/"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Vijek trajanja</td>
                <td>{product?.lifespan ? product.lifespan + " god." : "/"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Efikasnost proizvoda</td>
                <td>
                  {product?.efficiency ? product.efficiency + " struje" : "/"}
                </td>
              </tr>
            </table>
            <h3 className="mt-5 product-price">{product?.price} KM</h3>
          </div>
        </div>
        <div className="product-info-details col-12 p-5">
          <h2>Opis Produkta:</h2>
          <p className="lead">{product?.description}</p>
        </div>
      </div>
    </div>
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default Marketing;
