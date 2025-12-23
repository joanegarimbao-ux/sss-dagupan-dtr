import React, { useState } from "react";
import { supabase } from "./supabase.js";

export default function RegisterEmployee() {
  const [employeeNo, setEmployeeNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    setMessage("");
    if (!employeeNo.trim() || !name.trim() || !email.trim()) {
      setMessage("Please fill in Employee No, Full Name, and Email.");
      return;
    }

    const { error } = await supabase.from("employees").insert([
      {
        employee_no: employeeNo.trim(),
        full_name: name.trim(),
        email: email.trim().toLowerCase(),
        role: "employee"
      }
    ]);

    if (error) setMessage("Error: " + error.message);
    else {
      setMessage("Employee registered successfully!");
      setEmployeeNo("");
      setName("");
      setEmail("");
    }
  };

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 10, marginTop: 12 }}>
      <h3>Register Employee (Admin)</h3>

      <div style={{ marginBottom: 10 }}>
        <div>Employee No</div>
        <input value={employeeNo} onChange={(e) => setEmployeeNo(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <div>Full Name</div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <div>Email</div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button onClick={register} style={{ padding: 10 }}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}
