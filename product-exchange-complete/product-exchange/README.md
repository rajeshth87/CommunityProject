# Local Product Exchange – Buy & Sell Marketplace

A locally hosted marketplace for participants to buy, sell, negotiate, and exchange product variants using virtual wallet balances and JSON-file storage.

## Technology
- Node.js 18+ and Express
- HTML5, CSS3, vanilla JavaScript and Fetch API
- JSON files for persistent application data
- bcryptjs password hashing and express-session authentication

<a id="line-71"></a>
## [Jump to Quick Start Ubuntu](#line-73)
## [Jump to Quick Start windows](#line-70)
## [Jump to Quick Start MacBook / iMac](#line-72)
## [Jump to Open Application in Google Chrome](#line-74)



## Requirements
- Ubuntu 22.04 (also works on other platforms with Node.js 18+)
- Node.js 18 or newer and npm
- Google Chrome or another modern browser

<a id="line-73"></a>
## [Jump to Quick Start windows](#line-70)
## [Jump to Quick Start MacBook / iMac](#line-72)
## Quick start (Ubuntu 22.04)

1. Extract the ZIP archive.
2. Open a terminal in the extracted `product-exchange` directory.
3. Install Node.js 18+ if it is not already installed. One option is NodeSource:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Create your environment file:
   ```bash
   cp .env.example .env
   ```
   Change `SESSION_SECRET` to a long random value before using the app beyond a local demo.
6. Start the server:
   ```bash
   npm start
   ```

   <a id="line-74"></a>
## [Jump to Quick Start](#line-71)
## 7. Open the Application in Two seperate Incognition windows in Google Chrome
7. Open **http://localhost:3000** in two seperate Incognition Windows in Google Chrome.
      - in Incocognition window 1 login as trader 1
      - in Incocognition window 2 login as trader 2

The application automatically creates missing JSON data files and initializes demo users, products, wallets, portfolios, and sample orders on its first run.











<a id="line-70"></a>
## [Jump to Quick Start Ubuntu](#line-73)
## [Jump to Quick Start MacBook / iMac](#line-72)
## Quick Start (Windows 10 / 11)

Follow these steps to install and run the Product Exchange application on Windows using PowerShell or Windows Terminal. No Ubuntu, Linux, Bash, or `.sh` commands are required.

### 1. Extract the ZIP Archive

1. Locate the downloaded project ZIP archive.
2. Right-click the ZIP file and select Extract All.
3. Extract the contents to your preferred location.
4. Open the extracted `product-exchange` directory.

### 2. Open PowerShell in the Project Directory

1. Open the extracted `product-exchange` folder in File Explorer.
2. Right-click inside the folder.
3. Select Open in Terminal.

Alternatively, navigate to the project directory using PowerShell:

powershell

```powershell
cd "C:\path\to\product-exchange"
```

### 3. Install Node.js 18 or Later

If Node.js is not already installed, install the LTS version using Windows Package Manager:

powershell

```powershell
winget install OpenJS.NodeJS.LTS
```

Alternatively, download the Windows Installer (`.msi`) from:

