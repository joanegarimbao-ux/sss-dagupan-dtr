import React, { useState } from "react";
import { supabase } from "./supabase";

export default function RegisterEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    setMessage("");
    if (!employeeNo || !name || !email) {
      setMessage("Please fill in Employee No, Full Name, and Email.");
      return;
    }

    const { error } = await supabase.from("employees").insert([
      {
        employee_no: employeeNo,
        full_name: name,
        email: email.toLowerCase(),
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
    <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 10, marginTop: 12 }}>
      <h3>Register Employee (Admin)</h3>

      <div style={{ marginBottom: 8 }}>
        <label>Employee No</label><br />
        <input value={employeeNo} onChange={(e) => setEmployeeNo(e.target.value)} />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Full Name</label><br />
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Email</label><br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button onClick={register} style={{ padding: 10 }}>Register</button>
      <p>{message}</p>
    </div>
  );
}
