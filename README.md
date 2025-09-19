# 💎 JewelryShop

Modern jewelry e-commerce platform. Full-stack application built with Clean Architecture principles.

## 🛠️ Tech Stack

**Backend (.NET 8)**
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL/SQLite
- Clean Architecture

**Frontend (React 19)**
- TypeScript
- Vite
- Zod Validation
- Responsive Design

## 🚀 Installation

### Backend
```bash
cd JewelryShop.Api
dotnet ef database update --project ../JewelryShop.Infrastructure --startup-project .
dotnet run
```

### Frontend
```bash
cd JewelryShop-Frontend
npm install
npm run dev
```

## 📱 Features

- ✅ User authentication system
- ✅ Product catalog management
- ✅ Shopping cart & order processing
- ✅ Profile & address management
- ✅ Form validations (Zod)
- ✅ Responsive design

## 🔗 URLs

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 📂 Project Structure

```
JewelryShop/
├── JewelryShop.Api/          # Web API layer
├── JewelryShop.Application/  # Business logic
├── JewelryShop.Domain/       # Domain entities
├── JewelryShop.Infrastructure/ # Data access
└── JewelryShop-Frontend/     # React frontend
```
