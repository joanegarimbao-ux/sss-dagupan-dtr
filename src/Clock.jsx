import React from "react";
import { supabase } from "./supabase.js";

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function Clock({ email }) {
  const [status, setStatus] = React.useState("");
  const [log, setLog] = React.useState(null);
  const logDate = todayISO();

  const loadToday = React.useCallback(async () => {
    setStatus("Loading today's record…");
    const { data, error } = await supabase
      .from("time_logs")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("log_date", logDate)
      .maybeSingle();

    if (error) {
      setStatus("Error loading: " + error.message);
      return;
    }
    setLog(data || null);
    setStatus("");
  }, [email, logDate]);

  React.useEffect(() => {
    if (email) loadToday();
  }, [email, loadToday]);

  const punch = async (field) => {
    setStatus("Saving…");
    const now = new Date().toISOString();

    // If no row yet for today, create it first.
    if (!log) {
      const { error: insertErr } = await supabase.from("time_logs").insert([
        { email: email.toLowerCase(), log_date: logDate, [field]: now }
      ]);
      if (insertErr) {
        setStatus("Error: " + insertErr.message);
        return;
      }
    } else {
      const { error: updateErr } = await supabase
        .from("time_logs")
        .update({ [field]: now })
        .eq("id", log.id);

      if (updateErr) {
        setStatus("Error: " + updateErr.message);
        return;
      }
    }

    await loadToday();
    setStatus("Saved!");
    setTimeout(() => setStatus(""), 1200);
  };

  const fmt = (v) => (v ? new Date(v).toLocaleString() : "—");

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 10, marginTop: 12 }}>
      <h3>Employee Clock In / Out</h3>
      <div><b>Date:</b> {logDate}</div>
      <div><b>Email:</b> {email}</div>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => punch("am_in")} style={{ padding: 10, marginRight: 6 }}>
          AM Time In
        </button>
        <button onClick={() => punch("am_out")} style={{ padding: 10 }}>
          AM Time Out
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => punch("pm_in")} style={{ padding: 10, marginRight: 6 }}>
          PM Time In
        </button>
        <button onClick={() => punch("pm_out")} style={{ padding: 10 }}>
          PM Time Out
        </button>
      </div>

      <div style={{ marginTop: 14 }}>
        <div><b>AM IN:</b> {fmt(log?.am_in)}</div>
        <div><b>AM OUT:</b> {fmt(log?.am_out)}</div>
        <div><b>PM IN:</b> {fmt(log?.pm_in)}</div>
        <div><b>PM OUT:</b> {fmt(log?.pm_out)}</div>
      </div>

      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </div>
  );
}
