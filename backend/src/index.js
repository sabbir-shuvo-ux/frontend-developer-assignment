const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get users with pagination
app.get("/api/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const countResult = await db.query("SELECT COUNT(*) FROM users");
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      "SELECT id, first_name, last_name, email FROM users ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    res.json({
      data: result.rows,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single user
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
