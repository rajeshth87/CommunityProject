require("dotenv").config();
const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const DATA = path.join(__dirname, "data");
const PUBLIC = path.join(__dirname, "public");
const FILES = ["participants","products","product_variants","wallets","portfolios","buy_orders","sell_orders","offers","transactions","wallet_ledger","portfolio_ledger","notifications"];
const id = prefix => `${prefix}_${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`;
const now = () => new Date().toISOString();
let writeQueue = Promise.resolve();

const seed = {
  participants: [],
  products: [
    {id:"PROD001",name:"Mango",category:"Fruits",description:"Fresh seasonal mangoes"},
    {id:"PROD002",name:"Apple",category:"Fruits",description:"Crisp apples"},
    {id:"PROD003",name:"Banana",category:"Fruits",description:"Fresh bananas"},
    {id:"PROD004",name:"Orange",category:"Fruits",description:"Juicy oranges"}
  ],
  product_variants: [
    {id:"VAR001",productId:"PROD001",name:"Mango 1 KG",unit:"pack"},{id:"VAR002",productId:"PROD001",name:"Mango 3 KG",unit:"pack"},{id:"VAR003",productId:"PROD001",name:"Mango 5 KG",unit:"pack"},
    {id:"VAR004",productId:"PROD002",name:"Apple 1 KG",unit:"pack"},{id:"VAR005",productId:"PROD002",name:"Apple 3 KG",unit:"pack"},{id:"VAR006",productId:"PROD002",name:"Apple 5 KG",unit:"pack"},
    {id:"VAR007",productId:"PROD003",name:"Banana 1 Dozen",unit:"pack"},{id:"VAR008",productId:"PROD003",name:"Banana 2 Dozen",unit:"pack"},{id:"VAR009",productId:"PROD003",name:"Banana 5 Dozen",unit:"pack"},
    {id:"VAR010",productId:"PROD004",name:"Orange 1 KG",unit:"pack"},{id:"VAR011",productId:"PROD004",name:"Orange 3 KG",unit:"pack"}
  ],
  wallets: [], portfolios: [], buy_orders: [], sell_orders: [], offers: [], transactions: [], wallet_ledger: [], portfolio_ledger: [], notifications: []
};

