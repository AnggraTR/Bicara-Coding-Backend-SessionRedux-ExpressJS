const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true
}));
app.use(bodyParser.json());

app.use(session({
  secret: "rahasia",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // pakai secure: true kalau pakai HTTPS
}));

// Simulasi data user
const USER_DUMMY = {
  email: "user@mail.com",
  password: "123456",
  name: "Bagas Anggra"
};

// Route Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === USER_DUMMY.email && password === USER_DUMMY.password) {
    req.session.user = { email, name: USER_DUMMY.name };
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: "Login gagal" });
  }
});

// Route cek session
app.get("/check-session", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
