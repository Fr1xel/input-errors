import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "../spinner/spinner";
import Products from "./products/products";
import "./products/products.css"

const HomePage = () => {
  const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState({});
  const [pageToken, setPageToken] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const data = await axios
        .get(`https://api.enovaapp.com/profiles/${userCredentials.id}`, {
          headers: {
            Authorization: `Bearer ${userCredentials.token}`,
          },
        })
        .catch((err) => {
          console.log(err);
        });
      if (data) {
        setUser(data.data);
        setIsLoaded(true);
      }
    };
    getUser();
  }, []);

  const getProducts = async () => {
    const products = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/products?token=${pageToken}`)
      .catch((err) => console.log(err));
    if (products) {
      setProducts(products);
      setPageToken(products.data.nextToken);
    }
  };

  const hasMoreProducts = () =>{
    if(products?.data){
        if(products.data.data.length === 30){
            return true
        }
        else{
            return false
        }
    }
    else {
        return true
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return userCredentials ? (
    products ? (
      <div className="text-center">
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Energy
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <h1 className="energy-title text-light">
          All Your ENERGY Prices In One Place
        </h1>
        <i className="bi bi-arrow-down title-arrow-down"></i>

        <div className="products-home">
          <div className="container">
            <h1 className="products-title">
              Let's see the products of the day!
            </h1>
              <InfiniteScroll
                dataLength={products.data ? products.data.data : 0} //This is important field to render the next data
                next={getProducts}
                scrollThreshold="500px"
                hasMore={hasMoreProducts()}
                endMessage={
                  <p className="text-center">
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                // below props only if you need pull down functionality
                refreshFunction={getProducts}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
              >
                <Products products={products} />
              </InfiniteScroll>
            </div>
        </div>
      </div>
    ) : (
      <LoadingSpinner />
    )
  ) : (
    <Routes>
      <Route path="*" element={<Navigate to="/log-in" />} />
    </Routes>
  );
};

export default HomePage;
