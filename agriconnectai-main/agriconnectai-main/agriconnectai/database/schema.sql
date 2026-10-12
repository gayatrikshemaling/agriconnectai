-- ============================================================================
-- AgriConnect AI - MySQL Database Schema & Seed Data
-- Database Name: agriconnect_db
-- Matching Screen 19 (Database Tables) & Technical Requirements Specification
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `agriconnect_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `agriconnect_db`;

-- ----------------------------------------------------------------------------
-- 1. USERS TABLE
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `ai_predictions`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `market_prices`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL, -- BCrypt Hash
  `phone` VARCHAR(20) DEFAULT NULL,
  `role` ENUM('Farmer', 'Buyer', 'Admin') NOT NULL DEFAULT 'Farmer',
  `location` VARCHAR(150) DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 2. PRODUCTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE `products` (
  `product_id` INT AUTO_INCREMENT PRIMARY KEY,
  `farmer_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'Vegetables',
  `variety` VARCHAR(100) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `quantity` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `unit` VARCHAR(20) NOT NULL DEFAULT 'kg',
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `location` VARCHAR(150) DEFAULT NULL,
  `quality` VARCHAR(50) DEFAULT 'Grade A',
  `harvest_date` DATE DEFAULT NULL,
  `status` ENUM('Active', 'Sold Out', 'Harvesting') NOT NULL DEFAULT 'Active',
  `image_url` VARCHAR(255) DEFAULT 'images/tomatoes.jpg',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`farmer_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 3. ORDERS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE `orders` (
  `order_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(30) NOT NULL UNIQUE,
  `buyer_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` DECIMAL(10,2) NOT NULL,
  `unit` VARCHAR(20) NOT NULL DEFAULT 'kg',
  `unit_price` DECIMAL(10,2) NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `delivery_location` VARCHAR(255) NOT NULL,
  `status` ENUM('Pending', 'Accepted', 'Completed', 'Rejected', 'Cancelled') NOT NULL DEFAULT 'Pending',
  `message` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`buyer_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 4. MARKET_PRICES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE `market_prices` (
  `market_price_id` INT AUTO_INCREMENT PRIMARY KEY,
  `crop` VARCHAR(100) NOT NULL,
  `current_price` DECIMAL(10,2) NOT NULL,
  `previous_price` DECIMAL(10,2) NOT NULL,
  `unit` VARCHAR(20) NOT NULL DEFAULT 'kg',
  `price_change` VARCHAR(20) NOT NULL,
  `trend` ENUM('up', 'down', 'stable') NOT NULL DEFAULT 'stable',
  `market_location` VARCHAR(150) NOT NULL,
  `recorded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 5. AI_PREDICTIONS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE `ai_predictions` (
  `prediction_id` INT AUTO_INCREMENT PRIMARY KEY,
  `crop` VARCHAR(100) NOT NULL,
  `current_price` DECIMAL(10,2) NOT NULL,
  `predicted_price_7d` DECIMAL(10,2) NOT NULL,
  `expected_change` VARCHAR(20) NOT NULL,
  `decision` VARCHAR(50) NOT NULL, -- e.g. 'WAIT TO SELL', 'SELL NOW'
  `confidence` VARCHAR(50) NOT NULL,
  `summary` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 6. NOTIFICATIONS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE `notifications` (
  `notification_id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `type` VARCHAR(50) NOT NULL DEFAULT 'info',
  `target_role` VARCHAR(50) NOT NULL DEFAULT 'All',
  `icon` VARCHAR(10) DEFAULT '🔔',
  `is_read` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================================
-- SEED INITIAL DATA (Matching UI Screens 4, 6, 8, 9, 13, 14, 15)
-- ============================================================================

-- Users
INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `phone`, `role`, `location`, `bio`) VALUES
(1, 'Ramesh Patel', 'ramesh@agri.com', '$2a$12$e8Uv9H6U1s3Iq.mC/rT37O7V6GvEwDquHjN68z5.o7OqP5E1M8y1a', '+91 98765 43210', 'Farmer', 'Mysuru, Karnataka', 'Specializing in organic heirloom tomatoes and red onions.'),
(2, 'Priya Sharma', 'priya@freshmart.com', '$2a$12$e8Uv9H6U1s3Iq.mC/rT37O7V6GvEwDquHjN68z5.o7OqP5E1M8y1a', '+91 91234 56780', 'Buyer', 'Bengaluru, Karnataka', 'Procurement lead for FreshMart supermarkets.'),
(3, 'Admin Manager', 'admin@agriconnect.ai', '$2a$12$e8Uv9H6U1s3Iq.mC/rT37O7V6GvEwDquHjN68z5.o7OqP5E1M8y1a', '+91 90000 00000', 'Admin', 'Bengaluru, Karnataka', 'Platform oversight and marketplace compliance.'),
(4, 'Suresh Gowda', 'suresh@agri.com', '$2a$12$e8Uv9H6U1s3Iq.mC/rT37O7V6GvEwDquHjN68z5.o7OqP5E1M8y1a', '+91 98451 23456', 'Farmer', 'Mandya, Karnataka', 'Cultivating premium Sharbati wheat and sweet Ooty carrots.');

-- Products
INSERT INTO `products` (`product_id`, `farmer_id`, `name`, `category`, `variety`, `description`, `quantity`, `unit`, `price`, `location`, `quality`, `harvest_date`, `status`, `image_url`) VALUES
(1, 1, 'Tomato', 'Vegetables', 'Heirloom Organic', 'Fresh organic tomatoes picked at peak ripeness.', 500.00, 'kg', 25.00, 'Mysuru, Karnataka', 'Grade A', '2026-10-10', 'Active', 'images/tomatoes.jpg'),
(2, 1, 'Onion', 'Vegetables', 'Red Nasik', 'Cured, crisp red onions with high storage quality.', 300.00, 'kg', 35.00, 'Mysuru, Karnataka', 'Grade A', '2026-10-08', 'Active', 'images/onions.jpg'),
(3, 1, 'Potato', 'Vegetables', 'Kufri Jyoti Organic', 'Farm fresh organic potatoes with low skin moisture.', 400.00, 'kg', 20.00, 'Mysuru, Karnataka', 'Grade A', '2026-10-09', 'Active', 'images/potatoes.jpg'),
(4, 4, 'Carrot', 'Vegetables', 'Ooty Sweet', 'Crunchy orange carrots harvested in Nilgiri belts.', 150.00, 'kg', 30.00, 'Mandya, Karnataka', 'Grade A', '2026-10-11', 'Active', 'images/carrots.jpg'),
(5, 4, 'Wheat', 'Grains & Cereals', 'Sharbati Golden', 'Golden high-protein wheat grains, machine cleaned.', 1000.00, 'kg', 32.00, 'Mandya, Karnataka', 'Premium Grade', '2026-09-28', 'Active', 'images/wheat.jpg');

-- Orders
INSERT INTO `orders` (`order_id`, `order_number`, `buyer_id`, `product_id`, `quantity`, `unit`, `unit_price`, `total_price`, `delivery_location`, `status`, `message`, `created_at`) VALUES
(1, '#001', 2, 1, 50.00, 'kg', 25.00, 1250.00, 'FreshMart Depot, Indiranagar, Bengaluru', 'Pending', 'Please ensure safe wooden crate packaging.', '2026-10-11 10:30:00'),
(2, '#002', 2, 2, 20.00, 'kg', 35.00, 700.00, 'FreshMart Depot, Indiranagar, Bengaluru', 'Accepted', 'Confirmed for morning dispatch.', '2026-10-10 14:15:00'),
(3, '#003', 2, 3, 15.00, 'kg', 20.00, 300.00, 'FreshMart Central Store, Bengaluru', 'Completed', 'Delivered and inspected.', '2026-10-08 09:00:00');

-- Market Prices
INSERT INTO `market_prices` (`crop`, `current_price`, `previous_price`, `unit`, `price_change`, `trend`, `market_location`) VALUES
('Tomato', 25.00, 22.00, 'kg', '+13.6%', 'up', 'Mysuru APMC'),
('Onion', 35.00, 38.00, 'kg', '-7.9%', 'down', 'Nasik / Bengaluru APMC'),
('Potato', 20.00, 20.00, 'kg', '0.0%', 'stable', 'Hassan / Mysuru APMC'),
('Wheat', 32.00, 31.00, 'kg', '+3.2%', 'up', 'Mandya Market Yard'),
('Rice', 45.00, 46.00, 'kg', '-2.1%', 'down', 'Raichur Grain Market'),
('Carrot', 30.00, 28.00, 'kg', '+7.1%', 'up', 'Ooty / Bengaluru Market');

-- AI Predictions
INSERT INTO `ai_predictions` (`crop`, `current_price`, `predicted_price_7d`, `expected_change`, `decision`, `confidence`, `summary`) VALUES
('Tomato', 25.00, 30.00, '+20%', 'WAIT TO SELL', '88% Confidence', 'Price is expected to increase in the next 5-7 days due to anticipated local market supply shortages.'),
('Onion', 35.00, 31.50, '-10%', 'SELL NOW', '84% Confidence', 'Price is expected to decline as buffer stocks arrive in wholesale hubs.'),
('Potato', 20.00, 20.50, '+2.5%', 'HOLD STABLE', '91% Confidence', 'Market price is expected to remain stable with minor seasonal fluctuations.');

-- Notifications
INSERT INTO `notifications` (`title`, `type`, `target_role`, `icon`, `is_read`, `created_at`) VALUES
('New order received for Tomato (50 kg)', 'order', 'Farmer', '📦', FALSE, NOW() - INTERVAL 5 MINUTE),
('Market price of Tomato increased by 12%', 'market', 'All', '📈', FALSE, NOW() - INTERVAL 2 HOUR),
('Order #002 has been accepted', 'order', 'Buyer', '✅', TRUE, NOW() - INTERVAL 3 HOUR),
('AI Suggestion: Best time to sell Onion', 'ai', 'Farmer', '🤖', TRUE, NOW() - INTERVAL 1 DAY),
('New user registered: Suresh (Farmer)', 'admin', 'Admin', '👤', TRUE, NOW() - INTERVAL 2 DAY);
