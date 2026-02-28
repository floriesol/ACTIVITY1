import { User } from "./types";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList = ({ users, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-indigo-500 text-white">
          <tr>
            <th className="px-5 py-3 text-left font-semibold">#</th>
            <th className="px-5 py-3 text-left font-semibold">Name</th>
            <th className="px-5 py-3 text-left font-semibold">Email</th>
            <th className="px-5 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`border-t border-gray-100 hover:bg-indigo-50 transition
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-5 py-3 text-gray-400">{index + 1}</td>
              <td className="px-5 py-3 font-medium text-gray-700">{user.name}</td>
              <td className="px-5 py-3 text-gray-500">{user.email}</td>
              <td className="px-5 py-3 text-center space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-semibold transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition"
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;