# Suisse Intl Font

This directory contains the Suisse Intl font CSS for the portfolio website.

## Font Variants

The following Suisse Intl variants are implemented:
- Suisse Intl Light (300)
- Suisse Intl Regular (400)

## How to Use

1. The font files should be placed in the `public/fonts` directory:
   - `SuisseIntl-Light.woff2` and `SuisseIntl-Light.woff`
   - `SuisseIntl-Regular.woff2` and `SuisseIntl-Regular.woff`

2. The fonts are already imported in the global CSS file (`src/styles/globals.css`).

3. The fonts are configured in Tailwind CSS and can be used with:
   - Default font: Already applied to the entire site
   - Specific usage: `className="font-suisse"` for components that need explicit font assignment
   - Font weights: `font-light` (300) and `font-regular` (400)

## Example Usage

```jsx
// Using the default font (applied globally)
<p>This text uses Suisse Intl Regular by default</p>

// Using specific font weight
<p className="font-light">This text uses Suisse Intl Light</p>
<p className="font-regular">This text uses Suisse Intl Regular</p>
```

## License

Make sure you have the appropriate license to use the Suisse Intl font in your project. 