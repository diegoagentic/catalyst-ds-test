# Catalyst UI Refinements - Summary Jan 23, 2026

## Features & Implementation
- **Revenue Trend Chart:**
    - Light Mode: Gray line (`zinc-400`), solid brand dots.
    - Dark Mode: Brand line, hollow dots. Standardized via CSS variables in `theme.css`.
- **Header Structure:**
    - "Recent Orders" title is now separate from filters/tabs for improved visual hierarchy.
- **My Apps (Navbar):**
    - High-contrast solid hover state in Light Mode.
    - "New" badge for highlighted workspace.
    - Clear Brand ring for selection.
    - Fixed Dark Mode hover legibility (White text/icon for highlighted items).
- **Navigation Dropdowns:**
    - Increased hover contrast for Tenant dropdown (Zinc-200).
    - Fixed User Dropdown glassmorphism (Opacity + Blur) to match Action Center/My Apps.

## Next Steps for Monday
- Verify glassmorphism levels across different browsers.
- Audit any remaining hardcoded blue colors in secondary menus.
