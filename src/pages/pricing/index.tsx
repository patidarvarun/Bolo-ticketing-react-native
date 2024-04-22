import React, { useEffect, useState } from "react";
import styles from "../../styles/Ticketingpage.module.css";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    if (localStorage) {
      const userData: any = localStorage.getItem("userData");
      const userParse: any = userData && JSON.parse(userData);

      setToken(userParse && userParse.token);
    }
  }, []);

  return (
    <>
      <div className={styles.div}>
        <div className={styles.div7}>
          <div className={styles.div8}>
            <div className={styles.column}>
              <div className={styles.div9pricing}>
                <div className={styles.div10}>
                  CRM functionality to help keep in touch with your customers.
                </div>
                <div className={styles.div11}>
                  Bolo CRM is offering free services for now. In the future when
                  we offer paid services, you can opt-in if you chose to.
                </div>
              </div>
            </div>
            <div className={styles.column2} data-aos="zoom-in">
              <img
                loading="lazy"
                src="/landingImage/group.png"
                className={styles.img3}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.div98} data-aos="zoom-in">
            <div className={styles.div99}>
              <div className={styles.img18}>
                {" "}
                <img
                  loading="lazy"
                  src="/landingImage/logo_icon.png"
                  className={styles.img18}
                  onClick={() => router.push("/")}
                />
              </div>
              <div className={styles.div100}>
                With lots of unique blocks, you can easily build a page without
                coding. Build your next landing page.
              </div>
              <div className={styles.img19}>
                <i className="pi pi-twitter"></i> &emsp;
                <i className="pi pi-facebook"></i> &emsp;
                <i className="pi pi-instagram"></i> &emsp;
                <i className="pi pi-linkedin"></i>
              </div>
            </div>
            <div className={styles.div101}>
              <div className={styles.div102}>
                <div className={styles.column8}>
                  <div className={styles.div103}>
                    <h2 className={styles.div104}>Company</h2>
                    <div className={styles.div105}>
                      About us
                      <br />
                      Contact us
                      <br />
                      Careers
                    </div>
                  </div>
                </div>
                <div className={styles.column9}>
                  <div className={styles.div106}>
                    <h2 className={styles.div107}>Product</h2>
                    <div className={styles.div108}>
                      Features
                      <br />
                      Pricing
                      <br />
                      News
                    </div>
                  </div>
                </div>
                <div className={styles.column10}>
                  <div className={styles.div109}>
                    <h2 className={styles.div110}>Services</h2>
                    <div className={styles.div111}>
                      Ticketing
                      <br />
                      Email
                      <br />
                      SMS
                    </div>
                  </div>
                </div>
                <div className={styles.div112}>
                  <h2 className={styles.div113}>Legal</h2>
                  <div className={styles.div114}>
                    Privacy Policy
                    <br />
                    Terms & Conditions
                    <br />
                    Return Policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
