source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

source "https://rails-assets.org" do
  # for bootstrap-alpha6
  gem "rails-assets-tether", ">= 1.3.3"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", github: "rails/rails"
# Use postgresql as the database for Active Record
gem "puma", "3.12.6"

gem "sqlite3"

# Use SCSS for stylesheets
gem "sass-rails", "~> 5.0"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier", ">= 1.3.0"
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem "turbolinks", "~> 5"
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
gem "capistrano-rails", group: :development
gem "capistrano3-puma"
gem "capistrano-rbenv", "~> 2.1"

#Required for using ed25519 key https://github.com/net-ssh/net-ssh/issues/565
gem "ed25519", ">= 1.2", "< 2.0"
gem "bcrypt_pbkdf", ">= 1.0", "< 2.0"

gem "bootstrap", git: "https://github.com/twbs/bootstrap-rubygem", tag: "v4.3.1"
gem "jquery-rails"
gem "jquery-slick-rails"

gem "font-awesome-rails"
gem "popper_js", "1.14.5"
gem "mailgun-ruby", "~>1.1.6"
gem "bootstrap4-datetime-picker-rails"
gem "momentjs-rails"

gem "aws-sdk-s3", require: false

#FIXME Remove this once on not edge versio of rails
gem "coffee-rails"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem "capybara", "~> 2.13"
  gem "selenium-webdriver"
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.2"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem "stripe"
gem "simple_calendar", "~> 2.0"

gem "trix-rails", require: "trix"
gem "devise"
gem "devise_invitable", "~> 2.0.1"

gem "ruby-oembed" #, github: "elektronaut/ruby-oembed", ref: "dbf581c796eef15fe9ecff2558756bbfab9c9a91"
gem "will_paginate", "~> 3.2"
gem "local_time"
