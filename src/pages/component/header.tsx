import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import styles from "../../styles/Headers.module.css";
import { useRouter } from "next/router";
import { Avatar } from "primereact/avatar";

const Header: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [getToken, setToken] = useState<any>(null);
  const [getEmail, setEmail] = useState<any>(null);
  const [divClass, setDivClass] = useState<any>("expandlogindiv");
  const [divProductClass, setDivProductClass] =
    useState<any>("expandproductdiv");

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 991; // Adjust breakpoint as needed
      setIsMobile(isMobile);
    };

    window.addEventListener("resize", handleResize);

    handleResize(); // Call initially for responsive behavior

    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("userData");
      const userParse: any = userData && JSON.parse(userData);

      setShowSidebar(userParse ? false : true); // Optional: Set default sidebar based on login state
      setToken(userParse && userParse.token); // Update state with retrieved token
      setEmail(userParse && userParse?.email);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handlePricing = () => {
    router.push("/pricing");
  };

  const handleProducts = () => {
    console.log("handleProducts");
    if (divProductClass === "expandproductdiv") {
      setDivProductClass("collapseproductdiv");
    } else {
      setDivProductClass("expandproductdiv");
    }
  };

  const handleLogin = () => {
    if (divClass === "expandlogindiv") {
      setDivClass("collapselogindiv");
    } else {
      setDivClass("expandlogindiv");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setToken(null);
    router.push("/login");
  };

  const handleLog_in = () => {
    router.push("/login");
  };
  
  return (
    <div
      className={
        isMobile
          ? `${styles.div} ${showSidebar ? styles.showOverlay : ""}`
          : styles.div
      }
    >
      <div className={styles.div2}>
        {isMobile ? (
          <div
            className={`${styles.center} ${showSidebar ? styles.hideLogo : ""}`}
          >
            <Image
              loading="lazy"
              src="/headerImage/logo.png"
              className={styles.img}
              onClick={() => router.push("/")}
            />
          </div>
        ) : (
          <Image
            loading="lazy"
            src="/headerImage/logo.png"
            className={styles.img}
            onClick={() => router.push("/")}
          />
        )}
        <div
          className={
            isMobile
              ? `${styles.left} ${showSidebar ? styles.hideIcon : ""}`
              : styles.div3
          }
        >
          {isMobile ? (
            <div className={styles.menuIcon} onClick={handleToggleSidebar}>
              {showSidebar ? (
                <i className="pi pi-times"></i>
              ) : (
                <i className="pi pi-bars"></i>
              )}
            </div>
          ) : (
            <>
              <div className={styles.div4} onClick={handlePricing}>
                <span className="btn-main">Pricing</span>
              </div>
              <div className={styles.div5}>
                <span className={styles.div11}>Products</span>
                <div className={styles.div10}>
                  <ul>
                    <li onClick={() => router.push("/ticketing")}>Ticketing</li>
                  </ul>
                </div>
              </div>

              {getToken ? (
                <div className={`afterlogin ${styles.div5css}`}>
                  <span className="btn-main">
                    <Avatar
                      label={getEmail && getEmail?.charAt(0)?.toUpperCase()}
                      size="normal"
                      shape="circle"
                      style={{ fontWeight: 600 }}
                    />
                  </span>
                  <div className={styles.div10}>
                    <ul>
                      <li onClick={() => router.push("/profile")}>Profile</li>
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className={styles.div5}>
                  <span className="btn-main" onClick={handleLog_in}>
                    Login
                  </span>
                </div>
              )}
            </>
          )}
        </div>
        {isMobile && (
          <div
            className={`${styles.sidebar} ${
              showSidebar ? styles.showSidebar : ""
            }`}
          >
            <ul className={`mobileview ${styles.sidebarList}`}>
              {getToken ? (
                <span
                  className={`mobileview3  ${divClass ? divClass : ""}`}
                  onClick={handleLogin}
                >
                  <li>
                    <Avatar
                      label={getEmail && getEmail?.charAt(0)?.toUpperCase()}
                      size="normal"
                      shape="circle"
                      style={{ fontWeight: 600 }}
                    />
                  </li>
                  <div className="submenu">
                    <ul>
                      <li onClick={() => router.push("/profile")}>Profile</li>
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                  </div>
                </span>
              ) : (
                <span
                  className={`mobileview3  ${divClass ? divClass : ""}`}
                  onClick={handleLog_in}
                >
                  <li>Login</li>
                </span>
              )}
              <span className="mobileview1" onClick={handlePricing}>
                <li>Pricing</li>
              </span>

              <span
                className={`mobileview2  ${
                  divProductClass ? divProductClass : ""
                }`}
                onClick={handleProducts}
              >
                <li>Products</li>
                <div className="submenu">
                  <ul>
                    <li onClick={() => router.push("/ticketing")}>Ticketing</li>
                  </ul>
                </div>
              </span>
            </ul>
          </div>
        )}
      </div>
      {showSidebar && isMobile && (
        <div
          className={`${styles.overlay} ${
            showSidebar ? styles.showOverlay : ""
          }`}
          onClick={handleToggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Header;
