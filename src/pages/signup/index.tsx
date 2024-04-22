import React, { useEffect, useState } from "react";
import styles from "../../styles/Signup.module.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { ApolloError } from "@apollo/client";
import client from "../api/lib/apollo-client";
import {
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_API,
} from "../api/lib/customers_graphql";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      validateForm();
    }
  }, [email, password, confirmPassword, formSubmitted]);

  const validateEmail = (value: any) => {
    setEmailError("");
    if (!value) {
      setEmailError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Invalid email address");
      return false;
    }
    return true;
  };

  const validatePassword = (value: string) => {
    setPasswordError("");

    if (!value) {
      setPasswordError("Password is required");
      return false;
    }

    // Minimum length of 8 characters
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }

    // Maximum length of 12 characters (optional)
    if (value.length > 12) {
      setPasswordError("Password must be at most 12 characters long");
      return false;
    }

    // Regular expression for at least one number, uppercase, lowercase, and special character
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;
    if (!regex.test(value)) {
      setPasswordError(
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character!"
      );
      return false;
    }

    return true;
  };

  const validateConfirmPassword = (value: any) => {
    setConfirmPasswordError("");
    if (!value) {
      setConfirmPasswordError("Confirm Password is required");
      return false;
    } else if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
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

  const handleConfirmPasswordChange = (e: any) => {
    const { value } = e.target;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    return isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);
    const isValid = validateForm();
    setLoader(true);
    if (isValid) {
      try {
        const data = await client.mutate({
          mutation: CREATE_CUSTOMER,
          variables: {
            input: {
              email: email,
              password: password,
            },
          },
        });
        if (data && data?.data) {
          const id: any = data?.data?.createCustomer?.id;
          if (id) {
            const res = await client.mutate({
              mutation: CREATE_CUSTOMER_API,
              variables: {
                input: {
                  customerID: parseInt(id),
                },
              },
            });
            toast.success("Account create successfully!");
            setLoader(false);
            router.push("/login");
          }
        }
      } catch (error) {
        setLoader(false);
        if (error instanceof ApolloError) {
          const errorMessage = error.message; // Extract the error message
          console.log("err", errorMessage);
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
                src="/login/signup_img.png"
                className={styles.img2}
                alt="Signup"
              />
            </div>
            <div className={styles.column2}>
              <div className={styles.div9}>
                <div className={styles.div10}>Sign up for Free</div>
                <div className={styles.div11}>
                  If you don’t have an account registered
                </div>
                <div className={styles.div12}>
                  You can &nbsp;
                  <span
                    style={{
                      fontWeight: "700",
                      color: "rgba(33, 182, 168, 1)",
                    }}
                  >
                    Register here !
                  </span>
                </div>
                <form onSubmit={handleSignup}>
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
                  <div className={styles.div17}>Confirm Password</div>
                  <div className="p-field">
                    <InputText
                      id="confirmPassword"
                      type="password"
                      placeholder="At least 8 characters"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className={`${styles.div18} ${
                        confirmPasswordError && formSubmitted
                          ? styles.inputError
                          : ""
                      }`}
                    />
                  </div>
                  {confirmPasswordError && formSubmitted && (
                    <small className="p-error">{confirmPasswordError}</small>
                  )}
                  <br />
                  {!loader ? (
                    <Button
                      className={styles.div19}
                      label="Sign Up"
                      type="submit"
                    />
                  ) : (
                    <Button
                      className={styles.div19}
                      label="Loading..."
                      type="submit"
                    />
                  )}
                </form>
                <br />
                <div className={styles.div11}>
                  Already have an account?{" "}
                  <span className={styles.divLoginlink}>
                    <Link href="/login">Login</Link>
                  </span>
                </div>
                <div className={styles.div12}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
