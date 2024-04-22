import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Integrating.module.css";

export default function integrateTickets() {
  const [divClass, setDivClass] = useState<any>("expanddiv");
  const [apiKey, setApiKey] = useState<any>(null);
  const [jsonData, setJsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("userData");
      const userParse: any = userData && JSON.parse(userData);
      setApiKey(userParse && userParse?.api_key);

      const config_url: any = {
        customer_api_url: process.env.NEXT_PUBLIC_CUSTOMERS_GRAPHQL_URL,
        ticket_api_url: process.env.NEXT_PUBLIC_TICKETS_GRAPHQL_URL,
        api_key: userParse && userParse?.api_key,
        logo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}logo_icon.png`,
      };
      setJsonData(JSON.stringify(config_url));
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <div className={`common_div ${divClass ? divClass : ""} ${styles.div}`}>
        <div className={styles.div7}>
          <div className={styles.div11}>
            <div className={styles.div12}>
              <div className={styles.div13}>
                <div className={styles.div14}>
                  <div className={styles.div14}>
                    <div className={styles.div15}></div>
                    <div className={styles.div16}>Loading... </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={`common_div ${divClass ? divClass : ""} ${styles.div}`}>
        <div className={styles.div7}>
          <div className={styles.div11}>
            <div className={styles.div12}>
              <div className={styles.div13}>
                <div className={styles.div14}>
                  <div className={styles.div14}>
                    <div className={styles.div15}></div>
                    <div className={styles.div16}>Integrate Tickets </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`data-main ${divClass ? divClass : ""} ${
                styles.div143
              }`}
            >
              <div className={`data-table-type ${styles.div17}`}>
                <div className={`data-row-header ${styles.div18}`}></div>
                <br />
                <br />
                <div style={{ display: "flex" }}>
                  <h1 className={styles.headingint}>
                    You can integrate bolo-ticketing with your website by
                    <br />
                    following these instructions :-
                  </h1>
                </div>
                <br />
                <br />
                <div className={styles.mainintediv}>
                  <h3>
                    Your API key :{" "}
                    <a className={styles.keycss}>{apiKey && apiKey}</a>
                  </h3>

                  <br />
                  <br />
                  <div>
                    <p className={styles.paradiv}>
                      On Every Page, that you want a bolo ticketing widget, you
                      need to add this code inside {"<head></head>"} section.
                    </p>
                    <br />
                    <span>
                      <textarea readOnly className={styles.htmlcontent}>
                        {`<link type="text/css" rel="stylesheet" href="${process.env.NEXT_PUBLIC_CDN_CSS}" /> `}
                      </textarea>
                      {jsonData && (
                        <textarea readOnly className={styles.htmlcontent}>
                          {`<script id="bolo-config"> var bolo_config = ${jsonData}</script>`}
                        </textarea>
                      )}
                      <textarea readOnly className={styles.htmlcontent}>
                        {`<script src="${process.env.NEXT_PUBLIC_CDN_JS}" defer></script>`}
                      </textarea>
                    </span>
                  </div>
                  <br />
                  <div>
                    <p className={styles.paradiv}>
                      On Every Page, that you want a bolo ticketing widget, you
                      need to add this code inside {"<footer></footer>"}{" "}
                      section.
                    </p>
                    <br />
                    <span>
                      <textarea readOnly className={styles.htmlcontent}>
                        {`<div id="bt_mainDiv"/></div>`}
                      </textarea>
                    </span>
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
