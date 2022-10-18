import "./spinner.css"

const LoadingSpinner = () => {
    return (
        <div className="spinner">
          <img
            src={require("../assets/loading.gif")}
            className="spinner-img"
          ></img>
        </div>
    )
}

export default LoadingSpinner