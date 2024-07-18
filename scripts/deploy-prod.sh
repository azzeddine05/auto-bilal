docker pull ghcr.io/abdilaboutizwa/auto-bilal-api:prod;
docker-compose stop api && docker-compose rm api -f;
docker rmi $(docker images --filter dangling=true -q);
docker-compose up -d;

sleep 30 && docker compose exec api yarn migrate;