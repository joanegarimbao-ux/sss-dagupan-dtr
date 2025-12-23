import React, { useState } from "react";
import { supabase } from "./supabase.js";

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function AdminDailyCode() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const logDate = todayISO();

  const saveCode = async () => {
    if (!code.trim()) {
      setMsg("Please enter a code.");
      return;
    }

    const { error } = await supabase.from("daily_codes").upsert({
      log_date: logDate,
      code: code.trim()
    });

    if (error) setMsg("Error: " + error.message);
    else setMsg("Daily code saved for today.");
  };

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 10, marginTop: 12 }}>
      <h3>Set Daily Code (Admin)</h3>
      <div><b>Date:</b> {logDate}</div>

      <input
        placeholder="Enter today's code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ marginTop: 8 }}
      />

      <br /><br />
      <button onClick={saveCode} style={{ padding: 10 }}>
        Save Code
      </button>

      {msg && <p>{msg}</p>}
    </div>
  );
}
