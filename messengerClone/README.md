# Messenger Clone

![messengerClone](../images/messengerClone.png)

## Run this project

1. Install dependencies
   ```bash
   yarn
   ```
2. Get Pusher credentials
   1. Create a pusher account at https://pusher.com/
   2. Create a new app
      Click Get Started or Manage/Create appon the Channel tab
      Enter the app name
      Select a cluster. Pick the one closest to you, i.e. ap3(Asia Pacific (Tokyo))
      Click Create app
   3. Go to App Keys tab, you will see the following keys:
      
      * `app_id`
      * `key`
      * `secret`
      * `cluster`
      
   4. Copy these keys to your .env.local file:
      ```
      PUSHER_ID=<app_id>
      NEXT_PUBLIC_PUSHER_KEY=<key>
      PUSHER_SECRET=<secret>
      NEXT_PUBLIC_PUSHER_CLUSTER=<cluster>
      ```
   5. NEXT_PUBLIC prefix is required for the client side to access the env variable.
      Also, please remember to add these keys to your environment variables handler in src/lib/env/private.ts and src/lib/env/public.ts. You can view those two files for more details.
   6. Go to App Settings tab, scroll down to Enable authorized connections and enable it. Note: If you enable the Enable client events option, every connection will last only 30 seconds if not authorized. So if you just want to do some experiments, you might need to disable this option.
   
   You can refer to the [Pusher Setup](https://github.com/ntuee-web-programming/112-1-unit2-notion-clone#pusher-setup) section in Notion Clone README for more details.

3. Create `.env.local` file in the project root and add the following content:

   ```text
   POSTGRES_URL=postgres://postgres:postgres@localhost:5432/messenger

   PUSHER_ID=
   NEXT_PUBLIC_PUSHER_KEY=
   PUSHER_SECRET=
   NEXT_PUBLIC_PUSHER_CLUSTER=

   AUTH_SECRET=<this can be any random string>

   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
   Note that Github auth is not implemented in this project, therefore, those settings about Github login is nor required, and, you do not need to fill in `AUTH_GITHUB` fields.

4. Start the database
   ```bash
   docker compose up -d
   #run migrations
   yarn migrate
   ```
5. Start the development server
   ```bash
   yarn dev
   ```
6. Open http://localhost:3000 in your browser
