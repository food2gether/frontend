FROM busybox:1.37.0

WORKDIR /app

RUN addgroup --system --gid 1001 httpd \
    && adduser --system --uid 1001 -G httpd httpd

USER httpd

EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

COPY --chown=root:root --chmod=755 ./dist /app

CMD ["/bin/sh", "-c", "httpd -f -p \"$HOSTNAME:$PORT\" -h /app -vv"]