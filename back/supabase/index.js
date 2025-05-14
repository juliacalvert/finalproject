/*const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/api/criminal", async (req, res) => {
  const { data, error } = await supabase.from("criminal").select();
  if (error) return res.status(500).send(error);
  res.json(data);
});


app.post("/api/criminal", async (req, res) => {
  const { name, location, description, url } = req.body;


  if (!name || !location) {
    return res.status(400).json({ error: "Name and location are required." });
  }


  const insertData = { name, location };
  if (description) insertData.description = description;
  if (url) insertData.url = url;

  const { data, error } = await supabase.from("criminal").insert([insertData]);

  if (error) {
    console.error(error);
    return res.status(500).send(error);
  }

  res.status(201).json(data);
});


app.listen(port, () => console.log(`Server running on port ${port}`));*/






/*const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/api/criminals", async (req, res) => {
  const { data, error } = await supabase.from("criminals").select();
  if (error) return res.status(500).send(error);
  res.json(data);
});

app.post("/api/criminals", async (req, res) => {
  console.log('Adding criminal');
  const { name, location } = req.body;
  const { data, error } = await supabase.from("criminals").insert([{ name, location }]);
  if (error) return res.status(500).send(error);
  res.json(data);
});

app.listen(port, () => 
  console.log(`Server running on port ${port}`));*/





const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


app.get("/api/suspectInfo", async (req, res) => {
  const { data, error } = await supabase.from("suspectInfo").select();
  if (error) return res.status(500).send(error);
  res.json(data);
});


app.post("/api/suspectInfo", async (req, res) => {
  console.log("Adding suspect:", req.body);
  const { suspect_name, tip, date } = req.body;

  const { data, error } = await supabase
    .from("suspectInfo")
    .insert([{ suspect_name, tip, date }]);

  if (error) return res.status(500).send(error);
  res.json(data);
});

app.listen(port, () => 
  console.log(`Server running on port ${port}`));