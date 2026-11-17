<a id="line-71"></a>
## [Jump to Section How to Run Project](#line-70)
# Prompt:
```text
Help me write a prompt to Build a simple light weight project using AI

Platform
Ubuntu 22.04

Browser
Google Chrome

Backend
Node.js

Database
JSON Files

Frontend
HTML, CSS, JavaScript

Hosting
Local Computer

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

Below is a comprehensive AI Project Generation Prompt that you can give to ChatGPT, Claude, Gemini, or another AI coding assistant to build your application.

I have structured it as a proper software requirement specification so the AI understands the business logic, data structure, UI, trading workflow, and technical requirements before generating code.
<a id="line-72"></a>
## [Back to Prompt ](#line-71)

# AI Prompt: Local Product Exchange – Buy & Sell Marketplace

Project specification
Build a complete local Product Exchange Buy/Sell Marketplace using Node.js, Express, HTML, CSS, JavaScript and JSON file storage. Follow the complete specifications in the AI project prompt provided in this conversation.
Ready to use

# Product Exchange Platform

A locally hosted marketplace where registered participants can buy, sell, negotiate, and exchange products using virtual wallet balances and stock portfolios.

Platform

Ubuntu 22.04

Browser

Google Chrome

Backend

Node.js

Database

JSON Files

Frontend

HTML, CSS, JavaScript

Hosting

Local Computer

 Copy project summary

## 1. Complete AI development prompt

Copy the following prompt into your preferred AI coding assistant.

Writing

# PROJECT: LOCAL PRODUCT EXCHANGE – BUY & SELL MARKETPLACE

Act as a Senior Full-Stack Software Architect and Developer.

Design and develop a complete, functional Product Exchange Marketplace application where participants can buy and sell products, negotiate prices, manage stock portfolios, and execute transactions using virtual wallet balances.

The application must run locally on:

- Operating System: Ubuntu 22.04
- Browser: Google Chrome
- Backend: Node.js with Express.js
- Frontend: HTML5, CSS3, JavaScript
- Data Storage: JSON files instead of Google Sheets or any traditional database
- Application execution: Localhost

Do not use Google Apps Script, Google Sheets, Firebase, MySQL, PostgreSQL, or MongoDB.

The application should be modular, maintainable, responsive, and easy to extend.

---

# 2\. APPLICATION OBJECTIVE

Create a marketplace where multiple participants can:

1. Register and log in.
2. View available products and product variants.
3. View existing Buy Orders.
4. View existing Sell Orders.
5. Create new Buy Orders.
6. Create new Sell Orders.
7. Negotiate prices with other participants.
8. Accept or reject negotiated offers.
9. Execute transactions when both parties agree.
10. Maintain their wallet balance.
11. Maintain their stock portfolio.
12. View transaction history.

All transactions must update the buyer's wallet, seller's wallet, buyer's stock portfolio, and seller's stock portfolio correctly.

Use virtual money only. No actual payment gateway is required.

---

# 3\. TECHNOLOGY ARCHITECTURE

Use the following architecture:

Frontend:

- HTML
- CSS
- Vanilla JavaScript
- Fetch API for communicating with backend APIs

Backend:

- Node.js
- Express.js
- REST API architecture

Storage:

- JSON files
- Separate JSON files for participants, products, product variants, wallets, portfolios, orders, offers, and transactions.

The backend must handle all business logic.

Never allow frontend JavaScript to directly modify JSON files.

All data modifications must go through validated backend APIs.

---

# 4\. PARTICIPANT LOGIN AND AUTHENTICATION

Implement participant-based authentication.

Requirements:

- Participant login using username and password.
- Participant registration.
- Logout functionality.
- Maintain logged-in session.
- Protect dashboard and trading APIs.
- Each participant must have a unique participant ID.
- Passwords must be securely hashed using bcrypt.
- Use secure session handling.
- Do not store plaintext passwords in JSON files.

Provide sample participants for testing.

Example:

Participant 1:

- Username: trader1
- Password: password123
- Initial Wallet: ₹50,000

Participant 2:

- Username: trader2
- Password: password123
- Initial Wallet: ₹50,000

Participant 3:

- Username: trader3
- Password: password123
- Initial Wallet: ₹50,000

---

# 5\. PARTICIPANT DASHBOARD

After login, display a comprehensive participant dashboard.

The dashboard must contain the following sections:

A. Wallet Summary

- Available Wallet Balance.
- Total Purchase Amount.
- Total Sales Amount.
- Current Wallet Balance.
- Reserved Money for Pending Buy Orders, if applicable.

B. Existing Stocks Portfolio Display:

- Product Name.
- Product Variant.
- Available Quantity.
- Reserved Quantity.
- Total Quantity.
- Average Purchase Price.
- Current Market Price.
- Current Portfolio Value.

C. Existing Orders Display:

- Order ID.
- Product.
- Variant.
- Order Type (BUY / SELL).
- Quantity.
- Price Per Unit.
- Total Order Value.
- Order Status.
- Creation Date.

D. Existing Offers Display:

- Offer ID.
- Related Order ID.
- Buyer.
- Seller.
- Offered Price.
- Quantity.
- Offer Status.
- Accept / Reject options.

E. Recent Transactions Display completed purchase and sales transactions.

Use dashboard cards, tables, filters, badges, and clear status indicators.

---

# 6\. PRODUCT MASTER AND PRODUCT VARIANTS

Create a master product catalogue.

Example products:

Product 1:

- Product ID: PROD001
- Product Name: Mango
- Category: Fruits

Variants:

- Mango 1 KG
- Mango 3 KG
- Mango 5 KG

Product 2:

- Product ID: PROD002
- Product Name: Apple
- Category: Fruits

Variants:

- Apple 1 KG
- Apple 3 KG
- Apple 5 KG

Product 3:

- Product ID: PROD003
- Product Name: Banana
- Category: Fruits

Variants:

- Banana 1 Dozen
- Banana 2 Dozen
- Banana 5 Dozen

Product 4:

- Product ID: PROD004
- Product Name: Orange
- Category: Fruits

Variants:

- Orange 1 KG
- Orange 3 KG

Product variants must be independently tradable.

Participants can select a product and its variant when creating orders.

---

# 7\. WALLET MANAGEMENT

Every participant must start with a sample wallet balance.

Example:

- trader1: ₹50,000
- trader2: ₹50,000
- trader3: ₹50,000

Wallet rules:

1. Participants can buy only when sufficient available funds exist.
2. Participants can sell only when sufficient available stock exists.
3. Wallet balances must be updated immediately after successful transaction execution.
4. Maintain a complete wallet transaction ledger.
5. Never allow unauthorized negative available balances.
6. Pending Buy Orders should reserve funds when they are created.
7. Cancelling an order must release its reserved funds.
8. Avoid double deductions during transaction execution.

IMPORTANT BUYING UI REQUIREMENT:

While entering a Buy Order, display:

- Current Wallet Balance.
- Order Quantity.
- Price Per Unit.
- Total Purchase Value.
- Available Balance After Purchase.

Example:

Wallet Balance: ₹50,000

Product: Mango 1 KG

Quantity: 10

Price Per Unit: ₹100

Total Purchase Value: ₹1,000

Available Balance After Purchase: ₹49,000

Show a live balance calculation while the participant changes quantity or price.

If the participant does not have enough money, display a clear warning and disable order submission.

Also display the expected balance impact before the user confirms an offer.

---

# 8\. STOCK PORTFOLIO MANAGEMENT

Each participant must maintain an individual stock portfolio.

Example:

trader1:

- Mango 1 KG: 100 units
- Mango 3 KG: 20 units
- Apple 1 KG: 50 units
- Banana 1 Dozen: 30 units

Stock rules:

1. Participants can sell only stock available in their portfolio.
2. Selling quantity must not exceed available stock.
3. Pending Sell Orders should reserve the specified stock.
4. Cancelled Sell Orders must release reserved stock.
5. Completed Sell Orders must deduct stock from the seller.
6. Completed Buy Orders must add stock to the buyer.
7. Every portfolio change must be recorded in a transaction ledger.

IMPORTANT SELLING UI REQUIREMENT:

While creating a Sell Order, display:

- Available Stock.
- Reserved Stock.
- Sell Quantity.
- Remaining Available Stock.

Example:

Available Mango 1 KG: 100 units

Reserved Stock: 20 units

Available to Sell: 80 units

New Sell Order Quantity: 30 units

Remaining Available Stock: 50 units

Prevent selling more than the available stock.

---

# 9\. BUY ORDER MANAGEMENT

Participants can create Buy Orders.

Required fields:

- Product.
- Product Variant.
- Quantity.
- Maximum Price Per Unit.
- Total Order Value.
- Order Description.

Order statuses:

- OPEN
- PARTIALLY\_FILLED
- NEGOTIATION
- COMPLETED
- CANCELLED
- EXPIRED

All Buy Orders must be visible to other participants.

Participants should be able to filter Buy Orders by:

- Product.
- Product Variant.
- Price Range.
- Quantity.
- Participant.
- Order Status.

---

# 10\. SELL ORDER MANAGEMENT

Participants can create Sell Orders.

Required fields:

- Product.
- Product Variant.
- Quantity.
- Selling Price Per Unit.
- Total Selling Value.
- Order Description.

Order statuses:

- OPEN
- PARTIALLY\_FILLED
- NEGOTIATION
- COMPLETED
- CANCELLED
- EXPIRED

All Sell Orders must be visible to other participants.

Participants should be able to filter Sell Orders by:

- Product.
- Product Variant.
- Price Range.
- Quantity.
- Participant.
- Order Status.

---

# 11\. PRICE NEGOTIATION ENGINE

Implement a negotiation system between Buyers and Sellers.

Example:

Seller creates an order:

- Product: Mango 1 KG
- Quantity: 100
- Asking Price: ₹120 per unit

Buyer views the order and makes an offer:

- Offered Quantity: 20
- Offered Price: ₹100 per unit

Seller receives the offer.

Seller can:

1. Accept the offer.
2. Reject the offer.
3. Counter the offer with a different price.
4. Counter with a different quantity.

Buyer receives the counteroffer and can:

1. Accept.
2. Reject.
3. Submit another counteroffer.

Continue negotiation until both participants agree or the offer expires.

Negotiation requirements:

- Maintain complete offer history.
- Record who created each offer.
- Record timestamps.
- Record offered quantity and price.
- Show negotiation status.
- Notify participants about new offers and counteroffers through dashboard notifications.

Do not execute a transaction merely because an offer was submitted.

Execution must happen only after the appropriate acceptance and final validation.

---

# 12\. TRANSACTION EXECUTION ENGINE

This is one of the most important modules.

When a buyer accepts a seller's final offer:

1. Validate buyer wallet balance.
2. Validate seller stock availability.
3. Validate the order quantity.
4. Validate that the offer is still active.
5. Lock the relevant order and portfolio records during execution.
6. Deduct the purchase amount from the buyer.
7. Credit the seller with the purchase amount.
8. Deduct the sold quantity from the seller's portfolio.
9. Add the purchased quantity to the buyer's portfolio.
10. Update the order quantity and order status.
11. Create a transaction record.
12. Update the wallet ledger.
13. Update the stock portfolio ledger.
14. Mark the executed offer as ACCEPTED/EXECUTED.

Example:

Buyer: trader1

Seller: trader2

Product: Mango 1 KG

Quantity: 10

Agreed Price: ₹100 per unit

Transaction Amount: ₹1,000

Before Transaction:

trader1 Wallet: ₹50,000

trader2 Wallet: ₹50,000

trader2 Mango Stock: 100 units

After Transaction:

trader1 Wallet: ₹49,000

trader2 Wallet: ₹51,000

trader1 Mango Stock: 10 units

trader2 Mango Stock: 90 units

The operation must be atomic.

If any operation fails, revert all changes so that no partial transaction occurs.

Prevent duplicate execution, race conditions, overselling, and overspending.

---

# 13\. ORDER FILTERING AND SEARCH

Create separate Buy Orders and Sell Orders pages.

Examples:

When the user selects:

Product: Mango

Order Type: SELL

Display all launched Mango Sell Orders.

When the user selects:

Product: Apple

Order Type: BUY

Display all launched Apple Buy Orders.

Provide filters for:

- Product Name.
- Product Variant.
- Buy / Sell.
- Price Range.
- Minimum Quantity.
- Maximum Quantity.
- Participant.
- Order Status.

Include clear filters and search functionality.

Only display orders that are eligible for trading.

Do not show the logged-in participant's own orders as available orders to negotiate against, unless explicitly viewing their own order management page.

---

# 14\. JSON FILE STORAGE STRUCTURE

Create the following JSON files:

data/ participants.json products.json product\_variants.json wallets.json portfolios.json buy\_orders.json sell\_orders.json offers.json transactions.json wallet\_ledger.json portfolio\_ledger.json notifications.json sessions.json (only if required by the selected session implementation)

Requirements:

- Automatically create missing JSON files.
- Initialize files with sample data.
- Use a centralized JSON data access layer.
- Validate data before writing.
- Prevent simultaneous writes from corrupting JSON files.
- Use atomic file-writing techniques.
- Maintain backups or transaction recovery where appropriate.
- Use unique IDs for every participant, order, offer, and transaction.
- Do not store passwords in plaintext.

IMPORTANT: JSON files are suitable for local development and small-scale usage. Implement serialized writes, transaction locking, and recovery mechanisms. Explain the limitations if multiple server instances or high concurrent trading volumes are introduced.

---

# 15\. APPLICATION USER INTERFACE

Create a modern, professional trading marketplace interface.

Suggested navigation:

1. Dashboard
2. Product Catalogue
3. Buy Marketplace
4. Sell Marketplace
5. My Buy Orders
6. My Sell Orders
7. Negotiations
8. My Portfolio
9. Wallet
10. Transaction History
11. Notifications
12. Logout

Design requirements:

- Modern responsive dashboard.
- Professional trading-style interface.
- Clean tables.
- Summary cards.
- Search and filter controls.
- Modal windows for creating orders and offers.
- Live wallet calculations.
- Live stock availability calculations.
- Clear success and error messages.
- Confirmation before order cancellation and transaction execution.
- Mobile-friendly layout.

Use a consistent color system:

- Green: Buy / Success / Positive Balance.
- Red: Sell / Rejected / Insufficient Funds.
- Orange: Pending Negotiation.
- Grey: Cancelled / Inactive.
- Blue: Active Orders.

---

# 16\. PROJECT FOLDER STRUCTURE

Create a modular folder structure similar to:

product-exchange/ │ ├── server.js ├── package.json ├── README.md ├── .env.example │ ├── config/ │ └── config.js │ ├── data/ │ ├── participants.json │ ├── products.json │ ├── product\_variants.json │ ├── wallets.json │ ├── portfolios.json │ ├── buy\_orders.json │ ├── sell\_orders.json │ ├── offers.json │ ├── transactions.json │ ├── wallet\_ledger.json │ ├── portfolio\_ledger.json │ └── notifications.json │ ├── routes/ │ ├── authRoutes.js │ ├── dashboardRoutes.js │ ├── productRoutes.js │ ├── orderRoutes.js │ ├── offerRoutes.js │ ├── walletRoutes.js │ ├── portfolioRoutes.js │ └── transactionRoutes.js │ ├── services/ │ ├── authService.js │ ├── orderService.js │ ├── negotiationService.js │ ├── walletService.js │ ├── portfolioService.js │ └── transactionService.js │ ├── utils/ │ ├── jsonStorage.js │ ├── idGenerator.js │ ├── validation.js │ └── transactionLock.js │ └── public/ ├── index.html ├── login.html ├── dashboard.html ├── marketplace.html ├── portfolio.html ├── wallet.html ├── negotiations.html ├── transactions.html │ ├── css/ │ └── style.css │ └── js/ ├── api.js ├── auth.js ├── dashboard.js ├── marketplace.js ├── orders.js ├── negotiations.js ├── portfolio.js ├── wallet.js └── transactions.js

You may add more files if needed.

---

# 17\. REST API REQUIREMENTS

Create REST APIs for:

Authentication:

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

Dashboard:

- GET /api/dashboard

Products:

- GET /api/products
- GET /api/products/:id/variants

Orders:

- GET /api/orders
- POST /api/orders
- GET /api/orders/:id
- PUT /api/orders/:id
- POST /api/orders/:id/cancel

Offers:

- GET /api/offers
- POST /api/offers
- POST /api/offers/:id/accept
- POST /api/offers/:id/reject
- POST /api/offers/:id/counter

Wallet:

- GET /api/wallet
- GET /api/wallet/ledger

Portfolio:

- GET /api/portfolio

Transactions:

- GET /api/transactions
- GET /api/transactions/:id

Implement proper HTTP status codes, validation, authentication, authorization, and error handling.

---

# 18\. SAMPLE DATA INITIALIZATION

Automatically populate the application with:

Participants:

- trader1
- trader2
- trader3

Initial Wallet:

- ₹50,000 each.

Products:

- Mango
- Apple
- Banana
- Orange

Create appropriate variants for each product.

Add sample stock holdings to all three participants.

Add sample:

- Buy Orders.
- Sell Orders.
- Pending Offers.
- Completed Transactions.

Ensure sample data is logically consistent.

---

# 19\. TESTING REQUIREMENTS

Test all major scenarios.

Scenario 1: Successful Purchase

- Buyer has enough wallet balance.
- Seller has sufficient stock.
- Buyer accepts the agreed offer.
- Transaction executes successfully.
- Wallet and portfolio balances update correctly.

Scenario 2: Insufficient Wallet Balance

- Buyer attempts to place an order exceeding available funds.
- Application blocks the operation.
- Show insufficient funds message.

Scenario 3: Insufficient Stock

- Seller attempts to sell more than available stock.
- Application blocks the operation.
- Show insufficient stock message.

Scenario 4: Negotiation

- Buyer makes an offer.
- Seller submits a counteroffer.
- Buyer accepts.
- Transaction executes.

Scenario 5: Order Cancellation

- Participant cancels an open order.
- Reserved money or stock is released.

Scenario 6: Concurrent Transactions

- Two buyers attempt to purchase the same remaining stock.
- Only valid transactions execute.
- No overselling is allowed.

Scenario 7: Partial Execution

- A buyer purchases only part of a seller's order.
- Remaining quantity stays available.
- Order status becomes PARTIALLY\_FILLED.

Scenario 8: Duplicate Execution

- The same offer is submitted for execution twice.
- Only one transaction is recorded.

---

# 20\. DEVELOPMENT AND DELIVERY INSTRUCTIONS

Follow this development sequence:

PHASE 1: Design the architecture and JSON data structures.

PHASE 2: Create sample JSON files with consistent initial data.

PHASE 3: Create Node.js project and Express server.

PHASE 4: Implement authentication and session handling.

PHASE 5: Implement wallet and portfolio services.

PHASE 6: Implement Buy Orders and Sell Orders.

PHASE 7: Implement negotiation engine.

PHASE 8: Implement atomic transaction execution.

PHASE 9: Implement frontend dashboard and marketplace.

PHASE 10: Integrate all frontend and backend APIs.

PHASE 11: Test all business scenarios.

PHASE 12: Prepare installation and execution instructions for Ubuntu 22.04.

DELIVERY REQUIREMENTS:

1. Provide the complete source code.
2. Provide all JSON sample data files.
3. Provide package.json and dependencies.
4. Provide installation instructions.
5. Provide commands to start the application.
6. Provide sample login credentials.
7. Provide a complete README.md.
8. Ensure the application runs locally without requiring Google services or external databases.

Do not provide incomplete placeholder functions.

Do not omit files referenced by other files.

Do not simulate successful transactions on the frontend.

All financial and stock-related validation must happen on the backend.

Generate the application in manageable phases. First present the architecture, data models, and sample JSON files. Wait for approval before generating the backend. Then proceed to backend, frontend, and testing.

The final application must be fully functional, not just a UI prototype.

## 2. Important business logic decisions

I recommend adopting the following rules before development. They will prevent common trading errors.

| Feature | Recommended rule |
| --- | --- |
| Buy order | Reserve wallet funds |
| Sell order | Reserve stock quantity |
| Cancel order | Release reserved funds/stock |
| Accept offer | Validate both sides again |
| Execute trade | Update both wallets and portfolios |
| Partial purchase | Keep remaining order open |
| Completed order | Mark COMPLETED |
| Insufficient money | Reject purchase |
| Insufficient stock | Reject sale |

### Wallet balance example

Buyer: trader1

Initial balance

# ₹50,000

Purchase amount

# ₹12,000

Available after purchase

₹38,000

Purchase permitted

If the purchase is ₹55,000 instead:

Wallet balance

₹50,000

Purchase amount

₹55,000

Balance after purchase

# -₹5,000

Insufficient funds – Purchase blocked

The application should display this negative projected balance to explain why the transaction cannot proceed, but it must never actually allow an unauthorized negative wallet balance.

## 3. One important technical recommendation

Although you want JSON files instead of Google Sheets, I recommend:

- Node.js + Express: Backend and business logic.
- JSON files: Persistent storage.
- Vanilla JavaScript: Frontend functionality.
- HTML + CSS: User interface.
- Express sessions: Login management.
- bcrypt: Password security.

One important consideration: JSON files are suitable for a local prototype or small marketplace. Because multiple participants can trade simultaneously, the backend must implement transaction locking, atomic writes, and recovery. For a larger production marketplace, SQLite would be a natural next step.

## 4. Recommended development order

1. Project architecture
   Define all modules, relationships, and folder structure.
2. JSON database design
   Create all JSON files and sample participants, wallets, stocks, and products.
3. Backend development
   Implement authentication, orders, offers, wallets, and trading logic.
4. Frontend development
   Build dashboard, marketplace, portfolio, and negotiation screens.
5. Integration and testing
   Verify buying, selling, negotiation, partial execution, and balance updates.

My recommendation: Start with the JSON data model and sample data before writing any application code. Getting the relationships between Participants, Products, Variants, Wallets, Portfolios, Orders, and Offers correct will make the subsequent development much easier.



<a id="line-70"></a>
## [Back to Prompt ](#line-71)

## [Back to AI Generated Prompt to Build Project](#line-72)

# Run the Project

**Product Exchange – Complete Source Code**

Ready

Download product-exchange-complete.zip

Includes 20 project files, source code, JSON data files and README.md.

### **How to run**

Extract the ZIP and open a terminal inside the `product-exchange` folder.

```
npm install
cp .env.example .env
npm start
```

Open Chrome:

Sign two Chrome Profiles
Profile 

**http\://localhost:3000**

### **Demo login credentials**

| Username | Password    |
| -------- | ----------- |
| trader1  | password123 |
| trader2  | password123 |
| trader3  | password123 |

**Note:** This is a local demonstration application. Use a single server process; JSON storage is not suitable for production-scale concurrent trading. Install dependencies before running.