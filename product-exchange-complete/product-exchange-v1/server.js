const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({limit:"1mb"}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/hello",(req,res)=>{
  res.json({
        appName: "Product Exchange",
        status: "Connected to backend",
        sampleUser: "trader1",
        balance: 50000
    });
});

// Silence Chrome DevTools automatic workspace lookup
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
    res.status(204).end();
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});