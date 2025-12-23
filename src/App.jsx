import React from "react";

const SITE = "https://tubular-haupia-280fb4.netlify.app";

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Netlify injects this when Identity is enabled and a user is logged in
    const u = window.netlifyIdentity && window.netlifyIdentity.currentUser();
    setUser(u);

    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("login", (u) => setUser(u));
      window.netlifyIdentity.on("logout", () => setUser(null));
      window.netlifyIdentity.init();
    }
  }, []);

  const login = () => {
    // Opens Netlify Identity login modal/page
    if (window.netlifyIdentity) window.netlifyIdentity.open();
    else window.location.href = "/.netlify/identity";
  };

  const logout = () => {
    if (window.netlifyIdentity) window.netlifyIdentity.logout();
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>SSS Dagupan DTR</h2>

      {!user ? (
        <button onClick={login} style={{ padding: 10 }}>
          Log in
        </button>
      ) : (
        <>
          <p>Logged in as: {user.email}</p>
          <button onClick={logout} style={{ padding: 10 }}>
            Log out
          </button>
        </>
      )}

      <p style={{ marginTop: 20, color: "#444" }}>
        Site: {SITE}
      </p>
    </div>
  );
}
