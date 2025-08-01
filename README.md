# Mathery

**Mathery** is an AI-powered math tutoring system that lets students browse modules & topics, answer exercises (MCQ or image-based), and review results. Admins can manage modules, topics, exercises, and view user performance.

---



## Tech Stack

* **Frontend**: Next.js, shadcn/ui, Tailwind CSS, Zustand, SWR
* **Backend**: FastAPI, PostgreSQL
* **Authentication**: JWT
* **Hosting**: Vercel (frontend), thirdygayares.com (API)


https://github.com/user-attachments/assets/186f06f2-e0c6-4330-9da5-8cbae1ec07d0


---

## Backend Base URL

```
https://mathery-api.thirdygayares.com
```

Use this as the prefix for all API requests.
E.g.:

```bash
GET https://mathery-api.thirdygayares.com/api/**
```
---

##  Getting Started

### Prerequisites

* Node.js ≥ 18
* Python ≥ 3.13
* PostgreSQL ≥ 14

### 1. Clone the repo

```bash
git clone https://github.com/thirdygayares/mathery.git
cd mathery
```

### 2. Setup Backend

1 **Create your environment file**

   * Add a new `.env` in the project root and populate it using the values shown in the screenshot.

   * <img width="756" height="485" alt="image" src="https://github.com/user-attachments/assets/11f4a952-968c-4c6f-babe-42e14d724f78" />


2 **Run the API**
   You have two options—pick one:

   **A) Docker & Docker-Compose**
   *(Requires Docker & Docker-Compose installed)*

   ```bash
   # Build the production image
   docker build -t mathery-api-prod:latest .

   # Bring up the containers
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

   **B) Local (Terminal)**

   ```bash
   # Install Python dependencies
   pip install -r requirements.txt

   # Apply database migrations
   alembic upgrade head

   # Start the server (auto-reload enabled)
   uvicorn main:app --reload
   ```

  <img width="1050" height="363" alt="image" src="https://github.com/user-attachments/assets/97979ae5-a65f-47b9-81be-6d5861ec7757" />




### 3. Setup Frontend

**3. Frontend Setup**

1. Change into the project folder:

   ```bash
   cd mathery
   ```
2. Create your environment file:

   ```bash
   touch .env.local
   ```

   (Fill it with the variables shown in the screenshot.)
   <img width="583" height="166" alt="image" src="https://github.com/user-attachments/assets/b59bba71-56fc-4fd7-a163-5f07c2de8c78" />

4. Install the dependencies:

   ```bash
   npm install
   ```
5. Start the development server:

   ```bash
   npm run dev
   ```




---

## API Documentation

on demo, visit:

```
https://mathery-api.thirdygayares.com/docs
```

for the interactive OpenAPI schema.

---

## ERD | Data Model

<img width="1847" height="867" alt="image" src="https://github.com/user-attachments/assets/4df8e90a-5387-4fde-b81f-409bd6a5802a" />


  

---

## Use Cases

<img width="2131" height="1145" alt="image" src="https://github.com/user-attachments/assets/5282868e-a17b-419c-9872-55b9353921f2" />



---

## License

[MIT License](LICENSE)
