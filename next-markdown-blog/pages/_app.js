import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className="container">
        <h2>Check out my blogs ➡️</h2>
        <Component {...pageProps} />
      </main>
    </>
  );
}
