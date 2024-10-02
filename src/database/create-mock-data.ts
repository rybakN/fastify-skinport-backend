import { createPool } from "./create-database";
import { dbName } from "../constants/constants";

export const createMockUsers = async () => {
  const pool = createPool(dbName);
  const users = [
    { balance: 100000 },
    { balance: 1000 },
    { balance: 200 },
    { balance: 700000 },
    { balance: 200 },
    { balance: 100000 },
    { balance: 0 },
    { balance: 400 },
  ];

  try {
    const res = await pool.query("SELECT COUNT(*) FROM users");
    const count = parseInt(res.rows[0].count, 10);

    if (count === 0) {
      for (const user of users) {
        await pool.query("INSERT INTO users (balance) VALUES ($1)", [
          user.balance,
        ]);
      }
      console.log("Mock users created successfully");
    } else {
      console.log("Users table is not empty");
    }
  } catch (err) {
    console.error("Error creating mock users:", err);
  } finally {
    await pool.end();
  }
};
