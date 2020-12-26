## What is
Node.js api with just one dependency (mongodb) in docker-compose infrastructure


## Requiments
- curl
- Docker
- Docker composer


## Installation
### 1. Install Docker 
#### Linux
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
#### Others SO
https://docs.docker.com/engine/install/


### 2. Install docker-compose 
#### Linux
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```
#### Others SO
https://docs.docker.com/compose/install/


## Run server
### 1. Up the database resource: mongo
```bash
docker-compose up -d mongo mongo-express
```

### 2. Start development server
```bash
docker-compose up app
```

## 3. Make a post http request to the endpoint requested, to create the denunciation
```bash
curl -X POST \
  http://localhost:3000/v1/denuncias \
  -H 'Content-Type: application/json' \
  -d '{
  "latitude": -9.56921,
  "longitude": -36.76422,
  "denunciante": {
    "nome": "José de Oliveira",
    "cpf": "95761638037"
  },
  "denuncia": {
    "titulo": "Esgoto a céu aberto",
    "descricao": "Existe um esgoto a céu aberto nesta localidade."
  }
}'

```
## 4. Make a get http request to the same endpoint - to list all denunciation and test the feature
```bash
curl -X GET \
  http://localhost:3000/v1/denuncias
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
