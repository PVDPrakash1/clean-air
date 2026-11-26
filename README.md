# ClearAir AI – Your Smart Pollution Companion

**Tagline:** *Breathe Better. Live Smarter. Build a Cleaner Future.*

ClearAir AI is a location-aware, GenAI-powered environmental assistant designed to help families and communities respond to urban air pollution and winter smog through practical daily decisions. Rather than only displaying AQI numbers, it connects:

1. **Current Situation** – What is happening in the user's area (illustrative AQI, $\text{PM}_{2.5}$, $\text{PM}_{10}$, $\text{NO}_2$, peak smog hours, and safer midday windows).
2. **Personal Action** – Tailored steps based on family health sensitivity (children, seniors, asthma), daily commute distance, room size, and purifier availability.
3. **Measurable Impact** – Estimated personal transport $\text{CO}_2$ avoided and direct exposure reduction, clearly distinguishing estimated emission savings from immediate changes to city-wide AQI.

---

## Key Features

* **Real-Time Air Quality Assistant:** Locality selector (including Hyderabad localities, Delhi NCR, Bengaluru, and Mumbai), illustrative AQI badge, pollutant breakdowns ($\text{PM}_{2.5}$, $\text{PM}_{10}$, $\text{NO}_2$), and a 24-hour pollution curve highlighting high-risk vs. safer hours.
* **3-Pillar Action Plan:** Dynamic recommendations linking local conditions, household actions, and measurable health/emission outcomes.
* **Smart Daily Routine & Commute Planner:** Compares Metro/Public Transit, Shared Carpool, Work/Study From Home, and Solo Car trips for estimated $\text{CO}_2$ emissions and roadside exposure, alongside school/office timing guidance.
* **Indoor Air Quality Advisor:** Low-cost/zero-cost indoor air tips (wet mopping, kitchen ventilation, avoiding indoor smoke) plus a True HEPA H13 purifier CADR room-sizing calculator.
* **Sustainability Impact Tracker:** Interactive daily habit checklist estimating household $\text{CO}_2$ avoided, monthly pace, personal exposure shield percentage, and community-scale context.
* **GenAI Family Assistant:** Context-aware chat supporting **English**, **Telugu (తెలుగు)**, and **Hindi (हिंदी)** via Google Gemini (`gemini-2.5-flash`), with built-in localized fallback responses when no API key is set.

---

## Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Gemini API Key (Optional):**
   Add your API key from Google AI Studio to `.env`:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(If left as-is, the chat assistant still works using smart local fallback responses.)*

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open the local URL shown in the terminal (typically `http://localhost:5173`).

---

## Build & Deploy to GoDaddy

1. **Build the production bundle:**
   ```bash
   npm run build
   ```
   This creates the `dist/` folder along with `public/.htaccess` for Single-Page Application (SPA) routing.

2. **Upload to GoDaddy (cPanel):**
   * Log in to GoDaddy → **My Products** → **Web Hosting** → **Manage** → **cPanel Admin** → **File Manager**.
   * Open **`public_html`** (enable **Show Hidden Files** in Settings so `.htaccess` is visible).
   * Upload all files and folders from inside `dist/` (extract `assets` if zipped).
   * Ensure **SSL (HTTPS)** is active on your domain.

*(Note: For client-side demos, restrict your Gemini API key in Google Cloud / AI Studio to your domain via HTTP referrers; for production apps, proxy API calls through a backend service such as FastAPI or Node.js.)*