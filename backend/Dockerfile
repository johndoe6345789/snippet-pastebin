FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

RUN mkdir -p /app/data

ENV FLASK_APP=app.py
ENV DATABASE_PATH=/app/data/snippets.db
ENV CORS_ALLOWED_ORIGINS=*

EXPOSE 5000

CMD ["python", "app.py"]
