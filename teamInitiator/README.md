# Team Initiator


![displayTeamInitiator](../images/TeamInitiator.png)
**You can use the Search Bar to find an event you want to join!**

![displayTeamInitiator2](../images/TeamInitiator2.png)
**If you haven't participated in the event yet, you can click to participate.**

![displayTeamInitiator3](../images/TeamInitiator3.png)
**If you have already join the event, you can discuss with other participants.**




## Run this Project
1. creat .env.local File
    ```
    POSTGRES_URL="postgres://postgres:postgres@localhost:5432/twitter"
    ```

2. init this project
    ```bash
    yarn
    yarn add @mui/material @emotion/react @emotion/styled
    ```

3. deploy the data base through docker 
    ```bash
    #You can also run the following command to activate the changes to groups(it depends on your docker setting)
    newgrp docker

    #Start the containers in the Docker Compose project in detached mode, allowing them to run without blocking the terminal.
    docker compose up -d

    #You can stop the container with
    docker compose down
    ```

4. start
    ```bash
    yarn migrate

    #Start the App
    yarn dev
    ```

5. open the page by browser
using this URL: http://localhost:3000/
