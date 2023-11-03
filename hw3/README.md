# Web Programming HW#3


creat .env.local File
```
POSTGRES_URL="postgres://postgres:postgres@localhost:5432/twitter"
```

```bash
#init this project
yarn

#You can also run the following command to activate the changes to groups(it depends on your docker setting)
newgrp docker

#以後台模式啟動 Docker Compose 項目中的容器，讓它們在不阻塞terminal的情況下運行。(即啟動容器)
docker compose up -d

#You can stop it with(即關閉容器)
docker compose down

#執行 database migration
yarn migrate

#Start the App
yarn dev
```

open the page by browser
using this URL: http://localhost:3000/
