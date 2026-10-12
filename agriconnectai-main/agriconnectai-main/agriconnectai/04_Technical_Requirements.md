# AgriConnect AI --- Technical Requirements

## 1. Purpose

This document defines the proposed software architecture, technology
stack, data requirements, security expectations, and quality checks for
AgriConnect AI.

## 2. Proposed Technology Stack

Use compatible stable versions and keep the versions consistent across
the development environment.

### Frontend

-   HTML5 for page structure.
-   CSS3 for responsive styling.
-   JavaScript for form handling and API calls.
-   Optional charting library for market-price visualization if needed.
-   VS Code as the editor.
-   During development, the separate frontend may be served using VS
    Code Live Server. Live Server serves static files only; it does not
    start the Spring Boot API.

### Backend

-   Java (use a version supported by the selected Spring Boot release;
    Java 21 LTS is a reasonable baseline for a new project).
-   Spring Boot for REST APIs and application configuration.
-   Spring Web for controllers and HTTP endpoints.
-   Spring Data JPA for database persistence.
-   Bean Validation for validating request fields.
-   Maven for dependency management and builds.
-   Spring Security is recommended for production-grade authentication
    and authorization.
-   BCrypt password hashing through a suitable password encoder.

### Database

-   MySQL relational database.
-   MySQL Workbench for database inspection and SQL queries.
-   Keep database schema names, column names, entity mappings, and
    repository methods consistent.

### Development Tools

-   VS Code.
-   JDK matching the project's configured Java version.
-   Maven wrapper included with the project (`mvnw` / `mvnw.cmd`) where
    available.
-   MySQL Server and MySQL Workbench.
-   Git for source control is recommended.
-   A modern browser with developer tools.

## 3. Architecture

Use a layered architecture:

1.  **Frontend:** pages, forms, client-side validation, and API calls.
2.  **REST Controller:** maps HTTP requests to application operations.
3.  **Service Layer:** business rules, authorization-related checks, and
    workflows.
4.  **Repository Layer:** database access through Spring Data JPA.
5.  **Entity/Database Layer:** persistent users, products, orders,
    market prices, and related records.

The frontend should communicate with backend endpoints using JSON over
HTTP. Do not put database credentials or secret keys in frontend
JavaScript.

## 4. Suggested Backend Package Structure

Adapt the package names to the current project rather than creating
duplicate classes.

``` text
src/main/java/com/agriconnect/backend/
├── controller/
├── dto/
├── entity/
├── repository/
├── service/
├── security/
├── config/
└── exception/
```

Suggested frontend structure:

``` text
frontend/
├── index.html
├── register.html
├── login.html
├── dashboard.html
├── product.html
├── marketplace.html
├── orders.html
├── admin.html
├── css/
└── js/
```

If the existing project keeps CSS and JavaScript beside the HTML files,
that is also acceptable; use consistent paths. If serving pages from
Spring Boot's static resources, place them under
`src/main/resources/static/`. Avoid maintaining two conflicting copies
of the same page.

## 5. Database Requirements

Use a configured database and ensure the tables match the JPA entities.
A possible logical schema is:

### USERS

-   `user_id` --- primary key, auto-increment.
-   `name` --- required.
-   `email` --- required and unique.
-   `password` --- required password hash, never plain text.
-   `phone` --- optional or required according to validation rules.
-   `role` --- controlled role value.
-   `location` --- user location.

### PRODUCTS

-   `product_id` --- primary key.
-   `farmer_id` --- foreign key to `USERS`.
-   `name`, `category`, `description`.
-   `quantity`, `unit`, `price`.
-   `location`, `image_url` or image metadata as appropriate.
-   `availability`, `created_at`, `updated_at`.

### ORDERS

-   `order_id` --- primary key.
-   `buyer_id` --- foreign key to `USERS`.
-   `product_id` --- foreign key to `PRODUCTS`.
-   `quantity`, `unit_price` snapshot, and total if calculated.
-   `status`, `created_at`, `updated_at`.
-   Required contact/delivery fields if the project supports them.

### MARKET_PRICES

-   `market_price_id` --- primary key.
-   `crop_or_product`, `market_location`, `price`, `unit`.
-   `recorded_at`, `source`, and optional source metadata.

Additional tables may be introduced for categories, reviews,
notifications, prediction records, or audit logs if required.

**Important:** These are logical requirements, not instructions to
blindly recreate the current database. First compare the existing schema
with the entity classes. For example, if the database primary key is
`user_id`, the `User` entity must explicitly map its ID to `user_id` or
use a matching property/column name.

## 6. API Requirements

