<a id="line-71"></a>
## [Jump to Section How to Run Project](#line-70)
# Prompt:
```text
Help me write a prompt to Build a simple light weight project using AI

Platform
Ubuntu 22.04

Browser
Google Chrome

Backend/Database/Frontend/Hosting
Supabase/AWS/Hybrid

Application/Business Logic:
Product exchange Buy or Sell
Login as Participant
view existing products to Buy
Create items for existing set of products (Set Price etc) to sell - example Product Mango - items(Mango 1Kg, Mango 3 KG) Product Apple - Apple (Apple 1KG Apple 3KG)
Crete a logic to negotiate price between buyer and seller

use filters for filtering launched sell and buy orders
example all launched  Mango orders to sell
example all launched  Apple orders to buy

Once order is executed logic to change order state to Sold state

Participant Dashboard showing offers and orders and stocks
Place Buy order only if trader has enough Money
Place Sell order only if trater has enough Stock
porfolio Showing curent stock
Wallet having Money to do trading
Profit automatically will be added to wallet balance

Tab to show stock poertfolio

```
# Design General
## Supabase
<p align="center">
  <img src="diagram.svg" alt="Alt Text" width="800" />
</p>
## AWS
<p align="center">
  <img src="diagram (1).svg" alt="Alt Text" width="800" />
</p>
## Supabase Product Exchange
<p align="center">
  <img src="diagram (2).svg" alt="Alt Text" width="800" />
</p>

```
[ React / Next.js Frontend ]
       │
       ├──► [ Supabase Auth ] ─────────► Registration, Login, JWT Sessions
       │
       ├──► [ Supabase PostgREST ] ────► Read Products, Variants, Order Book, History
       │     (Protected by RLS)
       │
       ├──► [ Supabase Realtime ] ─────► Live updates for Buy/Sell Orders & Negotiations
       │
       └──► [ Postgres RPC Functions ] ► Atomic Trade Execution & Wallet Transfers
             (PL/pgSQL Transactions)        (Swappable Payment Adapter Layer)
```

## aws product exchange
<p align="center">
  <img src="diagram (3).svg" alt="Alt Text" width="800" />
</p>

```
[ React / Next.js Frontend ]  (Hosted on AWS Amplify or S3 + CloudFront)
       │
       ├──► [ Amazon Cognito ] ────────► User Registration, Login, JWT Tokens
       │
       ├──► [ AWS API Gateway / ALB ] ─► HTTPS & WebSocket Routing
       │           │
       │           ▼
       │    [ ECS Fargate (Containers) ] ► Your Backend API (Node.js / Spring Boot / FastAPI)
       │           │                        ├── REST APIs (Orders, Products, History)
       │           │                        ├── WebSocket Server (Live Order Book & Offers)
       │           │                        └── Payment Adapter Module (Virtual -> Hyperswitch)
       │           │
       │           ├──► [ Amazon RDS (PostgreSQL) ] ──► Primary Database (inside Private VPC)
       │           └──► [ Amazon ElastiCache (Redis) ] ► WebSocket Pub/Sub & Rate Limiting
       │
       └──► [ AWS Secrets Manager ] ───► Stores DB Credentials & Future Hyperswitch API Keys
```
## Payment adapter patttern
```
[ Trade / Top-Up Service ]
           │
           ▼
[ PaymentGatewayInterface ]  (createIntent, confirmSettlement, handleWebhook)
     ├──► VirtualWalletAdapter      <-- Active Now (Instant DB ledger credit/debit)
     └──► HyperswitchPaymentAdapter <-- Plug in Later (Calls Hyperswitch API + Webhook)
```


<a id="line-70"></a>
## [Back to Prompt ](#line-71)

## [Back to AI Generated Prompt to Build Project](#line-72)

## Key Differences in Day-to-Day Development supabase vs AWS

| Aspect | Supabase Full-Stack | AWS Full-Stack |
| :--- | :--- | :--- |
| **API Layer** | **Auto-generated.** Your frontend queries Postgres directly via the Supabase SDK, protected by database-level Row Level Security (RLS). | **Hand-coded.** You build and maintain custom REST/GraphQL endpoints in Express, Spring Boot, or FastAPI. |
| **Setup Time** | **Hours.** Auth, database, and storage work together out of the box on day one. | **Weeks.** Wiring Cognito, RDS, VPCs, API Gateway, and IAM policies takes significant setup. |
| **Team Required** | **1–3 Full-Stack Developers.** No dedicated DevOps needed. | **Frontend + Backend + DevOps/Cloud Engineer.** |
| **Flexibility** | **Opinionated.** Locked into Postgres and Deno/TypeScript for serverless functions. | **Unlimited.** Run Java, Python, Go, Docker containers, Kafka, Redis, or any database. |
| **Monthly Cost (Mid-Size)** | **~$25 – $150/mo** (Predictable Pro plan + compute add-ons). | **~$100 – $500+/mo** (RDS, NAT Gateway, Load Balancers, ECS, and Cognito add up quickly). |
