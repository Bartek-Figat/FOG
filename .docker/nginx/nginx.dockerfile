FROM debian:latest as certs
RUN apt-get update && apt-get install -y openssl
RUN ["/bin/bash", "-c", "mkdir /certs && cd /certs && openssl req -x509 -out localhost.crt -keyout localhost.key -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -extensions EXT -config <( printf \"[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth\")"]

FROM nginx:alpine

COPY --from=certs /certs /certs
