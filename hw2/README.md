# Web Programming HW#2

首先到backend建立.env File
```bash
PORT=8000
MONGO_URL="mongodb+srv://<username>:<password>@<cluster>.example.mongodb.net/?retryWrites=true&w=majority"
```
then到frontend建立.env File
```bash
VITE_API_URL="http://localhost:8000/api"
```


init this project
```bash
#enter hw1 folder
cd frontend
yarn
cd ..
cd backend
yarn
```

starting backend and frontend
```bash
# enter hw1 folder
cd frontend
yarn start
cd ..
cd backend
yarn start
```

open the page by browser
using this URL: http://localhost:5173/
