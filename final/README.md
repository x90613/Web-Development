# Web Programming Final

## Run the project

1. Install dependencies
   ```bash
   yarn
   ```
2. Get Pusher credentials

   參考之前 [Pusher Setup](https://github.com/ntuee-web-programming/112-1-unit2-notion-clone#pusher-setup) 

3. Create `.env.local` file in the project root and add the following content:

   ```text
   POSTGRES_URL=postgres://postgres:postgres@localhost:5432/traveler

   PUSHER_ID=
   NEXT_PUBLIC_PUSHER_KEY=
   PUSHER_SECRET=
   NEXT_PUBLIC_PUSHER_CLUSTER=

   AUTH_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=

   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Start the database
   ```bash
   docker compose up -d
   ```
5. Run migrations
   ```bash
   yarn migrate
   ```
6. Start the development server
   ```bash
   yarn dev
   ```
7. Open http://localhost:3000 in your browser

## Introduction

登入頁面


系統畫面
1. 可以新增Plan
2. 在這裡可以選擇要編輯的Plan
3. 之後還是可以修改Plan的name以及description
4. 可以新增行程
5. 在這邊可以查看行程並且可以重新編輯
6. 可以分享給你的好友並且可以同步即時編輯
7. 最後可以輸出到你的Google Calender