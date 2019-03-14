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

docker run -d 
	-e ROOT_URL=http://status.hackrpi.com \
	-e MONGO_URL="mongodb://mongo:27017/hackrpi" \
	# -e METEOR_SETTINGS="$(cat path/to/settings.json)" \
	-p 8080:80 \
	--link=mongo:mongodb \
	--name annonboard \
	hackrpi/annon-board

```

To enter the container:
```
docker exec -it mongo bash
```