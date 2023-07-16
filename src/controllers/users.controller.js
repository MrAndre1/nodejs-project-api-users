import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: "User Not Found",
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (username, password) VALUES(?,?)",
      [username, password]
    );
    res.json({
      message: "New User Created",
      body: [
        {
          id: rows.insertId,
          username,
          password,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE users SET username = IFNULL(?, username), password = IFNULL(?, password) WHERE id = ?",
      [username, password, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "User Not Found",
      });
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "User Not Found",
      });
    res.json({
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
