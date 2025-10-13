from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
import tempfile
from main import run_complete_analysis

app = FastAPI(title="GenAI Earth Resource API")

# Allow CORS for frontend requests (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_images(files: List[UploadFile] = File(...)):
    temp_dir = tempfile.mkdtemp()

    # Save uploaded files temporarily
    image_paths = []
    for file in files:
        file_path = os.path.join(temp_dir, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        image_paths.append(file_path)

    # Run your full analysis pipeline
    results = run_complete_analysis(image_paths, output_base_dir="api_results")

    # Optionally, clean up temp files here

    return {"status": "success", "data": results}