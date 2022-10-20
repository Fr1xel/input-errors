import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import "./log-in.css";

const LogIn = () => {
  const [postErr, setPostErr] = useState("");
  const [logingInFinished, setLogingInFinished] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const submitHandler = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, data)
      .then((res) => {
        localStorage.setItem("userCredentials", JSON.stringify(res.data));
        setLogingInFinished(true);
      })
      .catch((err) => {
        setPostErr(err.response.data.message);
      });
    reset();
  };

  return logingInFinished ? (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <div className="big-boy to-center">
      <h1 className="login-header">Prijavi se</h1>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit(submitHandler)}>
          <h2 className="login-subtitle">Email</h2>
          <input
            className="login-input"
            style={errors.email?.message ? { border: "1px solid red" } : {}}
            {...register("email")}
            placeholder="example@gmail.com"
            required
          />
          {errors.email?.message ? (
            <p className="error-message">{errors.email?.message}</p>
          ) : (
            <></>
          )}
          <h2 className="login-subtitle">Password</h2>
          <input
            className="login-input"
            style={errors.password?.message ? { border: "1px solid red" } : {}}
            {...register("password")}
            type={"password"}
            placeholder="Password"
            required
          />
          {errors.email?.message ? (
            <p className="error-message">{errors.password?.message}</p>
          ) : (
            <></>
          )}
          {postErr ? <p className="error-message">{postErr}</p> : <></>}
          <input className="login-submit-button" type={"submit"} />
          <a className="white-color" href="/sign-in">
            Create A New Account
          </a>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
