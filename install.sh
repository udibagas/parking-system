#!/bin/sh

# Install dependency
cd ~
sudo apt install -y \
    php \
    php-curl \
    php-json \
    php-mbstring \
    php-mysql \
    php-xml \
    php-zip \
    apache2 \
    mysql-server \
    python3-pip \
    git \
    composer \
    sed

git clone -b main --single-branch https://github.com/udibagas/parking-system.git
sudo pip3 install python-escpos requests
cd parking-system
composer install
cp .env-prod .env
php artisan key:generate
php artisan storage:link

# prepare database server
sudo mysql -uroot -e 'create database parking_system'
sudo mysql -uroot -e 'grant all on parking_system.* to parking_system@localhost identified with mysql_native_password by "Bismillah1@#$%"'
sudo mysql -uroot -e 'flush privileges'

# migrate then populate db
php artisan migrate
php artisan db:seed

# prepare web server
sudo sed -i 172s/None/All/ /etc/apache2/apache2.conf
# set apache2 user as server/parking
sudo a2enmod rewrite
sudo systemctl restart apache2

# systemd
sudo mv *.service /etc/systemd/system
# sesuaikan script-nya

crontab -e
# * * * * * cd parking-system && php artisan schedule:run >> /dev/null 2>&1

crontab -e (as root)
@daily echo "" > /var/log/parking.log


