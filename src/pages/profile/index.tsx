import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { ApolloError } from "@apollo/client";
import { UPDATE_CUSTOMER } from "../api/lib/customers_graphql";
import client from "../api/lib/apollo-client";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [userId, setUserId] = useState<any>(null); // Initialize getToken state with null

  useEffect(() => {
    if (formSubmitted) {
      validateForm();
    }

    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("userData");
      const userParse: any = userData && JSON.parse(userData);
      setUserId(userParse && userParse.id);
      if (email === "") {
        setEmail(userParse && userParse?.email);
      }
    }
  }, [email, password, formSubmitted]);

  const validateEmail = (value: any) => {
    setEmailError("");
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Invalid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (value: any) => {
    setPasswordError("");
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
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

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLoader(true);
    const isValid = validateForm();
    if (isValid) {
      try {
        const data = await client.mutate({
          mutation: UPDATE_CUSTOMER,
          variables: {
            id: parseInt(userId),
            input: {
              email: email,
              password: password,
            },
          },
        });
        if (data && data) {
          toast.success("Details update successfully!");
          setLoader(false);
          router.push("/profile");
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
      <div className={`common_div ${styles.div10}`}>
        <div className={styles.div11}></div>
        <div className={styles.div}>
          <div className={styles.div7}>
            <div className={styles.div8}>
              <div className={styles.column2}>
                <div className={styles.div9}>
                  <div className={styles.divv13}>
                    <div className={styles.divv14}>
                      <div className={styles.divv15}></div>
                      <div className={styles.divv16}>Profile</div>
                    </div>
                  </div>

                  <br />
                  <form onSubmit={handleUpdate}>
                    <div className={styles.div13}>Email</div>
                    <div className="p-field">
                      <InputText
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Example@email.com"
                        className={styles.div14}
                      />
                    </div>
                    {emailError && formSubmitted && (
                      <small className="p-error">{emailError}</small>
                    )}
                    <div className={styles.div13}>Password</div>
                    <div className="p-field">
                      <InputText
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="********"
                        className={styles.div14}
                      />
                    </div>
                    {passwordError && formSubmitted && (
                      <small className="p-error">{passwordError}</small>
                    )}
                    <br />
                    <div className={styles.centeralign}>
                      {!loader ? (
                        <Button
                          className={styles.divv17}
                          label="Save"
                          type="submit"
                        />
                      ) : (
                        <Button
                          className={styles.divv17}
                          label="Loading..."
                          type="submit"
                        />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
