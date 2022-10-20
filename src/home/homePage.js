import axios from "axios"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {Routes, Route, Navigate} from "react-router-dom"
import LoadingSpinner from "../spinner/spinner"
import Products from "./products/products"

const HomePage = () => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials"))
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState({})
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getUser = async() => {
            const data = await axios.get(`https://api.enovaapp.com/profiles/${userCredentials.id}`,
            {
                headers:{
                    "Authorization": `Bearer ${userCredentials.token}`
                }
            }
            )
            .catch((err)=>{console.log(err)})
            if(data){
                setUser(data.data)
                setIsLoaded(true)
            }
        }
        getUser()
    }, [])

    useEffect(() => {
        const getProducts = async() => {
           const products = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`).catch(err => console.log(err))
           if(products){
            setProducts(products)
           }
        }
        getProducts()
    }, [])

    return(
        userCredentials ? 
        products ? 
        <InfiniteScroll
        dataLength={products.data.data} //This is important field to render the next data
        next={fetchTopMovies}
        scrollThreshold="200px"
        hasMore={true}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={fetchTopMovies}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        >
            <Products products = {products}/>
        </InfiniteScroll>
        : <LoadingSpinner />
     :
     <Routes>
        <Route path="*" element={<Navigate to="/log-in" />} />
     </Routes>
    )
}

export default HomePage