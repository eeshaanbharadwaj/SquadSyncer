# 🚀 Squad Syncer – Real-Time Team Collaboration Platform
 
**Squad Syncer** is a full-stack team collaboration app that allows users to create and join squads based on skills and collaborate in real-time. Built with modern web technologies and Socket.io, it focuses on seamless onboarding, secure authentication, and live communication.

## ✨ Features

- 🔹 Skill-based team creation and join requests  
- 🔹 Real-time messaging using Socket.io  
- 🔹 Secure user authentication with JWT  
- 🔹 Modular architecture with separate services for frontend, backend, and chat  
- 🔹 Intuitive user interface with clean navigation between Squad, Chat, and Profile

## 🧰 Tech Stack

| Layer    | Tech                                    |
|----------|-----------------------------------------|
| Frontend | React, Tailwind CSS                     |
| Backend  | Node.js, Express, MongoDB               |
| Chat     | Node.js, Socket.io                      |
| Auth     | JSON Web Tokens (JWT)                   |
| Styles   | Tailwind CSS                            |

## 📁 Project Structure

```
squad-syncer/
├── frontend/       # React UI
├── backend/        # REST API (Node.js + Express)
├── chat/           # Custom real-time chat service (Socket.io)
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/eeshaanbharadwaj/SquadSyncer.git
cd squadsyncer
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```
- Runs on [http://localhost:3000](http://localhost:3000)

### 3️⃣ Backend Setup

```bash
cd ../backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://your-db-url
JWT_SECRET=yourSuperSecretKey
```

Then start the backend server:

```bash
npm run dev
```

- Runs on [http://localhost:5000](http://localhost:5000)

### 4️⃣ Chat Server Setup

```bash
cd ../chat
npm install
node index.js
```

- Socket.io chat server runs on [http://localhost:7000](http://localhost:7000)
