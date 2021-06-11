# MariaDB setup
https://mariadb.com/kb/en/installing-and-using-mariadb-via-docker/

## Setting mariaDB mySQL docker
Just create the docker compose and use the `image: mariadb:10.4`
To make the db persistent, create a empty folder and use a volume pointing to `/var/lib/mysql`

## Connect to mariaDB
Get IP assigned to docker, e.g. `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mysql`
$ mysql -h 172.23.0.2 -u root -p