[https://nodejs.org/](<https://nodejs.org/?utm_source=chatgpt.com>)

After installation, close and reopen PowerShell.

Verify the installation:

powershell

```powershell
node -v
npm -v
```

Ensure Node.js version 18 or later is installed.

### 4. Install Project Dependencies

From the `product-exchange` directory, run:

powershell

```powershell
npm install
```

This installs all required project dependencies defined in `package.json`.

### 5. Create Your Environment File

Copy the example environment file to create your local configuration:

powershell

```powershell
Copy-Item .env.example .env
```

Open the `.env` file using Notepad:

powershell

```powershell
notepad .env
```

Update the following environment variable:

env

```env
SESSION_SECRET=replace_with_a_long_random_secret
```

Replace the example value with a long, randomly generated secret before using the application beyond a local demo.

Save and close the file.

### 6. Start the Application

Run the following command from the project directory:

powershell

```powershell
npm start
```

Wait until the server starts successfully. The application should be available at:

text

```text
http://localhost:3000
```
   <a id="line-74"></a>
## [Jump to Quick Start](#line-71)
### 7. Open the Application in Two seperate Incognition windows in Google Chrome


Open **http://localhost:3000** in two seperate Incognition Windows in Google Chrome.
      - in Incocognition window 1 login as trader 1
      - in Incocognition window 2 login as trader 2

### 8. Automatic Database Initialization

On its first run, the application automatically:

- Creates missing JSON data files.
- Initializes demo user accounts.
- Creates sample products.
- Initializes wallets.
- Creates portfolios.
- Generates sample orders.

No manual database setup is required for the initial demonstration.

### 9. Troubleshooting (Windows)

Issue 1: `node` or `npm` is not recognized

- Ensure Node.js is installed.
- Close and reopen PowerShell.
- Verify that Node.js was added to the Windows PATH.

Issue 2: PowerShell reports that script execution is disabled

If npm commands fail because PowerShell blocks script execution, run:

powershell

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Confirm the change if prompted, then retry:

powershell

```powershell
npm install
```

Issue 3: Port 3000 is already in use

Another application may already be using port 3000. Stop that application or configure the project to use another available port if supported.

Issue 4: `.env.example` cannot be found

Make sure PowerShell is running inside the extracted `product-exchange` project directory and that the `.env.example` file exists.

### 10. Quick Command Reference

For convenience, here are the essential commands in execution order:

powershell

```powershell
# Navigate to the project directory
cd "C:\path\to\product-exchange"

# Install dependencies
npm install

# Create environment configuration
Copy-Item .env.example .env

# Open environment file for editing
notepad .env

# Start the application
npm start
```

Ready to runOpen \*\*http://localhost:3000\*\* in Google Chrome to access the Product Exchange application.

Note: Keep the PowerShell terminal running while using the application. Closing the terminal will stop the development server.







<a id="line-72"></a>
## [Jump to Quick Start Ubuntu](#line-73)
## [Jump to Quick Start windows](#line-70)
# Quick Start (macOS – Apple MacBook / iMac)

Follow these steps to install and run the Product Exchange application on macOS using the built-in Terminal. No Ubuntu, Windows PowerShell, or Windows-specific commands are required.

These instructions work on both Apple Silicon (M1, M2, M3, M4, etc.) and Intel-based Macs.

## 1. Extract the ZIP Archive

1. Locate the downloaded project ZIP archive.
2. Double-click the ZIP file to extract it.
3. Locate the extracted `product-exchange` folder.
4. Keep the folder in an accessible location, such as Documents or Desktop.

## 2. Open Terminal in the Project Directory

1. Open Finder.
2. Navigate to the extracted `product-exchange` folder.
3. Right-click the folder and select New Terminal at Folder, if available.

Alternatively, open Terminal using Spotlight:

- Press `Command + Space`.
- Type `Terminal`.
- Press Enter.

Navigate to your project directory:

bash

```bash
cd ~/Downloads/product-exchange
```

If your project is stored elsewhere, replace the path accordingly.

## 3. Install Node.js and npm

The application requires Node.js 18 or later.

### Option A: Using the Official Node.js Installer (Recommended)

1. Visit the official website:
   [https://nodejs.org/](<https://nodejs.org/?utm_source=chatgpt.com>)
2. Download the macOS installer (`.pkg`) for the LTS version.
3. Open the downloaded installer.
4. Follow the installation instructions.
5. Complete the installation.

### Option B: Using Homebrew

If Homebrew is already installed, open Terminal and run:

bash

```bash
brew install node
```

If Homebrew is not installed, visit:

[https://brew.sh/](<https://brew.sh/?utm_source=chatgpt.com>)

Follow its official installation instructions.

After installing Node.js, verify the installation:

bash

```bash
node -v
npm -v
```

Ensure Node.js version 18 or later is installed.

## 4. Install Project Dependencies

Navigate to the `product-exchange` directory and execute:

bash

```bash
npm install
```

This command installs all dependencies specified in the project's `package.json` file.

Wait until the installation completes successfully.

## 5. Create Your Environment File

Create your local environment configuration by copying the example file:

bash

```bash
cp .env.example .env
```

Open the `.env` file using the default macOS text editor:

bash

```bash
open -e .env
```

Update the following environment variable:

env

```env
SESSION_SECRET=replace_with_a_long_random_secret
```

Replace the example value with a long, randomly generated secret before using the application beyond a local demo.

Save and close the file.

## 6. Start the Application

From the `product-exchange` directory, run:

bash

```bash
npm start
```

Wait until the server starts successfully.

The application should now be available at:

text

```text
http://localhost:3000
```
   <a id="line-74"></a>
## [Jump to Quick Start](#line-71)
## 7. Open the Application in Two seperate Incognition windows in Google Chrome

Open **http://localhost:3000** in two seperate Incognition Windows in Google Chrome.
      - in Incocognition window 1 login as trader 1
      - in Incocognition window 2 login as trader 2



## 8. Automatic Database Initialization

On its first run, the application automatically:

- Creates missing JSON data files.
- Initializes demo user accounts.
- Creates sample products.
- Initializes wallets.
- Creates portfolios.
- Generates sample orders.

No manual database setup is required for the initial demonstration.

## 9. Troubleshooting (macOS)

### Issue 1: `node` or `npm` command not found

If Terminal displays:

text

```text
zsh: command not found: node
```

Possible solutions:

- Verify that Node.js installation completed successfully.
- Close and reopen Terminal.
- Run `node -v` and `npm -v` again.
- If necessary, reinstall Node.js using the official macOS installer.

### Issue 2: Permission denied

If npm reports a permission error, avoid using `sudo npm install` as a default workaround.

Instead, check your project folder permissions and ensure your macOS user has read/write access.

### Issue 3: Port 3000 is already in use

Another application may already be using port 3000.

Stop the other application or configure the project to use another available port if supported.

### Issue 4: `.env.example` cannot be found

Ensure Terminal is running inside the extracted `product-exchange` directory.

Check the directory contents:

bash

```bash
ls -la
```

Confirm that `.env.example` and `package.json` are present.

### Issue 5: Apple Silicon compatibility

For Macs with Apple Silicon (M1, M2, M3, M4, etc.), download the macOS ARM64 Node.js installer.

For Intel-based Macs, download the macOS x64 installer.

## 10. Quick Command Reference

Execute these commands in order from the macOS Terminal:

bash

```bash
# Navigate to the project directory
cd ~/Downloads/product-exchange

# Verify Node.js and npm
node -v
npm -v

# Install project dependencies
npm install

# Create environment configuration
cp .env.example .env

# Open environment file for editing
open -e .env

# Start the application
npm start
```

Ready to runOpen \*\*http://localhost:3000\*\* in Google Chrome to access the Product Exchange application.

Important: Keep the Terminal window open while using the application. Closing the Terminal or stopping the running process will stop the application server.

Platform compatibility: The Product Exchange application can be run on Ubuntu 22.04, Windows 10/11, and macOS, provided the required Node.js version and project dependencies are installed.




















## Demo accounts

| Username | Password | Initial wallet |
|---|---|---:|
| trader1 | password123 | ₹50,000 |
| trader2 | password123 | ₹50,000 |
| trader3 | password123 | ₹50,000 |

You can also register a new participant. New accounts start with a ₹50,000 virtual wallet.

## Features
- Participant registration, login, logout and protected API routes
- Dashboard with wallet, portfolio, orders, offers and recent trades
- Product catalogue and independently tradable variants
- Buy and sell orders with backend-side wallet/stock reservation
- Cancellation releases the corresponding remaining reservation
- Offers, counteroffers, rejection and acceptance
- Trade execution updates both wallets, both portfolios, order remainder, transaction history and ledgers
- Partial fills leave the remaining order quantity available
- Wallet ledger, portfolio ledger, notifications and transaction history
- Responsive browser interface

## Project structure

```text
product-exchange/
├── server.js
├── package.json
├── .env.example
├── README.md
├── data/
│   ├── participants.json
│   ├── products.json
│   ├── product_variants.json
│   ├── wallets.json
│   ├── portfolios.json
│   ├── buy_orders.json
│   ├── sell_orders.json
│   ├── offers.json
│   ├── transactions.json
│   ├── wallet_ledger.json
│   ├── portfolio_ledger.json
│   └── notifications.json
└── public/
    ├── index.html
    ├── css/style.css
    └── js/app.js
```

## JSON data files

All persistent application records are stored under `data/`. The server creates absent files on startup. Passwords are stored as bcrypt hashes, never as plaintext. Do not edit the files while the server is running. Back up the complete `data/` directory before making manual changes.

To reset the demo data, stop the server, delete the JSON files inside `data/`, and restart the application. This recreates the demo accounts and sample records. **This permanently removes locally stored activity.**

## API overview

All business operations are handled by the backend. Authenticated routes use the session cookie.

| Area | Routes |
|---|---|
| Authentication | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` |
| Dashboard | `GET /api/dashboard` |
| Products | `GET /api/products`, `GET /api/products/:id/variants` |
| Orders | `GET /api/orders`, `GET /api/orders/mine`, `POST /api/orders`, `POST /api/orders/:id/cancel` |
| Offers | `GET /api/offers`, `POST /api/offers`, `POST /api/offers/:id/accept`, `/reject`, `/counter` |
| Wallet | `GET /api/wallet`, `GET /api/wallet/ledger` |
| Portfolio | `GET /api/portfolio` |
| Transactions | `GET /api/transactions`, `GET /api/transactions/:id` |
| Notifications | `GET /api/notifications`, `POST /api/notifications/:id/read` |

## Important implementation notes and limitations

- This project is intended for local learning, demonstration and small-scale use. It uses virtual money only; there is no payment gateway.
- JSON storage is not a production database. The server serializes file writes and writes each file through a temporary file followed by rename. Multi-file trade updates are serialized in one process, but this is not a crash-proof database transaction or a cross-process lock.
- Run a **single Node.js server process**. Do not use clustering, multiple instances, or shared network storage with this JSON implementation. A sudden power loss between separate file renames can leave related files out of sync.
- For a public or production marketplace, use a transactional database such as SQLite or PostgreSQL, durable transaction boundaries, a persistent session store, HTTPS, CSRF protection, rate limiting, audit logging, and operational backups.
- Sessions use Express's in-memory session store. Logging in again may be required after a server restart.
- The sample application uses demo credentials and a development session secret by default. Change the secret and credentials before exposing the app to any network.
- Wallet/stock checks and transaction updates are performed on the server. Never expose this demo to the public internet as-is.

## Troubleshooting

**`node: command not found`** – Install Node.js 18 or newer and reopen the terminal.

**Port 3000 is already in use** – Set another port in `.env`, for example `PORT=3001`, then restart and open `http://localhost:3001`.

**Login does not work** – Use one of the demo credentials exactly, or remove the data JSON files while the server is stopped to reset the demo.

**Blank or stale page** – Refresh Chrome. Check the terminal running `npm start` for server errors.

## Stop the application

Press `Ctrl+C` in the terminal where the server is running.
