import { useState, useEffect } from "react";
import { User } from "./types";

interface Props {
  onSubmit: (user: Omit<User, "id">) => void;
  editingUser?: User | null;
}

const UserForm = ({ onSubmit, editingUser }: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingUser]);

  const handleSubmit = () => {
    if (!name || !email) return alert("Please fill in all fields!");
    onSubmit({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <>
      <input
        className="form-input"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-input"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={`submit-btn ${editingUser ? "submit-btn-update" : "submit-btn-create"}`}
        onClick={handleSubmit}
      >
        {editingUser ? "Update Record" : "+ Add User"}
      </button>
    </>
  );
};

export default UserForm;
