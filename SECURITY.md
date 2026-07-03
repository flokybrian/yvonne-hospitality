# Security Guide

## 🔒 Security Fixes Applied

### 1. **Dependency Vulnerabilities** ✅ FIXED
- **Swiper**: Updated from 11.1.5 to 11.2.2 (critical prototype pollution fix)
- **Vite**: Updated from 5.3.4 to 6.3.5 (moderate dev server vulnerability fix)
- **Status**: `npm audit` now reports **0 vulnerabilities**

### 2. **Security Headers** ✅ ADDED
Added to `frontend/public/_headers` and `vite.config.ts`:
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME sniffing attacks
- **X-XSS-Protection**: Enables browser XSS filter
- **Referrer-Policy**: Controls information leakage via referrer
- **Permissions-Policy**: Disables unnecessary browser features (camera, mic, geolocation)
- **Content-Security-Policy**: Restricts resource loading (defends against XSS)

### 3. **Dev Server Security** ✅ HARDENED
- Restricted to `localhost` only (not accessible from network)
- Security headers applied in development mode

### 4. **Environment Variables** ✅ SECURED
- All `.env*` files excluded from git (frontend + backend)
- Added explicit exclusion for production/staging env files
- Upload script validates credentials before running

### 5. **Code Security Audit** ✅ PASSED
Checked for common vulnerabilities:
- ✅ No `dangerouslySetInnerHTML` usage
- ✅ No `eval()` or dynamic code execution
- ✅ No `localStorage`/`sessionStorage` misuse
- ✅ No exposed secrets in console logs
- ✅ No password/token logging

---

## 🛡️ Security Best Practices

### Environment Variables
```bash
# ❌ NEVER commit these files
.env
.env.local
.env.production

# ✅ ALWAYS commit the example
.env.example
```

### Secrets Management
- Store all credentials in `.env` files
- Use environment-specific files (`.env.production`, `.env.staging`)
- Never hardcode API keys, tokens, or passwords in code
- Never log sensitive values to console

### Dependencies
```bash
# Check for vulnerabilities regularly
npm audit

# Update vulnerable packages
npm install package@latest

# Lock versions in production
npm ci  # Uses package-lock.json exactly
```

### CSP (Content Security Policy)
The `_headers` file restricts what resources can load:
```
default-src 'self'           # Only load scripts/styles from your domain
img-src 'self' data: https:  # Images from your domain + data URIs + HTTPS
connect-src 'self' https://res.cloudinary.com  # API calls limited
```

If you add a new external service (CDN, analytics, fonts), update the CSP.

---

## 🚨 Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. Email: agani.mugasia24@s.karu.ac.ke with subject: `[SECURITY] Yvonne Hospitality`
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

---

## 📋 Security Checklist for Deployment

Before deploying to production:

- [ ] All dependencies pass `npm audit` with 0 vulnerabilities
- [ ] `.env` files are in `.gitignore` and not committed
- [ ] Environment variables set in Render dashboard (not in code)
- [ ] Security headers configured (`_headers` file deployed)
- [ ] HTTPS enabled (Render does this automatically)
- [ ] Database uses strong passwords (min 16 characters, random)
- [ ] API rate limiting enabled (if using FastAPI backend)
- [ ] CORS restricted to your domain only
- [ ] File uploads validate file types and sizes
- [ ] User inputs sanitized before storing in database

---

## 🔐 Additional Hardening (Future)

When you deploy the backend API:

1. **Rate Limiting**
   ```python
   from slowapi import Limiter
   limiter = Limiter(key_func=get_remote_address)
   @limiter.limit("10/minute")
   ```

2. **Input Validation**
   - Use Pydantic models for all API inputs
   - Validate file uploads (type, size, content)
   - Sanitize user-provided text

3. **Database Security**
   - Use parameterized queries (SQLAlchemy does this automatically)
   - Enable SSL connections to PostgreSQL
   - Regular backups

4. **Authentication (if adding admin panel)**
   - Use OAuth2 + JWT tokens
   - Hash passwords with bcrypt (min 12 rounds)
   - Implement refresh tokens
   - Add 2FA for admin accounts

---

## 📊 Current Security Status

| Category | Status | Last Checked |
|----------|--------|--------------|
| Dependencies | ✅ 0 vulnerabilities | 2026-07-03 |
| Security Headers | ✅ Configured | 2026-07-03 |
| Code Audit | ✅ Passed | 2026-07-03 |
| Secrets Management | ✅ Secured | 2026-07-03 |
| HTTPS | ✅ Enabled (Render) | 2026-07-03 |

---

## 🔗 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Render Security Guide](https://render.com/docs/security)
