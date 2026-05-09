import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from '../context/AuthContext';

const Auth = () => {
    const [ mode, setMode ] = useState("signup");
    const {signUp} = useContext(AuthContext);

    const {
        register, 
        handleSubmit, 
        formState: {errors},
    } = useForm();


    function onSubmit (data) {
        alert('signed up');
        signUp(data.email, data.password);
    }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                {...register("email", {
                  required: "Email is required!",
                })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Password should have atleast 6 charachters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password should have a max of 12 characters.",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <button className="btn btn-primary btn-large" type="submit">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                You already have an account?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Log in
                </span>
              </p>
            ) : (
              <p>
                Dont have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth