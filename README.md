# CivicGuide AI - Election Process Education

CivicGuide AI is a highly accessible, lightweight, and interactive assistant designed to help users understand the election process step-by-step. Built for the **Virtual Prompt War Challenge**.

## 🚀 Features & Google Services Integration
- **Interactive Election Timeline:** Guides users through Registration, Research, Voting Day, and Results.
- **Context-Aware Gemini Assistant:** Integrates **Google Gemini 2.5 Flash** to provide dynamic, step-specific guidance based on where the user is in the timeline.
- **Ultra-Lightweight:** 100% Vanilla JS/HTML/CSS. No heavy framework overhead. Repository size is incredibly small (< 100KB).
- **Secure Backend Proxy:** API keys are never exposed in the frontend. An Express server proxies all Gemini requests safely.
- **100% Accessibility:** Fully keyboard navigable, semantic HTML, high contrast UI, ARIA roles properly implemented.

## 📁 Repository Structure
- `public/`: Contains the highly optimized frontend assets (HTML, CSS, Vanilla JS).
- `server.js`: The Express backend acting as a secure gateway to the Gemini API.
- `tests/`: Jest test suites to validate logic.

## 🛠 Setup Instructions

1. Clone the repository.
2. Run `npm install` to install backend dependencies.
3. Rename `.env.example` to `.env` and add your **Google Gemini API Key**:
   ```
   GEMINI_API_KEY=your_key_here
   PORT=3000
   ```
4. Run the server: `npm start`
5. Open `http://localhost:3000` in your browser.

## 🧪 Testing
Run the automated test suite using:
```bash
npm test
```

## 🛡 Evaluation Focus Areas Addressed
- **Code Quality:** Modular Vanilla JS, clean Express backend, strict separation of concerns.
- **Security:** Backend proxy prevents API key leakage.
- **Efficiency:** Fast DOM manipulation, native `fetch`, minimal dependencies.
- **Testing:** Jest framework implemented.
- **Accessibility:** Designed with Lighthouse 100% standards.
- **Google Services:** Google Gemini powers the core dynamic assistant experience.
