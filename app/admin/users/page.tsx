import { getDb } from "@/app/db";
import { User, users } from "@/app/db/schema";
import { desc } from "drizzle-orm";
import Big from "big.js";

export default async function UsersAdmin() {
  const db = await getDb();

  const usersList = await db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
  });

  return (
    <div className="space-y-4">
      <h1 className="h1 flex items-center">Users</h1>

      <UsersTable users={usersList} />
    </div>
  );
}

function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="card p-0">
      <table className="table w-full table-card table-fixed">
        <thead className="thead">
          <tr>
            <th className="th w-full">Name</th>
            <th className="th w-52">Balance</th>
            <th className="th w-52">Email</th>
            <th className="th w-52">Created At</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {!users.length ? (
            <tr>
              <td className="td" colSpan={100}>
                <div className="p-6 text-muted text-center">
                  No users to list.
                </div>
              </td>
            </tr>
          ) : null}

          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({ user }: { user: User }) {
  return (
    <tr>
      <td className="td">
        <div className="flex items-center">{user.name}</div>
      </td>
      <td className="td">
        <div className="truncate">
          {Big(user.creditBalance).toFixed(2)} USDT
        </div>
      </td>
      <td className="td">
        <div className="truncate">{user.email}</div>
      </td>
      <td className="td">
        <div className="truncate">{user.createdAt.toLocaleString()}</div>
      </td>
    </tr>
  );
}
