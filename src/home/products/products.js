import "./products.css";
import { Link } from "react-router-dom";

const Products = (props) => {
  const { products } = props;
  return (
    <div className="products-wrapper special-flex g-4 row">
      {products.map((product) => {
            return (
              <div className="mx-lg-3 mx-1 product-div p-3" key={product.id}>
                <Link to={`/products/${product.id}`}>
                <img
                  className="img-fluid product-image"
                  src={product.image}
                  alt=""
                />
                <h5>{product.name}</h5>
                </Link>
              </div>
            );
          })}
    </div>
  );
};

export default Products;
