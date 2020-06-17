### Running in Development

---

#### dependencies

1. python3
2. node
3. yarn

```bash
# setup backend api for flask
cd backend
pip install pinenv
pipenv install flask
pipenv install flask-cors

pipenv shell
python api.py # start api server at 5000

cd frontend #from root dir
yarn
yarn start #start react server at port 3000
```

### Running in Docker

---

#### dependencies

1. docker
2. node
3. yarn

```bash
cd frontend
yarn run build #build static html for production
docker-compose up -d # from root dir run docker as background proccess
#start backend at port 5000 & frontend at port 3000 as services
```
