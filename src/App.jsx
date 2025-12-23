import React from "react";
import netlifyIdentity from "@netlify/identity-widget";

netlifyIdentity.init();

export default function App() {
  function login() {
    netlifyIdentity.open();
  }

  function logout() {
    netlifyIdentity.logout();
  }

  const user = netlifyIdentity.currentUser();

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>SSS Dagupan DTR</h2>

      {!user && (
        <button onClick={login} style={{ padding: 10 }}>
          Log in
        </button>
      )}

      {user && (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={logout} style={{ padding: 10 }}>
            Log out
          </button>
        </>
      )}
    </div>
  );
}
