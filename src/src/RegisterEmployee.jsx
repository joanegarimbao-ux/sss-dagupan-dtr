import React, { useState } from "react";
import { supabase } from "./supabase";

export default function RegisterEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    if (!name || !email) {
      setMessage("Please fill in all fields");
      return;
    }

    const { error } = await supabase.from("employees").insert([
      {
        full_name: name,
        email: email,
        role: "employee"
      }
    ]);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Employee registered successfully");
      setName("");
      setEmail("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Register Employee</h3>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={register}>Register</button>

      <p>{message}</p>
    </div>
  );
}
