import React from "react";
import RegisterEmployee from "./RegisterEmployee.jsx";
import AdminDailyCode from "./AdminDailyCode.jsx";

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (!window.netlifyIdentity) return;
    window.netlifyIdentity.init();
    setUser(window.netlifyIdentity.currentUser());

    window.netlifyIdentity.on("login", () => window.location.reload());
    window.netlifyIdentity.on("logout", () => window.location.reload());
  }, []);

  const login = () => window.netlifyIdentity && window.netlifyIdentity.open();
  const logout = () => window.netlifyIdentity && window.netlifyIdentity.logout();

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>SSS Dagupan DTR</h2>

      {/* DEBUG MARKER — YOU MUST SEE THIS */}
      <p style={{ background: "#fff3cd", padding: 8, border: "1px solid #ffeeba" }}>
        DEBUG: App.jsx updated OK ✅
      </p>

      {!user ? (
        <button onClick={login} style={{ padding: 10 }}>
          Log in
        </button>
      ) : (
        <div style={{ marginBottom: 12 }}>
          <div>Logged in as: {user.email}</div>
          <button onClick={logout} style={{ padding: 10, marginTop: 6 }}>
            Log out
          </button>
        </div>
      )}

      {/* FOR NOW: ALWAYS SHOW BOTH BOXES */}
      <AdminDailyCode />
      <RegisterEmployee />
    </div>
  );
}
