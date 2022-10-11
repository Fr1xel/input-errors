import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Form = () => {
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
    console.log(data);
    reset();
  };

  return (
    <>
      <h1>Prijavi se</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <br />
        <input
        style={errors.email?.message ? {border: "1px solid red"} : {}}
          {...register("email")}
          placeholder="example@gmail.com"
          required
        />
        <p style={{color:"red"}}>{errors.email?.message}</p>
        <br />
        <input
        style={errors.password?.message ? {border: "1px solid red"} : {}}
          {...register("password")}
          type={"password"}
          placeholder="Password"
          required
        />
        <p style={{color:"red"}}>{errors.password?.message}</p>
        <br />
        <input type={"submit"} />
      </form>
    </>
  );
};

export default Form;
