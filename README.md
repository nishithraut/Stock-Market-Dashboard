# Stock Market Application

A full-stack stock market dashboard that allows users to view, manage, and track their holdings, orders, and positions in real-time. The application features a secure authentication system and an intuitive dashboard interface.

## Features

- **User Authentication** (Register / Login / Logout)
- **View Holdings** with detailed data
- **Track Orders and Positions**
- **Responsive Dashboard UI**
- **JWT-based Security**
- **MongoDB Database Integration**

## Tech Stack

**Frontend:** React, JavaScript, HTML, CSS  
**Backend:** Node.js, Express.js, MongoDB, JWT  
**Other:** REST APIs

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/nishithraut/Stock_Market.git
cd Stock_Market
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd dashboard
npm install
npm start
```

The frontend will run on `http://localhost:3000` and backend on `http://localhost:5000`.

## Folder Structure

```
Stock_Market/
├── backend/       # Node.js + Express backend
│   ├── Controller/
│   ├── model/
│   ├── Routes/
│   ├── schemas/
│   ├── utils/
│   ├── .env
│   └── package.json
├── dashboard/     # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## License
This project is licensed under the MIT License.
