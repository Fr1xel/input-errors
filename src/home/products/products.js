import "./products.css"

const Products = (props) => {
    const { products } = props;
   return(
        <div className="text-center">
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Energy</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


<h1 className="energy-title text-light">All Your ENERGY Prices In One Place</h1>
<i className="bi bi-arrow-down title-arrow-down"></i>

<div className="products-home">
<div className="container">
    <h1 className="products-title">Let's see the products of the day!</h1>
    <div className="products-wrapper special-flex g-4 row">
        {
            products.data?
            products.data.data.map(product => {
                return(
                    <div className="mx-lg-3 mx-1 product-div p-3">
                    <img className="img-fluid product-image" src={product.image} alt="" />
                    <h5>{product.name}</h5>
                    </div>
                )
             })
             : 0
        }
    </div>
    </div>
</div>
</div>
    )
}

export default Products