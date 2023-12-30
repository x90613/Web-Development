# Web Programming Final

## Run the project

1. Install dependencies
   ```bash
   yarn
   ```
2. Get Pusher credentials

   參考助教上課提供的 [Pusher Setup](https://github.com/ntuee-web-programming/112-1-unit2-notion-clone#pusher-setup)

3. Get Google Credentials

   參考助教上課提供的 [Google Credential](https://developers.google.com/identity/protocols/oauth2/web-server?hl=zh-tw)

4. Create `.env.local` file in the project root and add the following content:

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

5. Start the database
   ```bash
   docker compose up -d
   ```
6. Run migrations
   ```bash
   yarn migrate
   ```
7. Start the development server
   ```bash
   yarn dev
   ```
8. Open http://localhost:3000 in your browser

## Introduction

### 登入頁面

<img width="1226" alt="Screenshot 2023-12-30 at 6 41 44 PM" src="https://github.com/x90613/wp1121/assets/100923612/017cdfc0-6a17-4b64-b152-c10b890ecc31">


### 系統畫面
![Picture1](https://github.com/x90613/wp1121/assets/100923612/54eded7d-b25d-482d-b711-c68b5bc21ef6)


1. 可以新增Plan
2. 在這裡可以選擇要編輯的Plan
3. 之後還是可以修改Plan的name以及description
4. 可以新增行程
5. 在這邊可以查看行程並且可以重新編輯
6. 可以分享給你的好友並且可以同步即時編輯
7. 最後可以輸出到你的Google Calender


## 組員之負責項目

1. r12944038 前端初步建構、後端、API、useContext
2. r12944044 前端、UI/UX、OAuth登入、GoogleCalender、GoogleMap串接
