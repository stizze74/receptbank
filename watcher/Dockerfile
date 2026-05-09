FROM alpine:3.20
RUN apk add --no-cache docker-cli docker-cli-compose inotify-tools git bash tzdata
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
WORKDIR /repo
ENV TZ=Europe/Stockholm
CMD ["/entrypoint.sh"]
