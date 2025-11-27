# backend/Dockerfile
FROM python:3.12-slim

# Install system deps (optional but good for psycopg, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency list
COPY requirements.txt .

# Install Python deps
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY app ./app

# Environment
ENV PYTHONUNBUFFERED=1

# Expose port (inside container)
EXPOSE 8000

# Run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
