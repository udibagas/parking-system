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
php artisan jwt:secret

# prepare database server
sudo mysql -uroot -e 'create database parking_system'
sudo mysql -uroot -e 'grant all on parking_system.* to parking_system@localhost identified with mysql_native_password by "Bismillah1@#$%"'
sudo mysql -uroot -e 'flush privileges'

# migrate then populate db
php artisan migrate
php artisan db:seed

# prepare document root
sudo mv /var/www/html /var/www/html-bak
sudo ln -s `pwd`/public /var/www/html
mkdir `pwd`/public/snapshot
chmod 777 `pwd`/public/snapshot
sudo chmod 777 storage -R

# prepare web server
sudo sed -i 172s/None/All/ /etc/apache2/apache2.conf
sudo a2enmod rewrite
# allow web to access serial & printer
sudo usermod -a -G dialout www-data
sudo usermod -a -G root www-data
sudo usermod -a -G lp www-data
sudo systemctl restart apache2

# systemd
sudo mv *.service /etc/systemd/system
# sesuaikan script-nya

crontab -e
# * * * * * cd parking-system && php artisan schedule:run >> /dev/null 2>&1


