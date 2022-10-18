import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import "./form.css";

const Form = () => {
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
      .post("https://api.enovaapp.com/login", data)
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
    <>
      <h1>Prijavi se</h1>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit(submitHandler)}>
          <br />
          <input
            style={errors.email?.message ? { border: "1px solid red" } : {}}
            {...register("email")}
            placeholder="example@gmail.com"
            required
          />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
          <br />
          <input
            style={errors.password?.message ? { border: "1px solid red" } : {}}
            {...register("password")}
            type={"password"}
            placeholder="Password"
            required
          />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
          {postErr ? <p style={{ color: "red" }}>{postErr}</p> : <></>}
          <br />
          <input type={"submit"} />
          <a className="white-color" href="/sign-in">
            Create A New Account
          </a>
        </form>
      </div>
    </>
  );
};

export default Form;
