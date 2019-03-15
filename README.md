# announcement-board
HackRPI 2019 Announcement Board


## Development

### How to set up
```
meteor npm install
meteor
```

## Deployment
```
docker build -t hackrpi/annon-board .

docker run -d \
	-e ROOT_URL=http://status.hackrpi.com \
	-e MONGO_URL="mongodb://mongo:27017/hackrpi" \
	-p 8080:3000 \
	--link=mongo:mongodb \
	--name annon-board \
	hackrpi/annon-board
	
	# -e METEOR_SETTINGS="$(cat path/to/settings.json)" \
```

To enter the container:
```
docker exec -it [container-name] bash

Example:
docker exec -it annon-board bash
```