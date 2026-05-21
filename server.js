const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS it_equipments (
        id SERIAL PRIMARY KEY,
        employee_name TEXT,
        employee_id TEXT,
        location TEXT,
        department TEXT,
        device_type TEXT,
        brand_model TEXT,
        sim_phone TEXT,
        remarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Table Ready");
  } catch (error) {
    console.error("Database Error:", error);
  }
};

createTable();

app.post("/submit", async (req, res) => {
  try {
    const {
      employee_name,
      employee_id,
      location,
      department,
      device_type,
      brand_model,
      sim_phone,
      remarks
    } = req.body;

    await pool.query(
      `INSERT INTO it_equipments
      (employee_name, employee_id, location, department, device_type, brand_model, sim_phone, remarks)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        employee_name,
        employee_id,
        location,
        department,
        device_type,
        brand_model,
        sim_phone,
        remarks
      ]
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.get("/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM it_equipments ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
