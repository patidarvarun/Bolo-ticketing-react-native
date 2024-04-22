import React, { useState } from "react";
import SidebarComponent from "./sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const [expanded, setExpanded] = useState(true); // Set initial state of expanded to true
  const router = useRouter();
  const { pathname } = router;

  // Function to toggle visibility
  const toggleVisibility = () => {
    setExpanded(!expanded); // Flips the value of expanded
  };

  // Check if the sidebar should be visible based on the pathname
  const isSidebarVisible = ![
    "/",
    "/login",
    "/signup",
    "/ticketing",
    "/pricing",
    "/profile",
  ].includes(pathname || "");

  return (
    <div className={`layout ${expanded ? "sidebar-open" : ""}`}>
      {isSidebarVisible && (
        <SidebarComponent
          expanded={expanded}
          toggleVisibility={toggleVisibility}
        />
      )}
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Layout;
