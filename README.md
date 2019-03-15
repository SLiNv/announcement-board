# announcement-board
HackRPI 2019 Announcement Board


## Development

### How to set up
```
meteor npm install
meteor --settings settings/dev.json
```

## Deployment
```
docker build -t hackrpi/annon-board .

docker run -d \
	-e ROOT_URL=http://status.hackrpi.com \
	-e MONGO_URL="mongodb://mongo:27017/hackrpi" \
	-e METEOR_SETTINGS="$(cat settings/production.json)" \
	-p 8080:3000 \
	--link=mongo:mongodb \
	--name annon-board \
	hackrpi/annon-board
```

To enter the container:
```
docker exec -it [container-name] bash

Example:
docker exec -it annon-board bash
```

Other useful commands
```
docker rm -f annon-aboard
docker image rm -f hackrpi/annon-board
```