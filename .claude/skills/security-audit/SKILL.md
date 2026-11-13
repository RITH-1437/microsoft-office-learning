---
name: security-audit
description: Security audit for Office Academy as a client-only static app — XSS/injection, input validation, localStorage tampering, downloads, secrets, dependency vulnerabilities, hosting headers — and auth/API/upload checks if such features are ever added. Use for TASK-007 and for security impact review of changes.
---

# Security Audit

## Purpose
Find and prioritize real risks for this architecture; avoid theatre.

## When to activate
Security audits, pre-release, new dependency, any feature touching user input, storage, downloads, external resources, or (hypothetically) a backend.

## Workflow
1. **Confirm architecture:** grep for `fetch(`, `axios`, `XMLHttpRequest`, `WebSocket`, `/api`, auth libs, `process.env`/`import.meta.env`. If none: auth, sessions, tokens, uploads, API, DB = **N/A (evidence: …)**.
2. **Injection/XSS:** grep `dangerouslySetInnerHTML|innerHTML|outerHTML|insertAdjacentHTML|eval\(|new Function|document\.write`; inspect Word lab contentEditable handling (paste handling, sanitizing), URL/href from data.
3. **Formula engine:** `src/lib/formula.ts` — recursion depth, range size caps, regex backtracking, prototype pollution via cell refs/names.
4. **Storage:** `persist` rehydration validates shape; try/catch around parsing; no sensitive data stored.
5. **Downloads:** filenames/MIME fixed from static data; blob URLs revoked.
6. **Secrets:** `git ls-files | grep -i env`; grep for key/token patterns in tracked files; never print values.
7. **Dependencies:** `npm audit` (record output), `npm ls --depth=0`, check unusual packages/postinstall scripts; external scripts/fonts in `index.html`/CSS.
8. **Hosting:** recommend CSP, `X-Content-Type-Options`, `Referrer-Policy`, HTTPS-only for the chosen host (GitHub Pages can't set headers → meta CSP limits).
9. **If a backend exists later:** authn/authz on every endpoint, server-side validation, rate limiting, CSRF/CORS, secure cookies, upload type/size checks, secrets in env only.

## Rules
- Defensive, local, non-destructive only. Never probe external systems or run exploits against anything but the local dev server.
- Don't expose secret values in reports. Rate findings by likelihood × impact.

## Quality checklist
- [ ] Architecture confirmed · [ ] XSS sinks reviewed · [ ] Formula engine DoS considered · [ ] Storage validated · [ ] Secrets scan · [ ] `npm audit` recorded · [ ] N/A items evidenced

## Deliverables
Security report: findings (ID, severity, location, impact, remediation), N/A controls with evidence, dependency results, residual risk.

## Completion criteria
Every checklist item has a result; critical/high findings have concrete remediation.
