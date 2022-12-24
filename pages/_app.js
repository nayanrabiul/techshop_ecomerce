import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import state from "../utils/state";
import { useEffect } from "react";
import { ThemeProvider } from "@material-tailwind/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //for initialize cart items
  const { dispatch } = state;
  useEffect(() => {
    const cartItem = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    dispatch({ type: "initialize", initialize: cartItem });
  }, [dispatch]);

  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth adminOnly={Component.auth.adminOnly}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </Auth>
      ) : (
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}

export default MyApp;
