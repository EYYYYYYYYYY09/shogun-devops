# CI/CD Pipeline Setup Guide

This guide will help you set up the CI/CD pipeline for automated testing, building, and deployment.

## Overview

The CI/CD pipeline includes:
- **Code Validation**: Checks HTML, CSS, JavaScript, and Dockerfile
- **Docker Build**: Builds the Docker image locally
- **Docker Test**: Tests the container before pushing
- **Docker Push**: Pushes to Docker Hub
- **AWS Deployment**: Deploys to EC2 or ECS
- **Notifications**: Sends Slack notifications

## Supported Platforms

### 1. GitHub Actions (Recommended)

**Advantages:**
- Native GitHub integration
- Free for public repositories
- Generous free tier for private repos
- Easy secret management

**Setup Steps:**

1. **Create GitHub Repository**
   \`\`\`bash
   git remote add origin https://github.com/yourusername/website-project.git
   git branch -M main
   git push -u origin main
   \`\`\`

2. **Add Repository Secrets**
   - Go to: Settings → Secrets and variables → Actions
   - Add these secrets:
     - `DOCKER_USERNAME`: Your Docker Hub username
     - `DOCKER_PASSWORD`: Your Docker Hub access token
     - `AWS_ACCESS_KEY_ID`: AWS access key
     - `AWS_SECRET_ACCESS_KEY`: AWS secret key
     - `EC2_HOST`: Your EC2 public IP
     - `EC2_SSH_KEY`: Your EC2 SSH private key
     - `SLACK_WEBHOOK`: Slack webhook URL (optional)

3. **Workflows are automatically active**
   - Workflows in `.github/workflows/` are automatically detected
   - They'll trigger on push to main/develop branches

### 2. GitLab CI

**Advantages:**
- Built-in GitLab integration
- Powerful CI/CD features
- Shared runners available

**Setup Steps:**

1. **Push to GitLab**
   \`\`\`bash
   git remote add gitlab https://gitlab.com/yourusername/website-project.git
   git push -u gitlab main
   \`\`\`

2. **Add CI/CD Variables**
   - Go to: Project Settings → CI/CD → Variables
   - Add the same variables as GitHub Actions
   - Mark sensitive variables as "Protect variable"

3. **Pipeline Configuration**
   - `.gitlab-ci.yml` is automatically detected
   - Pipeline will start on push

### 3. Jenkins

**Advantages:**
- Self-hosted option
- Highly customizable
- Great for enterprise

**Setup Steps:**

1. **Install Jenkins**
   \`\`\`bash
   docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
   \`\`\`

2. **Install Required Plugins**
   - Docker Pipeline
   - AWS EC2 Plugin
   - Git Plugin
   - Slack Notification Plugin

3. **Create Pipeline Job**
   - New Item → Pipeline
   - Select "Pipeline script from SCM"
   - Choose Git
   - Enter your repository URL
   - Script path: `Jenkinsfile`

4. **Configure Credentials**
   - Manage Jenkins → Manage Credentials
   - Add credentials:
     - `docker-hub-credentials`
     - `aws-credentials`
     - `ec2-host`
     - `ec2-ssh-key`

## Running Tests Locally

Before pushing, run the local test script:

\`\`\`bash
chmod +x scripts/test-locally.sh
./scripts/test-locally.sh
\`\`\`

This will verify:
- All required files exist
- HTML/CSS/JavaScript syntax
- Docker build works
- Container runs correctly

## Secrets and Environment Variables

### Required for All Platforms

1. **Docker Hub Credentials**
   - Login to Docker Hub
   - Create a personal access token: Account Settings → Security
   - Use token as password, not your actual password

2. **AWS Credentials**
   - Login to AWS Console
   - IAM → Users → Your User → Security Credentials
   - Create Access Key
   - Keep secret key safe!

3. **EC2 SSH Key**
   - The private key you used to create the EC2 instance
   - Format: Paste full key content, including `-----BEGIN RSA PRIVATE KEY-----`

4. **Slack Webhook** (Optional)
   - Go to Slack: api.slack.com/apps
   - Create new app
   - Enable Incoming Webhooks
   - Copy webhook URL

## Deployment Options

### Option 1: AWS EC2 Deployment

The pipeline will:
1. Build Docker image
2. Push to Docker Hub
3. SSH to EC2 instance
4. Pull latest image
5. Stop old container
6. Start new container

**Prerequisites:**
- EC2 instance running Ubuntu 22.04
- Docker installed on EC2
- Security group allows SSH (port 22) and HTTP (port 80)

### Option 2: AWS ECS Deployment

The pipeline will:
1. Build Docker image
2. Push to ECR (AWS image registry)
3. Update ECS service
4. Automatic rolling deployment

**Prerequisites:**
- ECS cluster created
- Task definition registered
- IAM role with ECS permissions

## Monitoring Pipeline Execution

### GitHub Actions
- Go to Actions tab in your repository
- View real-time logs for each job
- Check workflows status

### GitLab CI
- Go to CI/CD → Pipelines
- Click on pipeline to see job details
- View logs in real-time

### Jenkins
- Go to Jenkins dashboard
- Click on job
- View console output
- Check build history

## Troubleshooting

### Pipeline not triggering
- Check branch name matches workflow condition
- Verify files are in correct location (`.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`)
- Check commit message - some workflows only trigger on certain keywords

### Docker push fails
- Verify Docker Hub credentials are correct
- Check username and password/token in secrets
- Ensure Docker Hub account has permission to push

### Deployment fails
- Verify EC2 instance is running and accessible
- Check security groups allow SSH and HTTP
- Verify EC2 SSH key is correct
- Test SSH connection locally: `ssh -i key.pem ubuntu@ip-address`

### AWS credentials invalid
- Check AWS IAM user has necessary permissions
- Recreate access key if unsure
- Verify credentials haven't expired

## Best Practices

1. **Never commit secrets** - Always use platform secret management
2. **Test locally first** - Run `scripts/test-locally.sh` before pushing
3. **Use pull requests** - Don't push directly to main
4. **Add descriptive commit messages** - Help track changes
5. **Monitor pipeline status** - Check logs for warnings
6. **Keep images updated** - Regularly rebuild to get latest patches

## Common Commands

\`\`\`bash
# Run local tests
./scripts/test-locally.sh

# Build Docker image
docker build -t my-website:latest .

# Test container
docker run -d -p 8080:80 --name test my-website:latest
curl http://localhost:8080
docker stop test && docker rm test

# Push code to GitHub
git add .
git commit -m "Your message"
git push origin main

# View GitHub Actions workflows
gh workflow list
gh workflow view deploy.yml
\`\`\`

## Next Steps

1. Set up your preferred CI/CD platform (GitHub Actions recommended)
2. Add required secrets/variables
3. Run local tests: `./scripts/test-locally.sh`
4. Push code to trigger the pipeline
5. Monitor deployment in your platform's dashboard
6. Check Slack for notifications (if configured)

## Support

For more information:
- GitHub Actions: https://docs.github.com/en/actions
- GitLab CI: https://docs.gitlab.com/ee/ci/
- Jenkins: https://www.jenkins.io/doc/
