## Requiments
- curl
- Docker
- Docker composer

## Docker install
### Linux
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
### Others SO
https://docs.docker.com/engine/install/


## Docker-compose install
### Linux
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```
### Others SO
https://docs.docker.com/compose/install/


## To up the database resource
```bash
docker-compose up -d mongo mongo-express
```

## TODO:
- arquicture
  - read about patterns for node application
  - keep using everything by myself without lib/framework?
  - draw objects and responsabilities
- DOTENV in node (lib?)
 --ex: URL DA API
 --ex: URL OF MONGODB AND CREDENTIALS
- cache as resourse? memcache ? ou como ta? - two factors
- tdd and refactory
- remove express lib? - done
- documentation
- mongodb share path? - done


- recode with new pattern and tdd
- node in docker
- memcache?
