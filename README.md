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

docker run -d \
  -e ROOT_URL=http://example.com \
  -e MONGO_URL=mongodb://url \
  -e MONGO_OPLOG_URL=mongodb://oplog_url \
  -e MAIL_URL=smtp://mail_url.com \
  -p 80:3000 \
  yourname/app

To enter the container:
```
docker exec -it annon-board bash
```