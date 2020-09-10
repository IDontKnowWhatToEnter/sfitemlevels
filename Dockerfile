FROM library/nginx:1.19-alpine

COPY ./config/nginx/prod /etc/nginx/conf.d/default.conf
COPY ./build /site