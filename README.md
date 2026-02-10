# CMP Donation Guide + About Us pages

This repository contains the **Food Donation Guide** and **About Us** pages for the CMP (Community Micro-Pantry) project.
It is built with **Next.js (App Router)** and is intended to run as a standalone frontend module.

---

## Tech Stack

* **Next.js 16 (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Node.js / npm**

---

## Prerequisites

Before you begin, make sure you have the following installed:

* **Node.js** (v18 or later recommended)
* **npm** (comes with Node.js)

You can check by running:

```bash
node -v
npm -v
```

---

## Getting Started (Step-by-Step)

> **Important:**
> Do **not** run multiple `next dev` processes for the same project folder at the same time.
> Always stop the previous dev server before starting a new one.

---

### 1. Clone the repository

Open your **Terminal** and run:

```bash
git clone https://github.com/yujunxian/cmp-donationguide-aboutus.git
```

Then move into the project folder:

```bash
cd cmp-donationguide-aboutus
```

---

### 2. Install dependencies  (**required**)

This step is mandatory when running the project for the first time.

```bash
npm install
```

You may see a message like:

```
1 high severity vulnerability
```

This is a known npm dependency warning and **does NOT affect running the project**.
Do **NOT** run `npm audit fix --force`.

---

### 3. Start the development server

To avoid conflicts with other local projects, run the app on **port 3001**:

**macOS / Linux:**
```bash
npm run dev -- -p 3001
```

**Windows (if you encounter SWC errors, see Common Issues below):**
```bash
npm run dev:webpack -- -p 3001
```

If successful, you should see output similar to:

```
▲ Next.js ...
- Local: http://localhost:3001
✓ Ready in xxxx ms
```

---

### 4. Open in browser

Open your browser and visit:

* Home
 [http://localhost:3001](http://localhost:3001)

* About Us
 [http://localhost:3001/about-us](http://localhost:3001/about-us)

* Food Donation Guide
 [http://localhost:3001/food-donation-guide](http://localhost:3001/food-donation-guide)

* Donation Guide Search
 [http://localhost:3001/food-donation-guide/search](http://localhost:3001/food-donation-guide/search)

---

## Project Structure (Overview)

```
app/
  about-us/                  About Us page
  food-donation-guide/       Donation Guide main pages
    search/                  Donation Guide search page
  update/                    Update flow
components/
  about/                     About Us UI components
  donation-guide/            Donation Guide UI, modals, cards
public/
  partners/                  Partner logos and assets
```

---

## Common Issues

### “Unable to acquire lock … .next/dev/lock”

This means another `next dev` process is already running for this project.

**Fix:**

1. Stop the running server with `Ctrl + C`
2. Restart with:

   ```bash
   npm run dev -- -p 3001
   ```

---

### Windows: “not a valid Win32 application” / “turbo.createProject is not supported by the wasm bindings”

> **Note:** This issue is **Windows-specific**. macOS and Linux users can use the default `npm run dev -- -p 3001` command without any issues.

On Windows, the native SWC binary (`@next/swc-win32-x64-msvc`) may fail to load. Next.js then falls back to WASM, which does not support Turbopack, so the dev server can error.

**Option A – Use Webpack instead of Turbopack (quick fix):**

```bash
npm run dev:webpack -- -p 3001
```

**Option B – Fix the native SWC binary (recommended for best performance):**

1. Install **Microsoft Visual C++ Redistributable (x64)**:  
   [https://aka.ms/vs/17/release/vc_redist.x64.exe](https://aka.ms/vs/17/release/vc_redist.x64.exe)
2. Ensure you use **64-bit Node.js** (not 32-bit). Check with:  
   `node -p "process.arch"` → should show `x64`
3. Delete `node_modules` and `.next`, then reinstall:  
   `rmdir /s /q node_modules .next 2>nul & npm install`  
   Then run:  
   `npm run dev -- -p 3001`

---

## Notes

* `node_modules/` and `.next/` are intentionally **excluded** from GitHub via `.gitignore`
* This repository is designed to run **independently** from the main CMP pantry system
* All changes must be committed and pushed manually:

  ```bash
  git add .
  git commit -m "Your message"
  git push
  ```
