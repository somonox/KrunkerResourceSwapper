# KrunkerResourceSwapper

A resource swapping extension for Krunker that works in the latest Chromium-based browsers.

---

## 1. Installation

Clone the repository using the following command or download the source code as a ZIP file:

```
git clone https://github.com/a7a7-7/KrunkerResourceSwapper
```

Then, open the Chrome extensions page (`chrome://extensions`), enable **Developer mode**, click **Load unpacked**, and select the `KrunkerResourceSwapper` directory.

---

## 2. Installing Your Own Mod

Your mod should follow this folder structure:

```
KrunkerResourceSwapper/
├── css/
├── models/
├── scares/
├── sounds/
├── textures/
├── generate-rules.js
├── manifest.json
├── README.md
├── init.js
└── rules.json
```

* All files and folders are optional except for `rules.json`.
* If you do not have a `rules.json` file, refer to [Section 3](#3-how-to-generate-rulesjson).

Copy your `mod` folder's contents into the `KrunkerResourceSwapper` directory.

---

## 3. How to Generate `rules.json`

If your mod does not include a `rules.json` file, follow these steps:

1. Paste the contents of your mod into the `KrunkerResourceSwapper` directory.
2. Make sure you have [Node.js](https://nodejs.org) installed.
3. Open a terminal in the `KrunkerResourceSwapper` directory and run:

   ```
   node generate-rules.js
   ```

The script will automatically generate a `rules.json` file.

---

## 4. For Mod Makers

When developing a mod, it's recommended to maintain the following structure:

```
KrunkerResourceSwapper/
├── css/
├── models/
├── scares/
├── sounds/
├── textures/
└── rules.json
```

Generating `rules.json` during development is highly encouraged for testing and debugging.

---

## 5. How It Works

Since the release of Manifest V3, Chromium-based browsers no longer allow extensions to access the local file system directly for security reasons. Therefore, this project modifies the original Techy's KrunkerResourceSwapper to use the `declarativeNetRequest` API instead. All file redirections are handled via `rules.json`, enabling local resources to be mapped as if they were online.

---

