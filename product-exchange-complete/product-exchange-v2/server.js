const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const helmet = require("helmet");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const DATA = path.join(__dirname, "data");
const FILES = ["participants", "wallets"];
let writeQueue = Promise.resolve();
const id = prefix => `${prefix}_${crypto.randomBytes(4).toString("hex")}`;
const now = () => new Date().toISOString();

const seed = {
    participants: [],
    wallets: []
};

async function initData() {
    fs.mkdirSync(DATA, { recursive: true });
    for (const name of FILES) {
        const p = path.join(DATA, name + ".json");
        if (!fs.existsSync(p)) {
            fs.writeFileSync(p, JSON.stringify(seed[name] || [], null, 2));
        }
    }
    const participants = read("participants");
    if (!participants.length) {
        for (const [username, password] of [
            ["trader1", "password123"],
            ["trader2", "password123"],
            ["trader3", "password123"]
        ]) {
            participants.push({
                id: id("usr"),
                username,
                passwordHash: await bcrypt.hash(password, 10),
                createdAt: now()
            });
        }
        writeDirect("participants", participants);
        for (const u of participants) {
            writeDirect("wallets", [
                ...read("wallets"),
                { participantId: u.id, balance: 50000, reserved: 0, totalPurchases: 0, totalSales: 0 }
            ]);
        }
    }
}

function read(name) {
    return JSON.parse(fs.readFileSync(path.join(DATA, name + ".json"), "utf8"));
}

function writeDirect(name, data) {
    fs.writeFileSync(path.join(DATA, name + ".json"), JSON.stringify(data, null, 2));
}

async function updateMany(changes) {
    writeQueue = writeQueue.then(() => {
        for (const [name, data] of Object.entries(changes)) {
            const target = path.join(DATA, name + ".json"),
                tmp = target + ".tmp";
            fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
            fs.renameSync(tmp, target);
        }
    });
    return writeQueue;
}

const userById = uid => read("participants").find(x => x.id === uid);

function asyncRoute(fn) {
    return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "1mb" }));
app.use(session({
    secret: process.env.SESSION_SECRET || "local-dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 8 * 60 * 60 * 1000
    }
}));

// Silence Chrome DevTools & favicon 404s
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => res.status(204).end());
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use(express.static(path.join(__dirname, "public")));

// Auth Routes
app.post("/api/auth/register", asyncRoute(async (req, res) => {
    const username = String(req.body.username || "").trim().toLowerCase(),
        password = String(req.body.password || "");
    if (!/^[a-z0-9_]{3,24}$/.test(username) || password.length < 8) {
        return res.status(400).json({
            error: "Username must be 3–24 letters/numbers/underscores and password at least 8 characters."
        });
    }
    const users = read("participants");
    if (users.some(u => u.username === username)) {
        return res.status(409).json({ error: "Username already exists." });
    }
    const u = {
        id: id("usr"),
        username,
        passwordHash: await bcrypt.hash(password, 10),
        createdAt: now()
    };
    const wallets = read("wallets");
    wallets.push({ participantId: u.id, balance: 50000, reserved: 0, totalPurchases: 0, totalSales: 0 });
    await updateMany({ participants: [...users, u], wallets });
    req.session.userId = u.id;
    res.status(201).json({ user: { id: u.id, username: u.username } });
}));

app.post("/api/auth/login", asyncRoute(async (req, res) => {
    const username = String(req.body.username || "").trim().toLowerCase(),
        u = read("participants").find(x => x.username === username);
    if (!u || !await bcrypt.compare(String(req.body.password || ""), u.passwordHash)) {
        return res.status(401).json({ error: "Invalid username or password." });
    }
    req.session.userId = u.id;
    res.json({ user: { id: u.id, username: u.username } });
}));

app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
});

app.get("/api/auth/me", (req, res) => {
    const u = req.session.userId && userById(req.session.userId);
    res.json({ user: u ? { id: u.id, username: u.username } : null });
});

initData().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
