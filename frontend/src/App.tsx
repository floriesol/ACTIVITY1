import { useState } from "react";
import { User } from "./types";
import UserForm from "./UserForm";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice Reyes", email: "alice@example.com" },
    { id: 2, name: "Bob Santos", email: "bob@example.com" },
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleCreate = (data: Omit<User, "id">) => {
    setUsers([...users, { id: Date.now(), ...data }]);
  };

  const handleUpdate = (data: Omit<User, "id">) => {
    if (!editingUser) return;
    setUsers(users.map((u) =>
      u.id === editingUser.id ? { ...editingUser, ...data } : u
    ));
    setEditingUser(null);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Remove this user?")) return;
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0f;
          color: #e8e8f0;
          min-height: 100vh;
        }

        .app-shell {
          min-height: 100vh;
          background: #0a0a0f;
          position: relative;
          overflow: hidden;
          padding: 48px 24px;
        }

        /* Background grid */
        .app-shell::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* Ambient glow */
        .glow-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .glow-orb-1 {
          width: 500px; height: 500px;
          background: rgba(99,102,241,0.12);
          top: -150px; left: -100px;
        }
        .glow-orb-2 {
          width: 400px; height: 400px;
          background: rgba(168,85,247,0.08);
          bottom: -100px; right: -80px;
        }

        .container {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .header {
          margin-bottom: 48px;
        }
        .header-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .header-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px; height: 1px;
          background: #6366f1;
        }
        .header-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5vw, 54px);
          font-weight: 800;
          color: #f0f0fa;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
        }
        .header-title span {
          color: #6366f1;
        }
        .header-subtitle {
          font-size: 14px;
          color: #6b6b8a;
          font-weight: 300;
        }

        /* Stats row */
        .stats-row {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
        }
        .stat-chip {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          color: #8888aa;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .stat-chip strong {
          color: #e0e0f0;
          font-weight: 600;
        }
        .stat-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 6px #6366f1;
        }

        /* Card */
        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(12px);
          margin-bottom: 16px;
        }
        .card-label {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4b4b6b;
          margin-bottom: 20px;
        }

        /* Edit banner */
        .edit-banner {
          background: rgba(234,179,8,0.07);
          border: 1px solid rgba(234,179,8,0.2);
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: #ca9a0a;
        }
        .edit-banner strong { color: #fbbf24; }
        .cancel-btn {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          transition: background 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .cancel-btn:hover { background: rgba(239,68,68,0.1); }

        /* Form */
        .form-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .form-input {
          flex: 1;
          min-width: 180px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 14px;
          color: #e0e0f0;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .form-input::placeholder { color: #4b4b6b; }
        .form-input:focus {
          border-color: #6366f1;
          background: rgba(99,102,241,0.06);
        }
        .submit-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .submit-btn-create {
          background: #6366f1;
          color: #fff;
          box-shadow: 0 0 24px rgba(99,102,241,0.3);
        }
        .submit-btn-create:hover {
          background: #5254cc;
          box-shadow: 0 0 32px rgba(99,102,241,0.45);
          transform: translateY(-1px);
        }
        .submit-btn-update {
          background: #d97706;
          color: #fff;
          box-shadow: 0 0 24px rgba(217,119,6,0.3);
        }
        .submit-btn-update:hover {
          background: #b45309;
          transform: translateY(-1px);
        }

        /* Divider */
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 28px 0;
        }

        /* Table */
        .table-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .table-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #c0c0d8;
        }
        .count-badge {
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.25);
          color: #818cf8;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          padding: 3px 10px;
          border-radius: 100px;
          letter-spacing: 0.05em;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 6px;
        }
        thead th {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3a3a5c;
          padding: 8px 16px;
          text-align: left;
        }
        thead th:last-child { text-align: center; }

        tbody tr {
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          transition: background 0.2s, transform 0.15s;
        }
        tbody tr:hover {
          background: rgba(99,102,241,0.08);
          transform: translateX(2px);
        }

        tbody td {
          padding: 14px 16px;
          font-size: 14px;
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        tbody td:first-child {
          border-left: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px 0 0 12px;
          padding-left: 20px;
        }
        tbody td:last-child {
          border-right: 1px solid rgba(255,255,255,0.04);
          border-radius: 0 12px 12px 0;
          text-align: center;
        }

        .row-num {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #3a3a5c;
        }
        .row-name {
          font-weight: 500;
          color: #d0d0e8;
        }
        .row-email {
          color: #5c5c7a;
          font-size: 13px;
        }
        .action-group {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        .action-btn {
          border: none;
          border-radius: 8px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.03em;
        }
        .edit-action {
          background: rgba(234,179,8,0.12);
          color: #fbbf24;
          border: 1px solid rgba(234,179,8,0.2);
        }
        .edit-action:hover {
          background: rgba(234,179,8,0.22);
          transform: translateY(-1px);
        }
        .delete-action {
          background: rgba(239,68,68,0.1);
          color: #f87171;
          border: 1px solid rgba(239,68,68,0.2);
        }
        .delete-action:hover {
          background: rgba(239,68,68,0.2);
          transform: translateY(-1px);
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 56px 24px;
        }
        .empty-icon {
          font-size: 40px;
          margin-bottom: 12px;
          opacity: 0.4;
        }
        .empty-text {
          font-size: 14px;
          color: #3a3a5c;
        }

        /* Footer */
        .footer {
          text-align: center;
          margin-top: 32px;
          font-size: 11px;
          color: #2a2a44;
          letter-spacing: 0.08em;
          font-family: 'Syne', sans-serif;
          text-transform: uppercase;
        }
      `}</style>

      <div className="app-shell">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />

        <div className="container">

          {/* Header */}
          <div className="header">
            <div className="header-eyebrow">User Management System</div>
            <h1 className="header-title">
              Manage<br /><span>Users.</span>
            </h1>
            <p className="header-subtitle">Create, view, update and delete records in real time.</p>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-chip">
              <span className="stat-dot" />
              <span>Total Users: <strong>{users.length}</strong></span>
            </div>
            <div className="stat-chip">
              Status: <strong>Live</strong>
            </div>
          </div>

          {/* Form Card */}
          <div className="card">
            <div className="card-label">{editingUser ? "✦ Edit Record" : "✦ New Record"}</div>

            {editingUser && (
              <div className="edit-banner">
                <span>Editing — <strong>{editingUser.name}</strong></span>
                <button className="cancel-btn" onClick={() => setEditingUser(null)}>
                  ✕ Cancel
                </button>
              </div>
            )}

            <div className="form-row">
              <FormInputs
                editingUser={editingUser}
                onSubmit={editingUser ? handleUpdate : handleCreate}
              />
            </div>
          </div>

          {/* Table Card */}
          <div className="card">
            <div className="table-header-row">
              <span className="table-title">All Records</span>
              <span className="count-badge">{users.length} entries</span>
            </div>

            {users.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td><span className="row-num">{String(index + 1).padStart(2, "0")}</span></td>
                      <td><span className="row-name">{user.name}</span></td>
                      <td><span className="row-email">{user.email}</span></td>
                      <td>
                        <div className="action-group">
                          <button className="action-btn edit-action" onClick={() => setEditingUser(user)}>
                            Edit
                          </button>
                          <button className="action-btn delete-action" onClick={() => handleDelete(user.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">◈</div>
                <p className="empty-text">No records found. Add your first user above.</p>
              </div>
            )}
          </div>

          <div className="footer">React · TypeScript · Tailwind</div>
        </div>
      </div>
    </>
  );
}

// Inline form component to keep state local
function FormInputs({
  editingUser,
  onSubmit,
}: {
  editingUser: User | null;
  onSubmit: (data: Omit<User, "id">) => void;
}) {
  const [name, setName] = useState(editingUser?.name || "");
  const [email, setEmail] = useState(editingUser?.email || "");

  // sync when editingUser changes
  useState(() => {
    setName(editingUser?.name || "");
    setEmail(editingUser?.email || "");
  });

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
}

export default App;
