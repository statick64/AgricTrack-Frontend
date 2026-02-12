# Assets

This directory contains static assets for the application.

## Structure

### 📁 `images/`
Image files such as:
- Logos
- Backgrounds
- Illustrations
- Product images

**Supported formats:** `.jpg`, `.png`, `.svg`, `.webp`

### 📁 `icons/`
Custom icon files and SVGs:
- Custom SVG icons
- Icon sets
- Favicons

### 📁 `fonts/`
Custom font files:
- `.woff`, `.woff2` files
- Font family definitions

## Usage

### Importing Images
```typescript
import logo from '@assets/images/logo.png';

function Header() {
  return <img src={logo} alt="AgriTrack Logo" />;
}
```

### Importing SVG Icons
```typescript
import { ReactComponent as CustomIcon } from '@assets/icons/custom.svg';

function MyComponent() {
  return <CustomIcon className="w-6 h-6" />;
}
```

### Using Fonts
Add font imports to `src/index.css`:
```css
@font-face {
  font-family: 'CustomFont';
  src: url('@assets/fonts/CustomFont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

## Best Practices

1. **Optimize images** before adding them (use tools like TinyPNG)
2. **Use SVG** for icons and logos when possible
3. **Use WebP** format for better compression
4. **Name files descriptively** (e.g., `livestock-icon.svg`, not `icon1.svg`)
5. **Organize by category** if you have many assets
