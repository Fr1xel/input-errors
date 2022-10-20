import "./products.css";

const Products = (props) => {
  const { products } = props;
  return (
    <div className="products-wrapper special-flex g-4 row">
      {products.data
        ? products.data.data.map((product) => {
            return (
              <div className="mx-lg-3 mx-1 product-div p-3" key={product.id}>
                <img
                  className="img-fluid product-image"
                  src={product.image}
                  alt=""
                />
                <h5>{product.name}</h5>
              </div>
            );
          })
        : 0}
    </div>
  );
};

export default Products;
