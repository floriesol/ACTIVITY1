const BASE_URL = "http://127.0.0.1:8000/api";

// GET all users
export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users/`);
  return res.json();
};

// CREATE user
export const createUser = async (data: { name: string; email: string }) => {
  const res = await fetch(`${BASE_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// UPDATE user
export const updateUser = async (id: number, data: { name: string; email: string }) => {
  const res = await fetch(`${BASE_URL}/users/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// DELETE user
export const deleteUser = async (id: number) => {
  await fetch(`${BASE_URL}/users/${id}/`, {
    method: "DELETE",
  });
};