async function initData() {
  fs.mkdirSync(DATA,{recursive:true});
  for (const name of FILES) {
    const p = path.join(DATA, name+".json");
    if (!fs.existsSync(p)) fs.writeFileSync(p, JSON.stringify(seed[name] || [],null,2));
  }
  const participants = read("participants");
  if (!participants.length) {
    for (const [username, password] of [["trader1","password123"],["trader2","password123"],["trader3","password123"]]) {
      participants.push({id:id("usr"),username,passwordHash:await bcrypt.hash(password,10),createdAt:now()});
    }
    writeDirect("participants",participants);
    for (const u of participants) {
      writeDirect("wallets",[...read("wallets"),{participantId:u.id,balance:50000,reserved:0,totalPurchases:0,totalSales:0}]);
    }
    const p = read("portfolios");
    const holdings = [[["VAR001",100],["VAR002",20],["VAR004",50],["VAR007",30]],[["VAR001",100],["VAR005",20],["VAR008",25]],[["VAR003",15],["VAR004",40],["VAR010",35]]];
    participants.forEach((u,i)=>holdings[i].forEach(([variantId,quantity])=>p.push({participantId:u.id,variantId,quantity,reserved:0,averagePrice:90})));
    writeDirect("portfolios",p);
    const sell = {id:id("ord"),participantId:participants[1].id,type:"SELL",variantId:"VAR001",quantity:20,remaining:20,price:120,description:"Fresh mango stock",status:"OPEN",createdAt:now()};
    const buy = {id:id("ord"),participantId:participants[0].id,type:"BUY",variantId:"VAR004",quantity:10,remaining:10,price:95,description:"Looking for quality apples",status:"OPEN",createdAt:now()};
    writeDirect("sell_orders",[sell]); writeDirect("buy_orders",[buy]);
  }
}
function read(name){ return JSON.parse(fs.readFileSync(path.join(DATA,name+".json"),"utf8")); }
function writeDirect(name,data){ fs.writeFileSync(path.join(DATA,name+".json"),JSON.stringify(data,null,2)); }
function save(name,data){ writeQueue = writeQueue.then(()=>{const target=path.join(DATA,name+".json"),tmp=target+".tmp";fs.writeFileSync(tmp,JSON.stringify(data,null,2));fs.renameSync(tmp,target);});return writeQueue; }
async function updateMany(changes){ writeQueue=writeQueue.then(()=>{for(const [name,data] of Object.entries(changes)){const target=path.join(DATA,name+".json"),tmp=target+".tmp";fs.writeFileSync(tmp,JSON.stringify(data,null,2));fs.renameSync(tmp,target);}});return writeQueue; }
const money = n => Math.round((Number(n)+Number.EPSILON)*100)/100;
const num = (v,label,min=0)=>{const n=Number(v);if(!Number.isFinite(n)||n<=min)throw new Error(`${label} must be greater than ${min}`);return n;};
const userById = uid => read("participants").find(x=>x.id===uid);
const walletOf = uid => read("wallets").find(x=>x.participantId===uid);
const portfolioOf = (uid,vid) => read("portfolios").find(x=>x.participantId===uid&&x.variantId===vid);
const notify = (list,uid,message,type="info")=>list.push({id:id("ntf"),participantId:uid,message,type,read:false,createdAt:now()});
function auth(req,res,next){if(!req.session.userId)return res.status(401).json({error:"Please log in to continue."});req.user=userById(req.session.userId);if(!req.user){req.session.destroy(()=>{});return res.status(401).json({error:"Session expired."});}next();}
function asyncRoute(fn){return (req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);}
app.use(helmet({contentSecurityPolicy:false}));
app.use(express.json({limit:"1mb"}));
app.use(session({secret:process.env.SESSION_SECRET||"local-dev-secret-change-me",resave:false,saveUninitialized:false,cookie:{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",maxAge:8*60*60*1000}}));

app.post("/api/auth/register",asyncRoute(async(req,res)=>{
  const username=String(req.body.username||"").trim().toLowerCase(),password=String(req.body.password||"");
  if(!/^[a-z0-9_]{3,24}$/.test(username)||password.length<8)return res.status(400).json({error:"Username must be 3–24 letters/numbers/underscores and password at least 8 characters."});
  const users=read("participants");if(users.some(u=>u.username===username))return res.status(409).json({error:"Username already exists."});
  const u={id:id("usr"),username,passwordHash:await bcrypt.hash(password,10),createdAt:now()};
  const wallets=read("wallets");wallets.push({participantId:u.id,balance:50000,reserved:0,totalPurchases:0,totalSales:0});
  await updateMany({participants:[...users,u],wallets});req.session.userId=u.id;res.status(201).json({user:{id:u.id,username:u.username}});
}));
app.post("/api/auth/login",asyncRoute(async(req,res)=>{
  const username=String(req.body.username||"").trim().toLowerCase(),u=read("participants").find(x=>x.username===username);
  if(!u||!await bcrypt.compare(String(req.body.password||""),u.passwordHash))return res.status(401).json({error:"Invalid username or password."});
  req.session.userId=u.id;res.json({user:{id:u.id,username:u.username}});
}));
app.post("/api/auth/logout",(req,res)=>req.session.destroy(()=>res.json({ok:true})));
app.get("/api/auth/me",(req,res)=>{const u=req.session.userId&&userById(req.session.userId);res.json({user:u?{id:u.id,username:u.username}:null});});

app.get("/api/products",auth,(req,res)=>res.json({products:read("products"),variants:read("product_variants")}));
app.get("/api/products/:id/variants",auth,(req,res)=>res.json({variants:read("product_variants").filter(v=>v.productId===req.params.id)}));

app.get("/api/dashboard",auth,(req,res)=>{
 const uid=req.user.id,w=walletOf(uid),portfolio=read("portfolios").filter(p=>p.participantId===uid).map(p=>({...p,variant:read("product_variants").find(v=>v.id===p.variantId),product:read("products").find(x=>x.id===read("product_variants").find(v=>v.id===p.variantId)?.productId)}));
 const orders=[...read("buy_orders"),...read("sell_orders")].filter(o=>o.participantId===uid);
 const offers=read("offers").filter(o=>o.fromId===uid||o.toId===uid);
 const transactions=read("transactions").filter(t=>t.buyerId===uid||t.sellerId===uid).slice(-8).reverse();
 const notifications=read("notifications").filter(n=>n.participantId===uid).slice(-10).reverse();
 res.json({wallet:{...w,available:money(w.balance-w.reserved)},portfolio,orders,offers,transactions,notifications});
});
app.get("/api/orders",auth,(req,res)=>{
 let orders=[...read("buy_orders"),...read("sell_orders")];
 const {type,productId,variantId,status,participant,minPrice,maxPrice,minQty}=req.query;
 orders=orders.filter(o=>o.participantId!==req.user.id&&o.remaining>0);
 if(type)orders=orders.filter(o=>o.type===type.toUpperCase());if(variantId)orders=orders.filter(o=>o.variantId===variantId);
 if(productId){const ids=read("product_variants").filter(v=>v.productId===productId).map(v=>v.id);orders=orders.filter(o=>ids.includes(o.variantId));}
 if(status)orders=orders.filter(o=>o.status===status);if(participant)orders=orders.filter(o=>userById(o.participantId)?.username.includes(participant.toLowerCase()));
 if(minPrice)orders=orders.filter(o=>o.price>=Number(minPrice));if(maxPrice)orders=orders.filter(o=>o.price<=Number(maxPrice));if(minQty)orders=orders.filter(o=>o.remaining>=Number(minQty));
 res.json({orders:orders.map(o=>({...o,username:userById(o.participantId)?.username,variant:read("product_variants").find(v=>v.id===o.variantId)}))});
});
app.get("/api/orders/mine",auth,(req,res)=>res.json({orders:[...read("buy_orders"),...read("sell_orders")].filter(o=>o.participantId===req.user.id)}));
app.post("/api/orders",auth,asyncRoute(async(req,res)=>{
 const type=String(req.body.type||"").toUpperCase(),variantId=String(req.body.variantId||"");
 if(!["BUY","SELL"].includes(type)||!read("product_variants").some(v=>v.id===variantId))return res.status(400).json({error:"Select a valid order type and product variant."});
 const quantity=num(req.body.quantity,"Quantity"),price=num(req.body.price,"Price"),total=money(quantity*price),uid=req.user.id;
 const buys=read("buy_orders"),sells=read("sell_orders"),wallets=read("wallets"),portfolios=read("portfolios");
 if(type==="BUY"){const w=wallets.find(x=>x.participantId===uid);if(w.balance-w.reserved<total)return res.status(400).json({error:"Insufficient available wallet balance."});w.reserved=money(w.reserved+total);}
 else {const p=portfolios.find(x=>x.participantId===uid&&x.variantId===variantId);if(!p||p.quantity-p.reserved<quantity)return res.status(400).json({error:"Insufficient available stock."});p.reserved=money(p.reserved+quantity);}
 const order={id:id("ord"),participantId:uid,type,variantId,quantity,remaining:quantity,price,description:String(req.body.description||"").slice(0,300),status:"OPEN",createdAt:now()};
 await updateMany({wallets,portfolios,[type==="BUY"?"buy_orders":"sell_orders"]:[...(type==="BUY"?buys:sells),order]});res.status(201).json({order});
}));
app.post("/api/orders/:id/cancel",auth,asyncRoute(async(req,res)=>{
 const buys=read("buy_orders"),sells=read("sell_orders"),o=[...buys,...sells].find(x=>x.id===req.params.id);
 if(!o||o.participantId!==req.user.id)return res.status(404).json({error:"Order not found."});
 if(!["OPEN","PARTIALLY_FILLED","NEGOTIATION"].includes(o.status))return res.status(400).json({error:"This order cannot be cancelled."});
 if(o.type==="BUY"){const w=walletOf(o.participantId);w.reserved=money(Math.max(0,w.reserved-o.remaining*o.price));}
 else {const p=portfolioOf(o.participantId,o.variantId);if(p)p.reserved=Math.max(0,p.reserved-o.remaining);}
 o.status="CANCELLED";await updateMany({wallets:read("wallets"),portfolios:read("portfolios"),buy_orders:buys,sell_orders:sells});res.json({ok:true});
}));

app.get("/api/offers",auth,(req,res)=>res.json({offers:read("offers").filter(o=>o.fromId===req.user.id||o.toId===req.user.id).map(o=>({...o,fromUsername:userById(o.fromId)?.username,toUsername:userById(o.toId)?.username}))}));
app.post("/api/offers",auth,asyncRoute(async(req,res)=>{
 const all=[...read("buy_orders"),...read("sell_orders")],order=all.find(o=>o.id===req.body.orderId);
 if(!order||order.participantId===req.user.id||!["OPEN","PARTIALLY_FILLED","NEGOTIATION"].includes(order.status))return res.status(400).json({error:"Order is unavailable for negotiation."});
 const quantity=num(req.body.quantity,"Offer quantity"),price=num(req.body.price,"Offer price");
 if(quantity>order.remaining)return res.status(400).json({error:"Offer quantity exceeds remaining order quantity."});
 const offer={id:id("off"),orderId:order.id,orderType:order.type,variantId:order.variantId,fromId:req.user.id,toId:order.participantId,quantity,price,status:"PENDING",history:[{by:req.user.id,quantity,price,action:"OFFER",at:now()}],createdAt:now()};
 const offers=read("offers");offers.push(offer);order.status="NEGOTIATION";
 const buys=read("buy_orders"),sells=read("sell_orders");(order.type==="BUY"?buys:sells).find(x=>x.id===order.id).status="NEGOTIATION";
 const notifications=read("notifications");notify(notifications,order.participantId,`New offer received for order ${order.id}.`,"offer");
 await updateMany({offers,buy_orders:buys,sell_orders:sells,notifications});res.status(201).json({offer});
}));
async function respondOffer(req,res,action){
 const offers=read("offers"),o=offers.find(x=>x.id===req.params.id);
 if(!o)return res.status(404).json({error:"Offer not found."});
 if(o.status!=="PENDING"||o.toId!==req.user.id)return res.status(400).json({error:"This offer is not awaiting your response."});
 if(action==="REJECT"){o.status="REJECTED";o.history.push({by:req.user.id,action:"REJECT",at:now()});await save("offers",offers);return res.json({offer:o});}
 if(action==="COUNTER"){
  const q=num(req.body.quantity,"Quantity"),p=num(req.body.price,"Price");if(q>o.quantity && q>([...read("buy_orders"),...read("sell_orders")].find(x=>x.id===o.orderId)?.remaining||0))return res.status(400).json({error:"Counter quantity exceeds order remainder."});
  const previousSender=o.fromId;o.fromId=req.user.id;o.toId=previousSender;o.quantity=q;o.price=p;o.status="PENDING";o.history.push({by:req.user.id,quantity:q,price:p,action:"COUNTER",at:now()});
  const n=read("notifications");notify(n,o.toId,"You received a counteroffer.","offer");await updateMany({offers,notifications:n});return res.json({offer:o});
 }
 const buys=read("buy_orders"),sells=read("sell_orders"),order=[...buys,...sells].find(x=>x.id===o.orderId);
 if(!order||order.remaining<o.quantity||order.status==="CANCELLED"||order.status==="COMPLETED")return res.status(409).json({error:"Order is no longer available."});
 const counterpartyId=o.fromId===order.participantId?o.toId:o.fromId;
 const buyerId=order.type==="BUY"?order.participantId:counterpartyId;
 const sellerId=order.type==="SELL"?order.participantId:counterpartyId;
 if(buyerId===sellerId)return res.status(400).json({error:"Buyer and seller must be different participants."});
 const wallets=read("wallets"),portfolios=read("portfolios"),buyer=wallets.find(w=>w.participantId===buyerId),seller=wallets.find(w=>w.participantId===sellerId);
 const amount=money(o.quantity*o.price),sellerStock=portfolios.find(p=>p.participantId===sellerId&&p.variantId===o.variantId);
 if(!buyer||!seller||!sellerStock)return res.status(400).json({error:"Buyer wallet or seller stock is unavailable."});
 const buyerReserved=order.type==="BUY"?money(o.quantity*order.price):0;
 if(order.type==="BUY"){buyer.reserved=money(Math.max(0,buyer.reserved-buyerReserved));}
 if(buyer.balance<amount||buyer.balance-buyer.reserved<amount)return res.status(400).json({error:"Buyer has insufficient available funds."});
 if(order.type==="SELL")sellerStock.reserved=Math.max(0,sellerStock.reserved-o.quantity);
 if(sellerStock.quantity-sellerStock.reserved<o.quantity)return res.status(400).json({error:"Seller has insufficient available stock."});
 buyer.balance=money(buyer.balance-amount);seller.balance=money(seller.balance+amount);buyer.totalPurchases=money((buyer.totalPurchases||0)+amount);seller.totalSales=money((seller.totalSales||0)+amount);
 sellerStock.quantity-=o.quantity;
 let buyerStock=portfolios.find(p=>p.participantId===buyerId&&p.variantId===o.variantId);
 if(!buyerStock){buyerStock={participantId:buyerId,variantId:o.variantId,quantity:0,reserved:0,averagePrice:0};portfolios.push(buyerStock);}
 const oldValue=buyerStock.quantity*buyerStock.averagePrice;buyerStock.quantity+=o.quantity;buyerStock.averagePrice=money((oldValue+amount)/buyerStock.quantity);
 order.remaining-=o.quantity;order.status=order.remaining===0?"COMPLETED":"PARTIALLY_FILLED";
 if(order.type==="BUY"){const refund=money(o.quantity*order.price-amount);buyer.balance=money(buyer.balance+refund);}
 const transactions=read("transactions"),tx={id:id("txn"),offerId:o.id,orderId:o.id,buyerId,sellerId,variantId:o.variantId,quantity:o.quantity,price:o.price,amount,createdAt:now()};transactions.push(tx);
 const wl=read("wallet_ledger");wl.push({id:id("wlt"),participantId:buyerId,type:"PURCHASE",amount:-amount,balance:buyer.balance,reference:tx.id,createdAt:now()},{id:id("wlt"),participantId:sellerId,type:"SALE",amount,balance:seller.balance,reference:tx.id,createdAt:now()});
 const pl=read("portfolio_ledger");pl.push({id:id("plt"),participantId:sellerId,variantId:o.variantId,change:-o.quantity,reference:tx.id,createdAt:now()},{id:id("plt"),participantId:buyerId,variantId:o.variantId,change:o.quantity,reference:tx.id,createdAt:now()});
 o.status="EXECUTED";o.history.push({by:req.user.id,action:"ACCEPT_AND_EXECUTE",at:now()});
 const notifications=read("notifications");notify(notifications,buyerId,`Trade completed: ${o.quantity} units for ₹${amount}.`,"success");notify(notifications,sellerId,`Trade completed: ${o.quantity} units for ₹${amount}.`,"success");
 await updateMany({offers,wallets,portfolios,buy_orders:buys,sell_orders:sells,transactions,wallet_ledger:wl,portfolio_ledger:pl,notifications});res.json({offer:o,transaction:tx});
}
app.post("/api/offers/:id/accept",auth,asyncRoute((req,res)=>respondOffer(req,res,"ACCEPT")));
app.post("/api/offers/:id/reject",auth,asyncRoute((req,res)=>respondOffer(req,res,"REJECT")));
app.post("/api/offers/:id/counter",auth,asyncRoute((req,res)=>respondOffer(req,res,"COUNTER")));

app.get("/api/wallet",auth,(req,res)=>{const w=walletOf(req.user.id);res.json({...w,available:money(w.balance-w.reserved)});});
app.get("/api/wallet/ledger",auth,(req,res)=>res.json({ledger:read("wallet_ledger").filter(x=>x.participantId===req.user.id).reverse()}));
app.get("/api/portfolio",auth,(req,res)=>res.json({portfolio:read("portfolios").filter(x=>x.participantId===req.user.id).map(p=>({...p,variant:read("product_variants").find(v=>v.id===p.variantId)}))}));
app.get("/api/transactions",auth,(req,res)=>res.json({transactions:read("transactions").filter(t=>t.buyerId===req.user.id||t.sellerId===req.user.id).reverse().map(t=>({...t,buyer:userById(t.buyerId)?.username,seller:userById(t.sellerId)?.username}))}));
app.get("/api/transactions/:id",auth,(req,res)=>{const t=read("transactions").find(x=>x.id===req.params.id&&(x.buyerId===req.user.id||x.sellerId===req.user.id));t?res.json(t):res.status(404).json({error:"Transaction not found."});});
app.get("/api/notifications",auth,(req,res)=>res.json({notifications:read("notifications").filter(n=>n.participantId===req.user.id).reverse()}));
app.post("/api/notifications/:id/read",auth,asyncRoute(async(req,res)=>{const n=read("notifications"),item=n.find(x=>x.id===req.params.id&&x.participantId===req.user.id);if(item)item.read=true;await save("notifications",n);res.json({ok:true});}));

app.use(express.static(PUBLIC));
app.get("*",(req,res)=>res.sendFile(path.join(PUBLIC,"index.html")));
app.use((err,req,res,next)=>{console.error(err);res.status(400).json({error:err.message||"Unexpected server error."});});
initData().then(()=>app.listen(PORT,"0.0.0.0",()=>console.log(`Product Exchange running at http://localhost:${PORT}`))).catch(err=>{console.error("Startup failed:",err);process.exit(1);});
