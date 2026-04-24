<div align="center">
  <img src="public/window.svg" width="100" height="100" alt="CivicGuide Logo">
  <h1>🗳️ CIVICGUIDE AI</h1>
  <p><strong>Built for the Virtual Prompt War Hackathon 2026</strong></p>
  <p>Empowering informed Indian voters through AI-driven, non-partisan civic education.</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
  [![Gemini AI](https://img.shields.io/badge/Google-Gemini_2.5_Flash-blue)](https://deepmind.google/technologies/gemini/)
  [![Playwright](https://img.shields.io/badge/Playwright-E2E_Tested-green)](https://playwright.dev/)
  [![A11Y](https://img.shields.io/badge/Accessibility-100%25-orange)]()
  [![PWA](https://img.shields.io/badge/PWA-Ready-purple)]()
</div>

<br/>

## 🎯 The Vision
Navigating the Indian electoral system (with 968M+ registered voters and 7 election phases) can be overwhelming. **CivicGuide AI** solves this by providing a hyper-accessible, Brutalist-styled Progressive Web App (PWA) that combines official Election Commission of India (ECI) resources with the power of Google's Gemini AI.

We don't just provide links; we educate, test, and guide users through the democratic process.

---

## 🏗️ Architecture & Stack

CivicGuide AI is engineered for extreme resilience, high performance, and accessibility.

```mermaid
graph TD
    Client[Client / PWA Browser] --> |Next.js App Router| Frontend
    
    subgraph Frontend [Frontend Architecture]
        UI[Brutalist UI Components]
        State[React Context / AuthProvider]
        A11y[ARIA Regions & Focus Rings]
    end
    
    Frontend <--> |Rate-Limited API Routes| Backend
    
    subgraph Backend [Serverless API Layer]
        ChatAPI[/api/chat/]
        QuizAPI[/api/quiz-hint/]
        NewsAPI[/api/news/]
        RateLimiter{In-Memory IP Limiter}
    end
    
    Backend --> |REST / SDK| ExternalAPIs
    
    subgraph ExternalAPIs [Google Cloud Ecosystem]
        Gemini[Gemini 2.5 Flash AI]
        Maps[Google Maps Embed]
        Firebase[Firebase Authentication]
        RSS[Google News RSS Feed]
    end
```

### Technical Hallmarks (The "Top 5" Polish)
*   **Zero-Warning Build:** Compiled cleanly with strict TypeScript and Next.js 14+ viewport/metadata standards.
*   **PWA Ready:** Fully installable mobile experience via customized `manifest.json`.
*   **E2E Tested:** Comprehensive Playwright test suite (`civic-flows.spec.ts`) validating core user journeys.
*   **Aggressive Security:** Custom in-memory IP rate-limiting (15 req/min) on AI routes to prevent abuse.
*   **Flawless A11y:** Full keyboard navigation (`tablist`, `:focus-visible` rings) and dynamic screen-reader support (`aria-live="polite"`).
*   **Graceful Failures:** Custom Brutalist `error.tsx` (Global Error Boundary) and `not-found.tsx` (404 Page).

---

## 🧠 AI & APIs Utilized

We heavily leveraged the Google Developer Ecosystem to build a seamless experience:

| Technology | Implementation in CivicGuide AI |
| :--- | :--- |
| **Google Gemini 2.5 Flash** | Powers the core conversational AI and dynamic Quiz hints. Provides fast, low-latency, non-partisan explanations of civic duties. |
| **Google Maps Embed API** | Embedded in the `CivicLookup` component, allowing users to enter their pincode to visualize local polling areas and constituencies. |
| **Firebase Authentication** | Seamless Google OAuth Sign-In to track user sessions and quiz progress securely. |
| **Google News RSS** | Bypasses expensive API limits by parsing live, official Google News RSS feeds to provide real-time election updates. |

---

## 🚀 Core Features

1.  **AI Civic Assistant:** Ask complex questions ("What is the Model Code of Conduct?" or "How do VVPATs work?") and get instant, factual answers powered by Gemini.
2.  **Phase-by-Phase Timeline:** An interactive, accessible tab-based timeline explaining the 7 critical phases of an Indian election.
3.  **Voter Resources Hub:** Direct access to official ECI portals (e-EPIC download, Voter Registration, Electoral Roll search).
4.  **Gamified Civic Quiz:** Test your knowledge on Indian democracy with AI-generated hints.
5.  **Live Election News:** A brutalist news ticker aggregating top stories directly from Google News.

---

## 💻 Local Development

Want to run CivicGuide AI locally?

### Prerequisites
*   Node.js 18.17+
*   Google Gemini API Key
*   Google Maps API Key
*   Firebase Client Configuration

### Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/lohit-40/CIVICGUIDE-AI.git
    cd CIVICGUIDE-AI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    GEMINI_API_KEY=your_gemini_key_here
    NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_maps_key_here
    
    # Firebase Client Config
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

5.  **Run E2E Tests (Playwright):**
    ```bash
    npx playwright test
    ```

---

<div align="center">
  <p><i>CivicGuide AI is an educational tool. It is non-partisan and not officially affiliated with the Election Commission of India. Built for Virtual Prompt War 2026.</i></p>
</div>
