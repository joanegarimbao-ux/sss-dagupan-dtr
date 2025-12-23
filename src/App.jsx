import React from "react";
import RegisterEmployee from "./RegisterEmployee.jsx";
import Clock from "./Clock.jsx";
import AdminDailyCode from "./AdminDailyCode.jsx";
import { supabase } from "./supabase.js";

export default function App() {
  const [user, setUser] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    const init = async () => {
      if (!window.netlifyIdentity) {
        setMsg("Login system not loaded.");
        setLoading(false);
        return;
      }

      window.netlifyIdentity.init();
      const current = window.netlifyIdentity.currentUser();
      setUser(current);

      if (current?.email) {
        const { data, error } = await supabase
          .from("employees")
          .select("role")
          .eq("email", current.email.toLowerCase())
          .limit(1)
          .maybeSingle();

        if (error) setMsg("Error checking role: " + error.message);
        setRole(data?.role || "employee");
      }

      setLoading(false);
    };

    init();

    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("login", () => window.location.reload());
      window.netlifyIdentity.on("logout", () => window.location.reload());
    }
  }, []);

  const login = () => window.netlifyIdentity && window.netlifyIdentity.open();
  const logout = () => window.netlifyIdentity && window.netlifyIdentity.logout();

  if (loading) return <div style={{ padding: 20 }}>Loading…</div>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>SSS Dagupan DTR</h2>

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

      {msg && <p>{msg}</p>}

      {!user ? (
        <p>Please log in.</p>
      ) : role === "admin" ? (
        <>
          <AdminDailyCode />
          <RegisterEmployee />
        </>
      ) : (
        <Clock email={user.email} />
      )}
    </div>
  );
}
