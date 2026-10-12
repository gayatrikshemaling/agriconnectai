# AgriConnect AI --- UI/UX Requirements

## 1. Design Goal

Create a clean, trustworthy, agriculture-focused website that is easy to
use for farmers, buyers, and administrators. The interface should
prioritize clarity, readable text, simple navigation, and visible
actions rather than excessive decoration.

## 2. Visual Direction

-   **Theme:** Modern agriculture marketplace.
-   **Suggested palette:** Deep green for primary actions, light green
    for supporting accents, warm off-white backgrounds, and dark
    charcoal text.
-   **Status colours:** Use consistent, accessible colours for success,
    warning, pending, and error states; always include text labels or
    icons so colour is not the only signal.
-   **Typography:** Use a readable sans-serif font with clear
    heading/body hierarchy.
-   **Images:** Use relevant crop/product photography where useful, with
    consistent image ratios and sensible fallback images.
-   **Components:** Consistent buttons, form fields, cards, tables,
    badges, navigation, alerts, and modals.

## 3. Global Layout and Navigation

-   Provide a consistent header with the AgriConnect AI brand.
-   Public navigation should include Home, Marketplace, About/How It
    Works, Login, and Register as appropriate.
-   Authenticated navigation should show options relevant to the user's
    role and a clear Logout action.
-   Use a footer for contact/help information and basic project details.
-   On small screens, collapse navigation into a mobile-friendly menu.
-   Show the current page title and avoid overly deep navigation.

## 4. Required Screens

### UI-01: Home Page

-   Brand/header and short project introduction.
-   Primary actions: "Explore Marketplace" and "Get Started".
-   Short feature sections for direct farmer-to-buyer selling, product
    discovery, and AI-assisted insights.
-   A "How It Works" section with concise steps for farmers and buyers.
-   Featured or recently listed products if product data exists.
-   Footer with help/contact and policy links as appropriate.

### UI-02: Registration Page

-   Simple form with name, email, phone, location, password, and role if
    role selection is permitted.
-   Required-field indicators and inline validation.
-   Password visibility toggle if implemented.
-   Link to Login for existing users.
-   Clear registration success/error feedback.
-   Do not show technical exception text.

### UI-03: Login Page

-   Email and password fields.
-   Show/hide password option if implemented.
-   Login button, link to registration, and error message area.
-   Disable repeated submissions while a request is processing.
-   Redirect to the correct dashboard after successful authentication.

### UI-04: Farmer Dashboard

-   Welcome message and profile summary.
-   Summary cards for active listings, pending orders, and other
    meaningful counts.
-   Quick actions: Add Product, My Products, Orders, and Market/AI
    Insights.
-   Product listing table/cards with clear availability and edit
    actions.
-   Helpful empty state with an "Add Your First Product" action.

### UI-05: Add/Edit Product

-   Fields for name, category, description, quantity, unit, price,
    location, availability, and optional image.
-   Use dropdowns or searchable selectors for category and location when
    suitable.
-   Show units beside quantity and price (for example, kg and ₹/kg) to
    prevent ambiguity.
-   Display field-level validation and save/cancel actions.
-   Ask for confirmation before deleting a listing.

### UI-06: Marketplace

-   Search field and filters for category and location.
-   Optional sort controls for price and newest listings.
-   Product cards with image, name, price/unit, available quantity,
    location, and farmer/listing details allowed by privacy rules.
-   Clear "View Details" and "Order" actions.
-   Loading, error, and no-results states.

### UI-07: Product Details

-   Product image and full description.
-   Price with unit, available quantity, category, and location.
-   Farmer/seller information limited to approved fields.
-   Quantity selector with stock limits and a clear order action.
-   Explain next steps before order submission.

### UI-08: Buyer Dashboard

-   Summary of recent orders and their statuses.
-   Quick link to browse the marketplace.
-   Order history with date, product, quantity, total if calculated, and
    status.
-   Clear empty state for users who have not ordered yet.

### UI-09: Orders

-   Show order reference, product, quantity, date, and status.
-   Use text labels such as Pending, Accepted, Rejected, Completed, or
    Cancelled according to the implemented workflow.
-   Provide only the actions allowed for the current user and status.
-   Confirm important actions and show their result.

### UI-10: Market Prices and AI Insights

-   Use charts only when they clarify trends; include labels, units,
    date ranges, and data source.
-   Display prediction inputs and results in plain language.
-   Distinguish observed data from model estimates.
-   Show the last-updated date and a notice when data is sample or
    incomplete.
-   Include a concise explanation of recommendation factors and
    limitations.

### UI-11: Admin Dashboard

-   Summary cards for user, listing, and order counts.
-   Searchable/filterable management tables.
-   Clear actions to review, edit, disable, or remove records based on
    permissions.
-   Confirmation prompts for destructive actions.
-   Keep admin navigation separate from farmer and buyer navigation.

### UI-12: Error, Empty, and Loading States

-   Provide a visible loading indicator during API requests.
-   Provide understandable messages when the backend is unavailable.
-   Offer a retry action when appropriate.
-   Avoid blank pages and raw server error messages.
-   Keep entered form values when safe to do so after validation errors.

## 5. Interaction Requirements

-   Every button and link must perform the action indicated by its
    label.
-   Use consistent labels such as Save Product, Cancel, View Details,
    Place Order, and Logout.
-   Ask for confirmation before destructive actions.
-   Prevent accidental double submissions.
-   Show field-specific validation near the relevant field.
-   Preserve keyboard navigation and visible focus indicators.
-   Do not rely only on hover to reveal important controls.

## 6. Accessibility and Responsiveness

-   Use semantic headings, labels, buttons, and form controls.
-   Ensure text and controls have sufficient contrast.
-   Associate form labels with inputs.
-   Provide useful alternative text for meaningful images.
-   Make the site usable with keyboard navigation.
-   Support common desktop, tablet, and mobile widths.
-   Avoid horizontal scrolling for ordinary forms and content.
-   Use adequately sized touch targets.

## 7. UX Acceptance Checklist

-   A first-time visitor can identify the purpose of the project and
    find registration.
-   A farmer can locate Add Product from the dashboard without guessing.
-   A buyer can find products by category and location.
-   Price and quantity units are always clear.
-   Every major page includes loading, error, and empty states where
    relevant.
-   The interface does not expose another user's private information.
-   Forms remain usable on a mobile-sized screen.
