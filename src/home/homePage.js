import axios from "axios"
import { useEffect, useState } from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import LoadingSpinner from "../spinner/spinner"

const HomePage = () => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials"))
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState({})
    console.log(user)
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
    return(
        userCredentials ? 
        isLoaded ? <h1>Hi, {user.firstName} {user.lastName}</h1>
        : <LoadingSpinner />
     :
     <Routes>
        <Route path="*" element={<Navigate to="/log-in" />} />
     </Routes>
    )
}

export default HomePage