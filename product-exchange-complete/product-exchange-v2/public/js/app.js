const $ = s => document.querySelector(s),
    state = { user: null, page: "Dashboard", data: null, products: [], variants: [], orders: [], offers: [] };

async function api(url, opts = {}) {
    const r = await fetch("/api" + url, {
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            ...(opts.headers || {})
        },
        ...opts
    });
    let d = {};
    try {
        d = await r.json();
    } catch { }
    if (!r.ok) throw Error(d.error || "Request failed");
    return d;
}
function toast(msg, error = false) {
    const el = document.createElement("div");
    el.className = "toast" + (error ? " error" : "");
    el.textContent = msg;
    document.body.append(el);
    setTimeout(() => el.remove(), 3200);
}
function esc(s) {
        return String(s ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "'"
    }[c]));
}


async function boot() {
    try {
        const d = await api("/auth/me");
        state.user = d.user;
        if (state.user) {
            render();
        } else {
            loginView();
        }
    } catch {
        loginView();
    }
}

function loginView(register = false) {
    $("#app").innerHTML = `
        <div class="auth-wrap">
            <div class="auth-card">
                <div class="brand"><span class="brand-mark">PX</span> Product Exchange</div>
                <h1>${register ? "Create account" : "Welcome back"}</h1>
                <p class="muted">${register ? "Join the local product trading marketplace." : "Sign in to manage your marketplace activity."}</p>
                <form id="authForm">
                    <div class="field">
                        <label>Username</label>
                        <input name="username" required minlength="3" autocomplete="username" placeholder="e.g. trader1">
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input name="password" type="password" required minlength="${register ? 8 : 1}" autocomplete="${register ? "new-password" : "current-password"}" placeholder="Enter password">
                    </div>
                    <button class="btn full">${register ? "Create account" : "Sign in"}</button>
                </form>
                <div class="auth-foot">
                    ${register ? "Already have an account?" : "New to the marketplace?"}
                    <span class="link" id="toggleAuth">${register ? "Sign in" : "Create account"}</span>
                </div>
                ${register ? "" : '<div class="notice">Demo login: trader1 / password123 · trader2 / password123 · trader3 / password123</div>'}
            </div>
        </div>
    `;

    $("#toggleAuth").onclick = () => loginView(!register);
    $("#authForm").onsubmit = async e => {
        e.preventDefault();
        const f = new FormData(e.target);
        try {
            const d = await api(register ? "/auth/register" : "/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    username: f.get("username"),
                    password: f.get("password")
                })
            });
            state.user = d.user;
            await boot();
        } catch (err) {
            toast(err.message, true);
        }
    };
}

// Temporary Step 2A placeholder before adding Sidebar Shell in Step 2B
function render() {
    $("#app").innerHTML = `
        <div class="auth-wrap">
            <div class="auth-card">
                <div class="brand"><span class="brand-mark">PX</span> Product Exchange</div>
                <h2>Signed in as ${esc(state.user.username)}</h2>
                <p class="muted">User ID: ${esc(state.user.id)}</p>
                <button class="btn secondary full" id="logout">Logout</button>
            </div>
        </div>
    `;
    $("#logout").onclick = async () => {
        await api("/auth/logout", { method: "POST" });
        state.user = null;
        loginView();
    };
}

boot();
