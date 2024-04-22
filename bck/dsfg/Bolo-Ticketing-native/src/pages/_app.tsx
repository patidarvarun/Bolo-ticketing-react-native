import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "./component/header";
import Layout from "./component/layout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Layout>
        <ToastContainer
          autoClose={3000}
          progressClassName="custom-progress-bar"
        />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
