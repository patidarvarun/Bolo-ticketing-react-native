import React from "react";
import styles from "../../styles/Sidebar.module.css";
import Link from "next/link";

interface SidebarProps {
  expanded: boolean;
  toggleVisibility: () => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  expanded,
  toggleVisibility,
}) => {
  return (
    <div className={`sidebar ${expanded ? "sidebar-open" : ""}`}>
      <div className="fixed-sidebar-toggle" onClick={toggleVisibility}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 7H11C11.2652 7 11.5196 7.10536 11.7071 7.29289C11.8946 7.48043 12 7.73478 12 8C12 8.26522 11.8946 8.51957 11.7071 8.70711C11.5196 8.89464 11.2652 9 11 9H6C5.73478 9 5.48043 8.89464 5.29289 8.70711C5.10536 8.51957 5 8.26522 5 8C5 7.73478 5.10536 7.48043 5.29289 7.29289C5.48043 7.10536 5.73478 7 6 7ZM13 15H18C18.2652 15 18.5196 15.1054 18.7071 15.2929C18.8946 15.4804 19 15.7348 19 16C19 16.2652 18.8946 16.5196 18.7071 16.7071C18.5196 16.8946 18.2652 17 18 17H13C12.7348 17 12.4804 16.8946 12.2929 16.7071C12.1054 16.5196 12 16.2652 12 16C12 15.7348 12.1054 15.4804 12.2929 15.2929C12.4804 15.1054 12.7348 15 13 15ZM6 11H18C18.2652 11 18.5196 11.1054 18.7071 11.2929C18.8946 11.4804 19 11.7348 19 12C19 12.2652 18.8946 12.5196 18.7071 12.7071C18.5196 12.8946 18.2652 13 18 13H6C5.73478 13 5.48043 12.8946 5.29289 12.7071C5.10536 12.5196 5 12.2652 5 12C5 11.7348 5.10536 11.4804 5.29289 11.2929C5.48043 11.1054 5.73478 11 6 11Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="sidebar-icon">
        {expanded ? (
          ""
        ) : (
          <>
            <div className={styles.div7s}>
              <div className={styles.div8s}>
                <div className={styles.div9s}>
                  <div className={styles.div10s}>
                    <img
                      loading="lazy"
                      src="/sidebar/menu.png"
                      className={styles.img2s}
                      onClick={toggleVisibility}
                    />
                    <img
                      loading="lazy"
                      src="/sidebar/home.png"
                      className={styles.img3s}
                    />
                    <Link href="/tickets">
                      <img
                        loading="lazy"
                        src="/sidebar/profile.png"
                        className={styles.img4s}
                      />
                    </Link>
                    <Link href="/integrateTickets">
                      <img
                        loading="lazy"
                        src="/sidebar/interigate.png"
                        className={styles.img5s}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {expanded && (
        <div className={styles.div}>
          <div className={styles.div7}>
            <div className={styles.div8}>
              <div className={styles.column}>
                <div className={styles.div9}>
                  <div className={styles.div10}>
                    <img
                      loading="lazy"
                      src="/sidebar/comment.png"
                      className={styles.img2}
                      onClick={toggleVisibility}
                    />
                  </div>
                  <div className={styles.div11}>
                    <img
                      loading="lazy"
                      src="/sidebar/Left.png"
                      className={styles.img3es}
                    />
                    <div className={styles.div12}>Tickets CRM</div>
                  </div>
                  <div className={styles.div13}>
                    <div className={styles.div14}>
                      <img
                        loading="lazy"
                        src="/sidebar/light_circle.png"
                        className={styles.img4es}
                      />
                      <div className={styles.div15}>My Tickets</div>
                    </div>
                    <img
                      loading="lazy"
                      src="/sidebar/couple.png"
                      className={styles.img5}
                    />
                  </div>
                  <div className={styles.div16}>
                    <img
                      loading="lazy"
                      src="/sidebar/Tree.png"
                      className={styles.img6}
                    />
                    <div className={styles.div17}>
                      <Link href={"/tickets"}>Ticket list</Link>
                    </div>
                  </div>
                  <div className={styles.div18}>
                    <img
                      loading="lazy"
                      src="/sidebar/interigate.png"
                      className={styles.img7}
                    />
                    <div className={styles.div19}>
                      <Link href={"/integrateTickets"}>
                        Integrate Tickets to your website
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarComponent;
