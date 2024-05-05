PRAGMA synchronous = OFF;
PRAGMA journal_mode = MEMORY;
BEGIN TRANSACTION;
CREATE TABLE `address` (
  `id` integer  NOT NULL
,  `title` varchar(191) NOT NULL
,  `type` varchar(191) NOT NULL
,  `default` integer NOT NULL DEFAULT '0'
,  `address` json NOT NULL
,  `customer_id` integer  NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `attachments` (
  `id` integer  NOT NULL
,  `url` varchar(191) NOT NULL DEFAULT ''
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `attributes` (
  `id` integer  NOT NULL
,  `slug` varchar(191) NOT NULL
,  `name` varchar(191) NOT NULL
,  `shop_id` integer  DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `attribute_product` (
  `id` integer  NOT NULL
,  `attribute_value_id` integer  NOT NULL
,  `product_id` integer  NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `attribute_values` (
  `id` integer  NOT NULL
,  `attribute_id` integer  NOT NULL
,  `value` varchar(191) NOT NULL
,  `meta` varchar(191) DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `balances` (
  `id` integer  NOT NULL
,  `shop_id` integer  NOT NULL
,  `admin_commission_rate` double DEFAULT NULL
,  `total_earnings` double NOT NULL DEFAULT '0'
,  `withdrawn_amount` double NOT NULL DEFAULT '0'
,  `current_balance` double NOT NULL DEFAULT '0'
,  `payment_info` json DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `categories` (
  `id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `slug` varchar(191) NOT NULL
,  `icon` varchar(191) DEFAULT NULL
,  `image` json DEFAULT NULL
,  `details` text COLLATE BINARY
,  `parent` integer  DEFAULT NULL
,  `type_id` integer  NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  `deleted_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `category_product` (
  `id` integer  NOT NULL
,  `product_id` integer  NOT NULL
,  `category_id` integer  NOT NULL
);
CREATE TABLE `category_shop` (
  `id` integer  NOT NULL
,  `shop_id` integer  NOT NULL
,  `category_id` integer  NOT NULL
);
CREATE TABLE `coupons` (
  `id` integer  NOT NULL
,  `code` varchar(191) NOT NULL
,  `description` text COLLATE BINARY
,  `image` json DEFAULT NULL
,  `type` text  NOT NULL DEFAULT 'fixed'
,  `amount` double(8,2) NOT NULL DEFAULT '0.00'
,  `active_from` varchar(191) NOT NULL
,  `expire_at` varchar(191) NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  `deleted_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `failed_jobs` (
  `id` integer  NOT NULL
,  `uuid` varchar(191) NOT NULL
,  `connection` text NOT NULL
,  `queue` text NOT NULL
,  `payload` longtext NOT NULL
,  `exception` longtext NOT NULL
,  `failed_at` timestamp NOT NULL DEFAULT current_timestamp
);
CREATE TABLE `media` (
  `id` integer  NOT NULL
,  `model_type` varchar(191) NOT NULL
,  `model_id` integer  NOT NULL
,  `uuid` char(36) DEFAULT NULL
,  `collection_name` varchar(191) NOT NULL
,  `name` varchar(191) NOT NULL
,  `file_name` varchar(191) NOT NULL
,  `mime_type` varchar(191) DEFAULT NULL
,  `disk` varchar(191) NOT NULL
,  `conversions_disk` varchar(191) DEFAULT NULL
,  `size` integer  NOT NULL
,  `manipulations` json NOT NULL
,  `generated_conversions` json NOT NULL
,  `custom_properties` json NOT NULL
,  `responsive_images` json NOT NULL
,  `order_column` integer  DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `migrations` (
  `id` integer  NOT NULL
,  `migration` varchar(191) NOT NULL
,  `batch` integer NOT NULL
);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2020_04_17_194830_create_permission_tables', 1),
(6, '2020_06_02_051901_create_pickbazar_tables', 1),
(7, '2020_10_26_163529_create_media_table', 1),
(8, '2021_04_17_051901_create_new_pickbazar_tables', 1);
CREATE TABLE `model_has_permissions` (
  `permission_id` integer  NOT NULL
,  `model_type` varchar(191) NOT NULL
,  `model_id` integer  NOT NULL
);
CREATE TABLE `model_has_roles` (
  `role_id` integer  NOT NULL
,  `model_type` varchar(191) NOT NULL
,  `model_id` integer  NOT NULL
);
CREATE TABLE `orders` (
  `id` integer  NOT NULL
,  `tracking_number` varchar(191) NOT NULL
,  `customer_id` integer  NOT NULL
,  `customer_contact` varchar(191) NOT NULL
,  `status` integer  NOT NULL
,  `amount` double NOT NULL
,  `sales_tax` double DEFAULT NULL
,  `paid_total` double DEFAULT NULL
,  `total` double DEFAULT NULL
,  `coupon_id` integer  DEFAULT NULL
,  `parent_id` integer  DEFAULT NULL
,  `shop_id` integer  DEFAULT NULL
,  `discount` double DEFAULT NULL
,  `payment_id` varchar(191) DEFAULT NULL
,  `payment_gateway` varchar(191) DEFAULT NULL
,  `shipping_address` json DEFAULT NULL
,  `billing_address` json DEFAULT NULL
,  `logistics_provider` integer  DEFAULT NULL
,  `delivery_fee` double DEFAULT NULL
,  `delivery_time` varchar(191) DEFAULT NULL
,  `deleted_at` timestamp NULL DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `order_product` (
  `id` integer  NOT NULL
,  `order_id` integer  NOT NULL
,  `product_id` integer  NOT NULL
,  `variation_option_id` integer  DEFAULT NULL
,  `order_quantity` varchar(191) NOT NULL
,  `unit_price` varchar(191) NOT NULL
,  `subtotal` varchar(191) NOT NULL
,  `deleted_at` timestamp NULL DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `order_status` (
  `id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `serial` integer NOT NULL
,  `color` varchar(191) DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `password_resets` (
  `email` varchar(191) NOT NULL
,  `token` varchar(191) NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `permissions` (
  `id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `guard_name` varchar(191) NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `personal_access_tokens` (
  `id` integer  NOT NULL
,  `tokenable_type` varchar(191) NOT NULL
,  `tokenable_id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `token` varchar(64) NOT NULL
,  `abilities` text COLLATE BINARY
,  `last_used_at` timestamp NULL DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `products` (
  `id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `slug` varchar(191) NOT NULL
,  `description` text COLLATE BINARY
,  `type_id` integer  NOT NULL
,  `price` double(8,2) DEFAULT '0.00'
,  `shop_id` integer  DEFAULT NULL
,  `sale_price` double(8,2) DEFAULT NULL
,  `sku` varchar(191) DEFAULT NULL
,  `quantity` integer NOT NULL DEFAULT '0'
,  `in_stock` integer NOT NULL DEFAULT '1'
,  `is_taxable` integer NOT NULL DEFAULT '0'
,  `shipping_class_id` integer  DEFAULT NULL
,  `status` text  NOT NULL DEFAULT 'publish'
,  `product_type` text  NOT NULL DEFAULT 'simple'
,  `unit` varchar(191) NOT NULL
,  `height` varchar(191) DEFAULT NULL
,  `width` varchar(191) DEFAULT NULL
,  `length` varchar(191) DEFAULT NULL
,  `image` json DEFAULT NULL
,  `gallery` json DEFAULT NULL
,  `deleted_at` timestamp NULL DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  `max_price` double(8,2) DEFAULT NULL
,  `min_price` double(8,2) DEFAULT NULL
);
CREATE TABLE `product_tag` (
  `id` integer  NOT NULL
,  `product_id` integer  NOT NULL
,  `tag_id` integer  NOT NULL
);
CREATE TABLE `providers` (
  `id` integer  NOT NULL
,  `user_id` integer  NOT NULL
,  `provider_user_id` varchar(191) NOT NULL
,  `provider` varchar(191) NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `roles` (
  `id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `guard_name` varchar(191) NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `role_has_permissions` (
  `permission_id` integer  NOT NULL
,  `role_id` integer  NOT NULL
);
CREATE TABLE `settings` (
  `id` integer  NOT NULL
,  `options` json NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `shipping_classes` (
  `id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `amount` double NOT NULL
,  `is_global` varchar(191) NOT NULL DEFAULT '1'
,  `type` text  NOT NULL DEFAULT 'fixed'
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `shops` (
  `id` integer  NOT NULL
,  `owner_id` integer  NOT NULL
,  `name` varchar(191) DEFAULT NULL
,  `slug` varchar(191) DEFAULT NULL
,  `description` text COLLATE BINARY
,  `cover_image` json DEFAULT NULL
,  `logo` json DEFAULT NULL
,  `is_active` integer NOT NULL DEFAULT '0'
,  `address` json DEFAULT NULL
,  `settings` json DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `tags` (
  `id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `slug` varchar(191) NOT NULL
,  `icon` varchar(191) DEFAULT NULL
,  `image` json DEFAULT NULL
,  `details` text COLLATE BINARY
,  `type_id` integer  NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  `deleted_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `tax_classes` (
  `id` integer  NOT NULL
,  `country` varchar(191) DEFAULT NULL
,  `state` varchar(191) DEFAULT NULL
,  `zip` varchar(191) DEFAULT NULL
,  `city` varchar(191) DEFAULT NULL
,  `rate` double NOT NULL
,  `name` varchar(191) DEFAULT NULL
,  `is_global` integer DEFAULT NULL
,  `priority` integer DEFAULT NULL
,  `on_shipping` integer NOT NULL DEFAULT '1'
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `types` (
  `id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `slug` varchar(191) NOT NULL
,  `icon` varchar(191) DEFAULT NULL
,  `image` json DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `users` (
  `id` integer  NOT NULL
,  `name` varchar(191) NOT NULL
,  `email` varchar(191) NOT NULL
,  `email_verified_at` timestamp NULL DEFAULT NULL
,  `password` varchar(191) DEFAULT NULL
,  `remember_token` varchar(100) DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  `is_active` integer NOT NULL DEFAULT '1'
,  `shop_id` integer  DEFAULT NULL
);
CREATE TABLE `user_profiles` (
  `id` integer  NOT NULL
,  `avatar` json DEFAULT NULL
,  `bio` text COLLATE BINARY
,  `socials` json DEFAULT NULL
,  `contact` varchar(191) DEFAULT NULL
,  `customer_id` integer  NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `variation_options` (
  `id` integer  NOT NULL
,  `title` varchar(191) NOT NULL
,  `price` varchar(191) NOT NULL
,  `sale_price` varchar(191) DEFAULT NULL
,  `quantity` varchar(191) NOT NULL
,  `is_disable` integer NOT NULL DEFAULT '0'
,  `sku` varchar(191) DEFAULT NULL
,  `options` json NOT NULL
,  `product_id` integer  DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
CREATE TABLE `withdraws` (
  `id` integer  NOT NULL
,  `shop_id` integer  NOT NULL
,  `amount` double(8,2) NOT NULL
,  `payment_method` varchar(191) DEFAULT NULL
,  `status` text  NOT NULL DEFAULT 'pending'
,  `details` text COLLATE BINARY
,  `note` text COLLATE BINARY
,  `deleted_at` timestamp NULL DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `address_customer_id_foreign` (`customer_id`);
,  ADD PRIMARY KEY (`id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `attributes_shop_id_foreign` (`shop_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `attribute_product_attribute_value_id_foreign` (`attribute_value_id`)
,  ADD KEY `attribute_product_product_id_foreign` (`product_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `attribute_values_attribute_id_foreign` (`attribute_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `balances_shop_id_foreign` (`shop_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `categories_parent_foreign` (`parent`)
,  ADD KEY `categories_type_id_foreign` (`type_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `category_product_product_id_foreign` (`product_id`)
,  ADD KEY `category_product_category_id_foreign` (`category_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `category_shop_shop_id_foreign` (`shop_id`)
,  ADD KEY `category_shop_category_id_foreign` (`category_id`);
,  ADD PRIMARY KEY (`id`);
,  ADD PRIMARY KEY (`id`)
,  ADD UNIQUE (`uuid`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `media_model_type_model_id_index` (`model_type`,`model_id`);
,  ADD PRIMARY KEY (`id`);
,  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`)
,  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);
,  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`)
,  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);
,  ADD PRIMARY KEY (`id`)
,  ADD UNIQUE (`tracking_number`)
,  ADD KEY `orders_status_foreign` (`status`)
,  ADD KEY `orders_customer_id_foreign` (`customer_id`)
,  ADD KEY `orders_shop_id_foreign` (`shop_id`)
,  ADD KEY `orders_parent_id_foreign` (`parent_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `order_product_order_id_foreign` (`order_id`)
,  ADD KEY `order_product_product_id_foreign` (`product_id`)
,  ADD KEY `order_product_variation_option_id_foreign` (`variation_option_id`);
,  ADD PRIMARY KEY (`id`);
,  ADD KEY `password_resets_email_index` (`email`);
,  ADD PRIMARY KEY (`id`);
,  ADD PRIMARY KEY (`id`)
,  ADD UNIQUE (`token`)
,  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `products_type_id_foreign` (`type_id`)
,  ADD KEY `products_shipping_class_id_foreign` (`shipping_class_id`)
,  ADD KEY `products_shop_id_foreign` (`shop_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `product_tag_product_id_foreign` (`product_id`)
,  ADD KEY `product_tag_tag_id_foreign` (`tag_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `providers_user_id_foreign` (`user_id`);
,  ADD PRIMARY KEY (`id`);
,  ADD PRIMARY KEY (`permission_id`,`role_id`)
,  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);
,  ADD PRIMARY KEY (`id`);
,  ADD PRIMARY KEY (`id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `shops_owner_id_foreign` (`owner_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `tags_type_id_foreign` (`type_id`);
,  ADD PRIMARY KEY (`id`);
,  ADD PRIMARY KEY (`id`);
,  ADD PRIMARY KEY (`id`)
,  ADD UNIQUE (`email`)
,  ADD KEY `users_shop_id_foreign` (`shop_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `user_profiles_customer_id_foreign` (`customer_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `variation_options_product_id_foreign` (`product_id`);
,  ADD PRIMARY KEY (`id`)
,  ADD KEY `withdraws_shop_id_foreign` (`shop_id`);
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT, PRIMARY KEY AUTOINCREMENT=9;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  MODIFY `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT;
,  ADD CONSTRAINT `address_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`);
,  ADD CONSTRAINT `attributes_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `attribute_product_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_values` (`id`) ON DELETE CASCADE
,  ADD CONSTRAINT `attribute_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `attribute_values_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `balances_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`);
,  ADD CONSTRAINT `categories_parent_foreign` FOREIGN KEY (`parent`) REFERENCES `categories` (`id`)
,  ADD CONSTRAINT `categories_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);
,  ADD CONSTRAINT `category_product_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
,  ADD CONSTRAINT `category_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `category_shop_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
,  ADD CONSTRAINT `category_shop_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
,  ADD CONSTRAINT `orders_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
,  ADD CONSTRAINT `orders_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE
,  ADD CONSTRAINT `orders_status_foreign` FOREIGN KEY (`status`) REFERENCES `order_status` (`id`);
,  ADD CONSTRAINT `order_product_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
,  ADD CONSTRAINT `order_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
,  ADD CONSTRAINT `order_product_variation_option_id_foreign` FOREIGN KEY (`variation_option_id`) REFERENCES `variation_options` (`id`);
,  ADD CONSTRAINT `products_shipping_class_id_foreign` FOREIGN KEY (`shipping_class_id`) REFERENCES `shipping_classes` (`id`)
,  ADD CONSTRAINT `products_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE
,  ADD CONSTRAINT `products_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `product_tag_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
,  ADD CONSTRAINT `product_tag_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `providers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
,  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `shops_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);
,  ADD CONSTRAINT `tags_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);
,  ADD CONSTRAINT `users_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;
,  ADD CONSTRAINT `user_profiles_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`);
,  ADD CONSTRAINT `variation_options_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
END TRANSACTION;
