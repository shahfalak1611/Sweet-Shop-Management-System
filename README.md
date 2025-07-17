# Sweet Shop Management System

The Sweet Shop Management System is a full-stack JavaScript-based project built using the principles of Test-Driven Development (TDD). This system allows users to manage sweets by adding, deleting, updating, searching, sorting, purchasing, and restocking sweets. It includes a frontend built using React (with Tailwind CSS) and a backend written in JavaScript.

## Live Preview(using Vercel)
 View Frontend on Vercel : (https://sweet-shop-management-system-jstd.vercel.app)

## Table of Contents

- Features
- Folder Structure
- Technologies Used
- Prerequisites
- Installation and Setup Instructions
- Running the Project
- Test Reports
- Additional Notes

## Features

- Add new sweets with name, price, and quantity
- Update details of existing sweets
- Delete sweets from the inventory
- Purchase sweets (reduces quantity)
- Restock sweets (increases quantity)
- Search sweets by name
- Sort sweets by id,name, price,category or quantity
- View sweets in a table layout
- Backend written using TDD methodology
- LocalStorage integration for data persistence

## Technologies Used

- JavaScript (ES6+)
- React (with Vite)
- Tailwind CSS
- LocalStorage (for persistence)
- Manual TDD-style testing using JavaScript files

## Prerequisites

Make sure the following software is installed on your system:

- Node.js (version 18 or above)
- npm (Node Package Manager, comes with Node.js)
- Git (for cloning the repository)
- A modern code editor such as Visual Studio Code

## Installation and Setup Instructions

Follow the steps below to clone the repository and set up the project on your local machine.

### Step 1: Clone the Repository

Open a terminal and run:

git clone https://github.com/shahfalak1611/Sweet-Shop-Management-System.git


Then move into the project folder:

cd sweet-shop-management-system

### Step 2: Install Frontend Dependencies

Navigate to the `frontend` folder:
cd frontend

Install dependencies:

npm install
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
npm install --save-dev jest babel-jest jest-environment-jsdom @babel/preset-env @babel/preset-react @testing-library/react @testing-library/jest-dom identity-obj-proxy

This will install React, Vite, Tailwind, and other required packages.

To run tests:
npm test

These test scripts use console outputs to show whether the logic is working correctly (e.g., "✅ Test Passed", "❌ Test Failed").

### Step 3: Install Backend Dependencies

Navigate to `backend` folder:
cd backend

Install dependencies:

npm init -y

npm install --save-dev jest

To run tests:

npm test

These test scripts use console outputs to show whether the logic is working correctly (e.g., "✅ Test Passed", "❌ Test Failed").

## Running the Project Locally

Follow these steps to run the frontend locally using Vite:

1. Navigate to the frontend directory:

cd frontend

2. Start the development server:

npm run dev

3. Once the server starts, open your browser and go to:

http://localhost:5173


You should see the Sweet Shop Management UI where you can add, update, delete,sort,purchase,restock and search sweets.

## Test Reports:
- Frontend Test Report: [View Report](https://shahfalak1611.github.io/Sweet-Shop-Management-System/frontend-report)
- Backend Test Report: [View Report](https://shahfalak1611.github.io/Sweet-Shop-Management-System/backend-report)

## Additional Notes

- This project does not use any external database. All data is temporarily stored in LocalStorage for frontend persistence.
- This project was developed as part of a assessment given by INCUBYTE TECHNOLABS which mainly focused on TDD and frontend integration using modern JavaScript.

