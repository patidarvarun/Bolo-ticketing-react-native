import React from "react";
import styles from "../../styles/Landingpage.module.css";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <div className={styles.div}>
        <div className={styles.div7}>
          <div className={styles.div8}>
            <div className={styles.column}>
              <div className={styles.div9}>
                <div className={styles.div10}>
                  CRM functionality to help keep in touch with your customers.
                </div>
                <div className={styles.div11}>
                  Services like ticketing, email, SMS to help your customers get
                  in touch with you. Please click the products link above to see
                  all the services we offer.
                </div>
                <Button
                  className={styles.div12}
                  label="Sign Up for Free"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={() => router.push("/signup")}
                />
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
        <div className={styles.div14} data-aos="zoom-in">
          <div className={styles.div15}>
            <div className={styles.column3}>
              <div className={styles.div16}>
                <img
                  loading="lazy"
                  src="/landingImage/code.png"
                  className={styles.img4}
                />
                <h3 className={styles.div17}>Multiple CRM services</h3>
                <div className={styles.div18}>
                  We provide multiple services like tickets, email, SMS so that
                  your customers to reach you successfully.
                </div>
              </div>
            </div>
            <div className={styles.column4}>
              <div className={styles.div19}>
                <img
                  loading="lazy"
                  src="/landingImage/countdown2.png"
                  className={styles.img5}
                />
                <h3 className={styles.div20}>Reduce effort per ticket</h3>
                <div className={styles.div21}>
                  Real time software lets you respond quickly.
                </div>
              </div>
            </div>
            <div className={styles.column5}>
              <div className={styles.div22}>
                <img
                  loading="lazy"
                  src="/landingImage/smartphone.png"
                  className={styles.img6}
                />
                <h3 className={styles.div23}>Keep costs low</h3>
                <div className={styles.div24}>
                  Signup and get most of services we provide for free.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.div25} data-aos="zoom-in">
          <div className={styles.div26}>
            <div className={styles.div27}>
              <div className={styles.div28}>
                Getting started with Bolo is easier than ever
              </div>
              <div className={styles.div29}>
                BOLO CRM is a cutting-edge customer communication platform
                dedicated to simplifying connections with your audience.
              </div>
              <Button
                className={styles.div12}
                label="Get started"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => router.push("/signup")}
              />
            </div>
            <span className={styles.img8}>
              <img
                loading="lazy"
                src="/landingImage/group2.png"
                className={styles.img8}
              />
            </span>
          </div>
          <div className={styles.div32} data-aos="zoom-in">
            <div className={styles.div33}>
              <h3 className={styles.div34}>1M+</h3>
              <div className={styles.div35}>
                Customers visit Bolo every months
              </div>
            </div>
            <div className={styles.div36}>
              <h3 className={styles.div37}>93%</h3>
              <div className={styles.div38}>
                Satisfaction rate from our customers.
              </div>
            </div>
            <div className={styles.div39}>
              <h3 className={styles.div40}>4.9</h3>
              <div className={styles.div41}>
                Average customer ratings out of 5.00!
              </div>
            </div>
          </div>
        </div>
        <div className={styles.div42} data-aos="zoom-in">
          <div className={styles.div43}>
            Empower Your CRM Experience: Tickets, Get Help, and Thrive
          </div>
          <div className={styles.div44}>
            It’s very easy to integrate our services into your website. Add a
            few lines of HTML code and you’re ready.
          </div>
        </div>
        <div className={styles.div45} data-aos="zoom-in">
          <div className={styles.div46}>
            <div className={styles.column6}>
              <img
                loading="lazy"
                src="/landingImage/group3.png"
                className={styles.img9}
              />
            </div>
            <div className={styles.column7}>
              <div className={styles.div47}>
                <div className={styles.div48}>
                  <div className={styles.div49}>
                    <span className={styles.div50}>1</span>
                  </div>
                  <div className={styles.div51}>
                    <h3 className={styles.div52}>Create a Ticket</h3>
                    <div className={styles.div53}>
                      We provide a widget you can add to your website. Using
                      this widget your customers can get in touch with you.
                    </div>
                  </div>
                </div>
                <div className={styles.div54}>
                  <div className={styles.div55}>
                    <span className={styles.div56}>2</span>
                  </div>
                  <div className={styles.div57}>
                    <h3 className={styles.div58}>Get Help</h3>
                    <div className={styles.div59}>
                      We’re always available to provide help, if you need it.
                    </div>
                  </div>
                </div>
                <div className={styles.div60}>
                  <div className={styles.div61}>
                    <span className={styles.div62}>3</span>
                  </div>
                  <div className={styles.div63}>
                    <h3 className={styles.div64}>Respond quickly</h3>
                    <div className={styles.div65}>
                      Our software sends you an email/text in real time every
                      time a customer tries to get in touch with you.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.div66} data-aos="zoom-in">
          <div className={styles.container1}>
            <div className={styles.div67}>
              <div className={styles.div68}>
                <img
                  loading="lazy"
                  src="/landingImage/face2.png"
                  className={styles.img10}
                />
                <h3 className={styles.div69}>“You made it so simple”</h3>
                <div className={styles.div70}>
                  Thanks to your widgets, my customers can now easily get in
                  touch with me.
                </div>
                <div className={styles.div71}>Corey Valdez</div>
                <div className={styles.div72}>Founder at Zenix</div>
              </div>
            </div>
            <div className={styles.div67a}>
              <div className={styles.div168}>
                <img
                  loading="lazy"
                  src="/landingImage/face1.png"
                  className={styles.img10}
                />
                <h3 className={styles.div69}>“Simply is best”</h3>
                <div className={styles.div70}>
                  Your software was so easy to integrate.
                </div>
                <div className={styles.div71}>Ian Klein</div>
                <div className={styles.div72}>Digital Marketer</div>
              </div>
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          src="/landingImage/profile_footer.png"
          className={styles.img12}
        />
        <div className={styles.div73} data-aos="zoom-in">
          Contact Our Support
        </div>
        <div
          className={styles.container1}
          style={{ marginBottom: "20px !important" }}
          data-aos="zoom-in"
        >
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.content}>
                <div className={styles.row}>
                  <div className={styles.subcol}>
                    <div className={styles.content}>
                      <div className={styles.row}>
                        <div className={styles.icon}>
                          {" "}
                          <img
                            loading="lazy"
                            src="/landingImage/small_right.png"
                            className={styles.img13}
                          />
                        </div>
                        <div className={styles.divheading}>
                          Can I use Bolo for my clients?
                        </div>
                      </div>
                      <div className={styles.div80c}>
                        Once you integrate our software in your website, all of
                        your customers will be able to use it.
                      </div>
                    </div>
                  </div>
                  <div className={styles.subcol}>
                    <div className={styles.content}>
                      <div className={styles.row}>
                        <div className={styles.icon}>
                          {" "}
                          <img
                            loading="lazy"
                            src="/landingImage/small_right.png"
                            className={styles.img13}
                          />
                        </div>
                        <div className={styles.divheading}>
                          Does your software work on all browsers?
                        </div>
                      </div>
                      <div className={styles.div80c}>
                        Our software works on all devices (phones, ipads,
                        computers) and all the commonly used browsers.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.container1}
          style={{ marginBottom: "20px !important" }}
          data-aos="zoom-in"
        >
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.content}>
                <div className={styles.row}>
                  <div className={styles.subcol}>
                    <div className={styles.content}>
                      <div className={styles.row}>
                        <div className={styles.icon}>
                          {" "}
                          <img
                            loading="lazy"
                            src="/landingImage/small_right.png"
                            className={styles.img13}
                          />
                        </div>
                        <div className={styles.divheading}>
                          Do I get free updates?
                        </div>
                      </div>
                      <div className={styles.div80c}>
                        Yes, of course. Updates will be completely free.
                      </div>
                    </div>
                  </div>
                  <div className={styles.subcol}>
                    <div className={styles.content}>
                      <div className={styles.row}>
                        <div className={styles.icon}>
                          {" "}
                          <img
                            loading="lazy"
                            src="/landingImage/small_right.png"
                            className={styles.img13}
                          />
                        </div>
                        <div className={styles.divheading}>
                          Will you provide support?
                        </div>
                      </div>
                      <div className={styles.div80c}>
                        Yes, of course. We’re just an email away.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className={styles.div91} data-aos="zoom-in">
          <span style={{ color: "rgba(0, 0, 0, 1)", fontWeight: 600 }}>
            Haven’t got your answer?
          </span>
          <span style={{ color: "rgba(33, 182, 168, 1)", fontWeight: 600 }}>
            Contact our support now
          </span>
        </div>
        <div className={styles.div92} data-aos="zoom-in">
          <div className={styles.container1}>
            <div className={styles.div93}>
              <div className={styles.div94}>Revamp Your CRM Experience</div>
              <div className={styles.div95}>
                Use the latest technology to reach your customers.
              </div>
            </div>
            <Button
              className={styles.div96}
              label="Sign Up"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => router.push("/signup")}
            />
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
