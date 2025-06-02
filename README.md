# Todo App

A basic full-stack Todo application with:
- **Backend**: Spring Boot
- **Frontend**: React

## Structure

```
Todo/
├── src         ← Spring Boot service
└── todo-frontend/   ← React UI
```

## How to Run

### 1. Backend

1. Open application from any IDE and run it
   ```
2. Start the Spring Boot server:
   ```bash
   ./mvnw spring-boot:run
   ```
   The API will be available at `http://localhost:8080`.

### 2. Frontend

1. In a second terminal, go into the React folder:
   ```bash
   cd todo-frontend
   ```
2. Install dependencies (only needed once):
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   The UI opens at `http://localhost:3000` and talks to the backend automatically.

## Usage

- Open `http://localhost:3000` in your browser.
- Add, toggle, or delete todos. All changes are saved by the Spring Boot API.
