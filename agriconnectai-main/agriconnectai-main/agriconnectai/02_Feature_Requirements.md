# AgriConnect AI --- Feature Requirements

## 1. Purpose

This document defines the functional features the AgriConnect AI
application should provide. Build and test features in the order below
so that each module relies on working earlier modules.

## 2. User Roles

-   **Guest:** Can view public pages and browse public listings if
    enabled.
-   **Farmer:** Can manage their own profile and product listings, and
    view relevant orders and insights.
-   **Buyer:** Can browse listings, manage their profile, place orders,
    and track their own orders.
-   **Admin:** Can manage users, categories, listings, and platform
    records.

The backend must enforce role permissions. Hiding a button in the
frontend is not sufficient security.

## 3. Functional Requirements

### FR-01: Home Page

-   Display the AgriConnect AI name, purpose, and clear navigation.
-   Provide links to register, log in, and browse the marketplace.
-   Highlight key capabilities such as direct selling, product
    discovery, and market intelligence.
-   Include responsive layout and readable calls to action.

### FR-02: Registration

-   Collect name, email, password, phone, location, and requested role
    where appropriate.
-   Validate required fields and email format.
-   Reject duplicate email addresses.
-   Store passwords as secure hashes; never store plain-text passwords.
-   Display clear success and error messages.

### FR-03: Login and Logout

-   Authenticate users with email and password.
-   Return a safe response without exposing password hashes.
-   Maintain a secure session or token according to the chosen
    authentication design.
-   Provide logout and protect authenticated routes.
-   Show a useful message when credentials are invalid.

### FR-04: User Profile

-   Allow users to view and update permitted profile fields.
-   Validate changes on both client and server.
-   Prevent users from changing protected fields or editing another
    user's profile without authorization.

### FR-05: Farmer Dashboard

-   Show a summary of the farmer's listings, available stock, and
    relevant orders.
-   Provide shortcuts to add a product, manage listings, view orders,
    and open AI/market insights.
-   Show empty states when the farmer has not added products yet.

### FR-06: Add and Manage Products

-   Product fields should include product name, category, description,
    quantity, unit, price, location, availability, and optional image.
-   Validate that quantity and price are positive and required fields
    are present.
-   Allow the owner to create, view, edit, and remove their own
    listings.
-   Support categories such as vegetables, fruits, grains and cereals,
    pulses, spices, oilseeds, plantation crops, and other locally
    relevant produce.
-   Keep category and location options manageable rather than
    hard-coding them throughout the application.

### FR-07: Marketplace

-   Display available products as cards or a table with product name,
    category, price, unit, quantity, and location.
-   Allow search by product name.
-   Filter by category and location.
-   Support sorting, such as price or newest listing, if included in the
    release.
-   Show a helpful message when no products match the filters.
-   Display detailed product information before ordering.

### FR-08: Buyer Dashboard

-   Summarize recent orders and order statuses.
-   Provide shortcuts to browse products and view order history.
-   Show relevant marketplace information without exposing other buyers'
    private data.

### FR-09: Orders

-   Allow an authenticated buyer to place an order for an available
    listing.
-   Capture product, quantity, buyer, delivery/contact details as
    required, and order date.
-   Validate that requested quantity is available.
-   Save an order with a defined initial status, such as `PENDING`.
-   Allow the farmer to view orders for their listings and update
    permitted statuses.
-   Allow buyers to view their own orders and current statuses.
-   Prevent unauthorized users from viewing or changing orders.
-   Define and test how stock changes when an order is placed,
    cancelled, or completed.

### FR-10: Market Prices

-   Display price records by crop/product, market/location, unit, and
    date.
-   Clearly identify the source and last-updated date.
-   If live external data is not integrated, label sample or manually
    entered records as demo/sample data.
-   Do not imply that sample values are current official prices.

### FR-11: AI Crop Intelligence

-   Provide crop-related insights based on the input data and the
    selected feature.
-   Begin with a small, testable scope, such as crop information or a
    simple rule-based insight.
-   If a machine-learning model is used, document its input fields,
    dataset, training method, evaluation, and limitations.
-   Clearly label outputs as informational and not guaranteed
    agricultural advice.

### FR-12: Price Prediction

-   Accept relevant inputs such as crop, location/market, quantity or
    unit, and historical price period where supported.
-   Return an estimated price or range with the unit, date/context, and
    explanation of important assumptions.
-   Display a message if there is insufficient data.
-   Evaluate predictions against held-out historical data before
    claiming accuracy.
-   Do not fabricate predictions when no model or reliable data exists;
    use a clearly labelled demo estimate during development.

### FR-13: Smart Selling Recommendation

-   Use available information such as current listing price, historical
    prices, location, demand indicators, and quantity when those data
    sources exist.
-   Present an understandable recommendation, for example comparing
    available market options or indicating that more data is needed.
-   Explain the key factors behind a recommendation.
-   Do not promise profit or guarantee that a particular selling time
    will produce the best price.

### FR-14: Admin Dashboard

-   Restrict access to authorized administrator accounts.
-   Show summary counts for users, listings, and orders where useful.
-   Allow administrators to manage product categories and review or
    disable inappropriate listings.
-   Provide suitable confirmation for destructive actions.
-   Record important administrative changes where practical.

### FR-15: Notifications and Error Handling

-   Show clear success, validation, and failure messages.
-   Avoid displaying stack traces, SQL details, secrets, or internal
    errors to users.
-   Provide useful empty/loading states for pages that fetch data.

## 4. Suggested Build Order

1.  Project setup and database connection.
2.  User entity, repository, registration, and login.
3.  Role-based access and dashboards.
4.  Product entity, repository, service, controller, and product form.
5.  Marketplace search and filters.
6.  Orders and stock validation.
7.  Admin category/listing management.
8.  Market-price data module.
9.  AI crop intelligence prototype.
10. Price prediction and smart selling recommendation.
11. Testing, security review, and deployment.

## 5. Core Acceptance Tests

-   Duplicate registration is rejected.
-   Invalid login is rejected without revealing whether a password hash
    is stored.
-   A buyer cannot edit a farmer's listing.
-   A farmer cannot edit another farmer's listing.
-   A buyer cannot order more stock than is available.
-   A user cannot access another user's order by changing an ID in a URL
    or API request.
-   Product filters return matching results and handle no-result cases.
-   Sample price data is labelled correctly.
-   AI features handle missing or invalid inputs and explain their
    limitations.
