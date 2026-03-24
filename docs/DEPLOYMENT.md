# Deployment Documentation

## Overview

The BMI Calculator can be deployed as a static web application to various hosting platforms. This document covers deployment strategies for production environments.

## GitHub Pages Deployment

### Automatic Deployment

1. **Repository Setup**
   ```bash
   # Create new repository on GitHub
   # Push your code to main branch
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Save changes

3. **Access Application**
   - URL: `https://[username].github.io/[repository-name]`
   - Automatic deployment on every push to main

### Manual Deployment with gh-pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d ."
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## Local Development Server

### Python HTTP Server

```bash
# Navigate to project directory
cd bmi-calculator

# Start server on port 8000
python -m http.server 8000

# Or specify custom port
python -m http.server 8080
```

Access at: `http://localhost:8000`

### Node.js HTTP Server

```bash
# Using npx
npx http-server -p 8000

# Or install globally
npm install -g http-server
http-server -p 8000
```

## Production Build Process

### Pre-deployment Checklist

- [ ] Run test suite: `npm test`
- [ ] Generate coverage report: `npm run test:coverage`
- [ ] Verify coverage > 95%
- [ ] Test application manually
- [ ] Check console for errors
- [ ] Validate accessibility with Lighthouse
- [ ] Test responsive design on multiple devices

### Build Optimization

1. **Minify HTML**
   ```bash
   # Remove unnecessary whitespace
   # Keep semantic structure intact
   ```

2. **Minify CSS**
   ```bash
   # Combine and compress styles
   # Maintain responsive breakpoints
   ```

3. **Minify JavaScript**
   ```bash
   # Compress calculator.js and ui.js
   # Preserve function names for debugging
   ```

## Environment Configuration

### Development vs Production

```javascript
// config.js
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    debug: true
  },
  production: {
    apiUrl: 'https://api.example.com',
    debug: false
  }
};

const env = process.env.NODE_ENV || 'development';
export default config[env];
```

## Continuous Integration/Continuous Deployment (CI/CD)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build  # If you add a build step
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Build Script Addition

Add to `package.json`:

```json
{
  "scripts": {
    "build": "echo 'Build step - add minification here'",
    "predeploy": "npm run build"
  }
}
```

## Alternative Hosting Platforms

### Netlify

1. **Connect Repository**
   - Link GitHub repository to Netlify
   - Set build command: (leave empty for static)
   - Set publish directory: `/`

2. **Custom Domain**
   - Add custom domain in Netlify dashboard
   - Configure DNS records

### Vercel

1. **Import Project**
   ```bash
   npx vercel --prod
   ```

2. **Configuration**
   - `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "index.html",
         "use": "@vercel/static"
       }
     ]
   }
   ```

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Project**
   ```bash
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

## Performance Monitoring

### Lighthouse CI

Add to GitHub Actions:

```yaml
- name: Audit with Lighthouse
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: https://[username].github.io/[repo-name]
    configPath: .lighthouserc.json
```

### Lighthouse Configuration

`.lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run serve",
      "url": ["http://localhost:8000"]
    },
    "assert": {
      "assertions": {
        "categories:accessibility": "error",
        "categories:performance": "error",
        "categories:seo": "error"
      }
    }
  }
}
```

## Security Considerations

### Content Security Policy

Add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
">
```

### HTTPS Enforcement

GitHub Pages automatically provides HTTPS. For other platforms:

- Netlify: Automatic HTTPS
- Vercel: Automatic HTTPS
- Firebase: Automatic HTTPS

## Backup and Rollback

### Version Tagging

```bash
# Tag releases
git tag v1.0.0
git push origin v1.0.0
```

### Rollback Strategy

```bash
# Revert to previous version
git revert HEAD
git push origin main
```

## Monitoring and Analytics

### Google Analytics

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

```javascript
// Basic error logging
window.addEventListener('error', function(e) {
  console.error('Application Error:', e.error);
  // Send to error tracking service
});
```

## Maintenance

### Update Process

1. **Monitor Issues**: Check GitHub Issues and user feedback
2. **Security Updates**: Update dependencies regularly
3. **Performance Monitoring**: Use Lighthouse regularly
4. **Feature Requests**: Prioritize based on user needs

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Test after updates
npm test
```

## Troubleshooting

### Common Deployment Issues

1. **404 Errors**: Check file paths and case sensitivity
2. **CORS Issues**: Ensure all assets are served from same domain
3. **HTTPS Mixed Content**: Use HTTPS URLs for all external resources
4. **Caching Issues**: Add cache-busting for updated files

### Debug Commands

```bash
# Check server logs
# For local server
python -m http.server 8000 &
curl -I http://localhost:8000

# Test specific endpoints
curl http://localhost:8000/index.html
```