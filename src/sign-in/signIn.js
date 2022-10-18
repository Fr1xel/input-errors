import "./sign-in.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const SignIn = () => {
  const [postError, setPostError] = useState("");
  const [registerDone, setRegisterDone] = useState(false);
  const schema = yup.object().shape({
    type: yup.string().required(),
    name: yup.string().required(),
    lastName: yup.string().required(),
    telephoneNumber: yup.string(),
    city: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const registerSubmitHandle = async (data) => {
    const registerData = await axios
      .post("https://api.enovaapp.com/signup", {
        type: data.type,
        firstName: data.name,
        lastName: data.lastName,
        address: data.city,
        phone: data.telephoneNumber,
        email: data.email,
        password: data.password,
      })
      .catch((error) => {
        setPostError(error.response.data.message);
      });
    if (registerData) {
      localStorage.setItem(
        "userCredentials",
        JSON.stringify(registerData.data)
      );
      setRegisterDone(true);
      setPostError("");
      reset();
    }
  };

  return registerDone ? (
    <Routes>
        <Route path="*" element={<Navigate to="/" />} />
     </Routes>
  ) : (
    <div className="big-boy">
      <h1 className="register-title">Registriraj se</h1>
      <div className="wrapper">
        <div className="register-body">
          <form onSubmit={handleSubmit(registerSubmitHandle)}>
            <h2 className="form-subtitle">Ja sam</h2>
            <input
              type={"radio"}
              {...register("type")}
              value={"PHYSICAL_PERSON"}
            />
            <h5 className="lica-display">Fizičko lice</h5>
            <input
              type={"radio"}
              {...register("type")}
              value={"LEGAL_ENTITY"}
            />
            <h5 className="lica-display">Pravno lice</h5>
            {errors.type?.message ? (
              <p className="error-message">Please Select Your Account Type</p>
            ) : (
              <></>
            )}
            <div className="register-form">
              <div className="left-form">
                <div className="register-esentials">
                  <div className="flex-row">
                    <div className="box">
                      <h3>Ime *</h3>
                      <input
                        {...register("name")}
                        className="input-text"
                        placeholder="Ime"
                      />
                      {errors.name?.message ? (
                        <p className="error-message">{errors.name.message}</p>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="box">
                      <h3>Prezime *</h3>
                      <input
                        {...register("lastName")}
                        className="input-text"
                        placeholder="Prezime"
                      />
                      {errors.lastName?.message ? (
                        <p className="error-message">
                          {errors.lastName.message}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex-row">
                    <div className="box">
                      <h3>Grad</h3>
                      <input
                        {...register("city")}
                        className="input-text"
                        placeholder="Grad"
                      />
                      {errors.city?.message ? (
                        <p className="error-message">{errors.city.message}</p>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="box">
                      <h3>Telefon</h3>
                      <input
                        {...register("telephoneNumber")}
                        className="input-text"
                        placeholder="Telefon"
                      />
                      {errors.telephoneNumber?.message ? (
                        <p className="error-message">
                          {errors.telephoneNumber.message}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-form">
                <h2 className="email-title">E-Mail *</h2>
                <input
                  {...register("email")}
                  className="input-required"
                  placeholder="E-Mail"
                />
                {errors.email?.message ? (
                  <p className="error-message">{errors.email.message}</p>
                ) : (
                  <></>
                )}
                <h2 className="email-title">Password *</h2>
                <input
                  type={"password"}
                  {...register("password")}
                  className="input-required"
                  placeholder="Password"
                />
                {errors.password?.message ? (
                  <p className="error-message">{errors.password.message}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <input className="submit-button" type={"submit"} />
            {postError ? <p className="error-message">{postError}</p> : <></>}
            <a className="white-color" href="/log-in">Already Logged In?</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