Use consistent REST routes and response formats. Suggested routes
(adjust to match the existing implementation):

  ----------------------------------------------------------------------------------
  Method                  Example route                      Purpose
  ----------------------- ---------------------------------- -----------------------
  POST                    `/api/auth/register`               Register an account

  POST                    `/api/auth/login`                  Authenticate

  GET                     `/api/products`                    Browse available
                                                             products

  GET                     `/api/products/{id}`               View product details

  POST                    `/api/products`                    Create a product
                                                             listing

  PUT                     `/api/products/{id}`               Update an owned listing

  DELETE                  `/api/products/{id}`               Delete/disable an owned
                                                             listing

  GET                     `/api/orders`                      Retrieve orders
                                                             permitted for the
                                                             current user

  POST                    `/api/orders`                      Place an order

  PATCH                   `/api/orders/{id}/status`          Update an allowed order
                                                             status

  GET                     `/api/market-prices`               Retrieve market-price
                                                             records

  POST                    `/api/ai/price-prediction`         Request a price
                                                             estimate

  POST                    `/api/ai/selling-recommendation`   Request a selling
                                                             recommendation

  GET/POST                `/api/admin/...`                   Authorized
                                                             administration
                                                             operations
  ----------------------------------------------------------------------------------

Use suitable HTTP status codes, validate request bodies, and return
structured error messages. Do not expose internal exception messages,
SQL statements, or sensitive data in API responses.

## 7. Frontend-to-Backend Connection

-   Configure one base API URL for development and production.
-   If using Live Server on port 5500, the frontend is separate from
    Spring Boot, commonly on port 8080.
-   Confirm that the backend is running before testing API calls.
-   Configure CORS for the specific frontend origin used in development;
    avoid unrestricted CORS in production.
-   Inspect browser Developer Tools → Console and Network when a request
    fails.
-   Check the Spring Boot terminal for startup errors and the request
    logs.
-   Keep endpoint paths and JSON property names consistent between
    JavaScript and DTOs.

## 8. Security Requirements

-   Hash passwords using BCrypt or an equivalent established password
    encoder.
-   Never return passwords or password hashes in API responses.
-   Validate all input on the server, even if the frontend also
    validates it.
-   Enforce authentication and role/ownership checks on protected
    operations.
-   Use parameterized ORM/repository queries; avoid building SQL from
    untrusted strings.
-   Keep database passwords and secret keys outside source control.
-   Use HTTPS in deployment.
-   Configure CORS narrowly for approved origins.
-   Apply safe error handling and appropriate logging without recording
    passwords or tokens.
-   Consider rate limiting and account-abuse protection before public
    deployment.

## 9. AI and Data Requirements

-   Document the data source, collection date, units, and any cleaning
    performed.
-   Separate actual market records from generated/demo data.
-   Define model inputs and outputs before implementing prediction
    logic.
-   Establish a baseline before evaluating a more complex model.
-   Split training and evaluation data appropriately; avoid evaluating
    only on training data.
-   Report an appropriate metric for the chosen prediction task.
-   Handle missing data and unsupported crops/locations explicitly.
-   Display uncertainty and limitations in the user interface.
-   Keep the application usable when an AI service/model is unavailable.

For a student prototype, it is acceptable to implement a simple baseline
or rule-based recommendation first, provided it is clearly described and
not falsely presented as a validated AI model.

## 10. Testing Requirements

### Unit tests

Test service rules, validation, order calculations, stock checks, and
recommendation logic.

### Integration tests

Test controllers, repositories, database mappings, authentication, and
API response codes.

### Manual end-to-end tests

-   Register and log in.
-   Add, edit, and remove a product.
-   Browse and filter products.
-   Place an order and verify the correct status.
-   Confirm stock cannot become negative.
-   Confirm role and ownership restrictions.
-   Check validation, backend-offline, and no-data states.
-   Verify the layout at desktop and mobile widths.

## 11. Build and Run

From the backend directory containing `pom.xml` and `mvnw.cmd`, open a
VS Code terminal and run:

``` powershell
.\mvnw.cmd spring-boot:run
```

If Maven is installed and configured, `mvn spring-boot:run` may also be
used. Keep the terminal open while the backend runs.

Run the frontend using Live Server from the `frontend` folder if that is
the current setup. Open the exact local URL shown by Live Server. Do not
expect Live Server to start Java or connect to MySQL by itself.

If port 8080 is already in use, identify the process using that port or
configure another server port; do not start multiple backend instances
unknowingly.

## 12. Deployment Requirements

-   Deploy the frontend and backend to a suitable hosting environment,
    or package the frontend as Spring Boot static resources if desired.
-   Use a managed or securely hosted MySQL database.
-   Configure production environment variables and credentials.
-   Enable HTTPS and production CORS settings.
-   Run tests and database migration/schema checks before release.
-   Keep backups and document how to restore the database.
-   Provide a README with setup, configuration, build, run, and test
    instructions.

## 13. Definition of Done

A feature is complete when: - Its frontend and backend behavior work
together. - Input validation and authorization are implemented. -
Database changes are saved and retrieved correctly. - Success, error,
loading, and empty states are handled. - Relevant tests pass. - No
passwords, credentials, or sensitive details are exposed. - Setup
instructions are updated where necessary.
