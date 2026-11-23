const $ = s => document.querySelector(s);

async function api(url, opts = {}) {
    const res = await fetch("/api" + url);
    return res.json();
}

async function boot() {
    const data = await api("/hello");

    $("#app").innerHTML = `
        <div class="box">
            <span class="badge">${data.status}</span>
            <h1>${data.appName}</h1>
            <p>Welcome, <b>${data.sampleUser}</b>. Your frontend and backend are talking.</p>
            <div class="card">
                <div>Sample Wallet Balance</div>
                <h2>₹${data.balance.toLocaleString("en-IN")}</h2>
            </div>
        </div>
    `;
}

boot();