# Simple Website Project

A responsive HTML and CSS website with Docker containerization and AWS deployment ready.

## Features
- Responsive design
- Clean, modern UI
- Fully containerized with Docker
- Ready for AWS deployment

## Prerequisites
- Docker installed
- Git installed
- Docker Hub account
- AWS account (for deployment)
- AWS CLI configured

## Quick Start Locally
```bash
docker build -t my-website:latest .
docker run -p 80:8080 my-website:latest
