# Dev Setup

```
docker-compose pull
docker-compose run --rm npm install
docker-compose up -d webserver
```

The site should be accessible via http://localhost now.

# Prod

Build the production container

```
./build.sh <versionNumber>
```

Upload the file ```sfitemlevels-<versionNumber>.tar``` to the server.

```docker load --input sfitemlevels-<versionNumber>.tar```

Stop current stack and start new one.
```docker stop sfitemlevels && docker run --restart always --name sfitemlevels sfitemlevels:<versionNumber>```



