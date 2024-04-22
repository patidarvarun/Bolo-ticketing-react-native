import React, { useEffect, useState } from "react";
import styles from "../../styles/Login.module.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import client from "../api/lib/apollo-client";
import {
  CUSTOMER_LOGIN_API_KEY,
  GET_CUSTOMER_API_KEY,
  LOGIN_MUTATION,
} from "../api/lib/customers_graphql";
import { ApolloError } from "@apollo/client";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      validateForm();
    }
  }, [email, password, formSubmitted]);

  const validateEmail = (value: any) => {
    setEmailError("");
    if (!value) {
      setEmailError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Invalid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (value: any) => {
    setPasswordError("");
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleEmailChange = (e: any) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: any) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    return isEmailValid && isPasswordValid;
  };
  let userData: any;
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoader(true);
    const isValid = validateForm();
    if (isValid) {
      try {
        const data = await client.mutate({
          mutation: LOGIN_MUTATION,
          variables: {
            input: {
              email: email,
              password: password,
              requestedServices: "EMAIL",
            },
          },
        });
        if (data && data) {
          userData = {
            token: data?.data?.loginCustomer?.jwt,
            id: data?.data?.loginCustomer?.customerID?.ID,
            email: email,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        if (userData) {
          const response = await client.query({
            query: GET_CUSTOMER_API_KEY,
            variables: {
              input: {
                customerID: data?.data?.loginCustomer?.customerID?.ID,
              },
            },
          });
          if (response && response?.data) {
            const res = await client.mutate({
              mutation: CUSTOMER_LOGIN_API_KEY,
              variables: {
                input: {
                  apiKey: response?.data?.getCustomerAPIKeys[0]?.apiKey,
                  requestedServices: "TICKETING",
                },
              },
            });
            if (res && res?.data) {
              userData.api_token = res?.data?.loginApiKey?.jwt;
              userData.api_key = response?.data?.getCustomerAPIKeys[0]?.apiKey;
              localStorage.setItem("userData", JSON.stringify(userData));
              toast.success("Login Successfully!");
              setTimeout(() => {
                setLoader(false);
                window.location.replace("/ticketing");
              }, 2000);
            }
          }
        }
      } catch (error) {
        setLoader(false);
        if (error instanceof ApolloError) {
          const errorMessage = error.message; // Extract the error message
          toast.error("Invalid email or password");
        } else {
          // Handle other types of errors
          console.error("Unexpected Error:", error);
        }
      }
    } else {
      setLoader(false);
      console.log("Form is invalid. Please check your inputs.");
    }
  };

  return (
    <>
      <div className={styles.div}>
        <div className={styles.div7}>
          <div className={styles.div8}>
            <div className={styles.column}>
              <img
                loading="lazy"
                src="/login/login_img.png"
                className={styles.img2}
              />
            </div>
            <div className={styles.column2}>
              <div className={styles.div9}>
                <div className={styles.div10}>Sign in</div>
                <div className={styles.div11}>
                  If you have an account registered
                </div>
                <div className={styles.div12}>
                  You can &nbsp;
                  <span
                    style={{
                      fontWeight: "700",
                      color: "rgba(33, 182, 168, 1)",
                    }}
                  >
                    Login here !
                  </span>
                </div>
                <form onSubmit={handleLogin}>
                  <div className={styles.div13}>Email</div>
                  <div className="p-field">
                    <InputText
                      id="email"
                      type="email"
                      value={email}
                      placeholder="Example@email.com"
                      onChange={handleEmailChange}
                      className={`${styles.div14} ${
                        emailError && formSubmitted ? styles.inputError : ""
                      }`}
                    />
                  </div>
                  {emailError && formSubmitted && (
                    <small className="p-error">{emailError}</small>
                  )}
                  <div className={styles.div15}>Password</div>
                  <div className="p-field">
                    <InputText
                      id="password"
                      type="password"
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`${styles.div16} ${
                        passwordError && formSubmitted ? styles.inputError : ""
                      }`}
                    />
                  </div>
                  {passwordError && formSubmitted && (
                    <small className="p-error">{passwordError}</small>
                  )}
                  <br />
                  {!loader ? (
                    <Button
                      className={styles.div17}
                      label="Sign in"
                      type="submit"
                    />
                  ) : (
                    <Button
                      className={styles.div17}
                      label="Loading..."
                      type="submit"
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
