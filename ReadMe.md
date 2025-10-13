**😻Contributors:** @shivamm-verma , @damanpreet2005 , Suhani Nagpal

# 📌 GenAI Earth Resource Monitor
**Objective**: GENAI Earth Resource Monitor is a system that analyzes satellite imagery to detect changes in forest cover, urban areas, and water bodies. The system automatically generates detailed and simple language reports for decision-makers, combining past trends and current metrics to give predictive forecasts.
`GenAI`, `NextJs`, `Image processing`

## ⚙️ Project Local Setup

### ⌛ [Frontend (`NextJs`/`TailwindCSS`)](./frontend/)
1. Clone the repo.
    ```sh
    git clone https://github.com/shivamm-verma/genai-earth-resource-monitor.git
    ```
1. Install dependencies
    ```sh
    npm install --force
    ```
1. Run the Project
    ```sh
    npm run dev
    ```
> This willl run on [**Localhost 3000**](https://localhost:3000)

> **Tech Stack:** `NextJs`, `TailwindCSS`, `React-router`, etc.

### ⌛ [Backend (`NodeJs`/`Expressjs`)](./backend/)
1.
    ```sh
    cd backend
    ```
1.
    ```sh
    npm install
    ```
1. Create a .env file in the backend folder (by removing `.example` from `.env.example` file and putting the values into it.)
1. Start server
    ```sh
    npm install -g nodemon   # install globally (first time only)
    nodemon server.js
    ```
1. Setup redis
`redis-server`
1. Start mlqueues
`node workers/mlWorkers.js`

> **Tech Stack:** `NodeJs`, `ExpressJs`, `Mongoose`, `Multer`, `BullMQ`, `Redis` etc.

### ⌛ [ML Model (`FastAPI`/`OpenCV`)](./model/)
1.
    ```sh
    cd model
    ```
1.
    ```sh
    python -m venv venv

    # in Windows
    venv\Scripts\activate
    # in MacOS/Linux
    source venv/bin/activate
    ```
1. download requirement.txt
    ```sh
    pip install -r requirements.txt
    ```
1. Now locally run it;-
    ```sh
    uvicorn app:app --reload
    ```
1. Take care that, 
    * `main.py`: Runs the local code, summarizes, using OpenCV. [Local File only]
    * ✅ `app.py`: **FastAPI**  backend that talks with the website backend to connect the frontend. [wrapping up thee `main.py`]