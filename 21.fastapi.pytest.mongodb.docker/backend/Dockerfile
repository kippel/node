FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml uv.lock ./

RUN pip install --no-cache-dir uv \
    && uv sync --frozen --no-cache \
    && uv pip install --no-cache ".[test]" \
    && ln -s $(which python) /usr/local/bin/pytest


COPY . .

EXPOSE 4000

CMD ["uv", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "4000"]

