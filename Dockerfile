FROM busybox:1.37.0

WORKDIR /app

RUN addgroup --system --gid 1001 httpd
RUN adduser --system --uid 1001 -G httpd httpd
USER httpd

EXPOSE 80
ENV PORT=80
ENV HOSTNAME="0.0.0.0"

COPY --chown=httpd:httpd ./dist /app

CMD ["/bin/sh", "-c", "httpd -f -p \"$HOSTNAME:$PORT\" -h /app -vv"]