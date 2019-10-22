docker volume create data

docker run -d --restart on-failure -v data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=clemclem -e MYSQL_DATABASE=qinder --name qinder mysql:8 --default-authentication-plugin=mysql_native_password

docker run --name phpmyadmin -d --link qinder:db -p 8081:80 phpmyadmin/phpmyadmin
