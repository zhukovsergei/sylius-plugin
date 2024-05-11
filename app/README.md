## Installation
### Docker
1. docker-compose build
2. docker-compose run --rm php-cli composer install
3. docker-compose run --rm manager-node yarn install

### Database
1. DATABASE_URL=mysql://sylius:sylius@mysqldb:3306/sylius?serverVersion=8&charset=utf8mb4
2. docker-compose run --rm php-cli php bin/console doctrine:mi:mi  
3. docker-compose run --rm php-cli php bin/console doctrine:fixtures:load 
4. docker-compose up -d
