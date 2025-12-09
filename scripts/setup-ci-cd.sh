#!/bin/bash

# CI/CD Setup Script
# This script helps you set up your CI/CD pipeline

set -e

echo "================================"
echo "CI/CD Pipeline Setup Script"
echo "================================"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}[*]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check prerequisites
print_step "Checking prerequisites..."

if ! command -v git &> /dev/null; then
    print_warning "Git is not installed. Please install Git first."
    exit 1
fi
print_success "Git is installed"

if ! command -v docker &> /dev/null; then
    print_warning "Docker is not installed. Please install Docker first."
    exit 1
fi
print_success "Docker is installed"

echo ""
print_step "Choose your CI/CD platform:"
echo "1. GitHub Actions (Recommended)"
echo "2. GitLab CI"
echo "3. Jenkins"
read -p "Enter your choice (1-3): " choice

echo ""

case $choice in
    1)
        print_step "Setting up GitHub Actions..."
        
        # Create .github/workflows directory
        mkdir -p .github/workflows
        print_success ".github/workflows directory created"
        
        echo ""
        print_step "You need to configure the following secrets in your GitHub repository:"
        echo "  1. DOCKER_USERNAME - Your Docker Hub username"
        echo "  2. DOCKER_PASSWORD - Your Docker Hub password/token"
        echo "  3. AWS_ACCESS_KEY_ID - Your AWS access key"
        echo "  4. AWS_SECRET_ACCESS_KEY - Your AWS secret key"
        echo "  5. EC2_HOST - Your EC2 instance public IP"
        echo "  6. EC2_SSH_KEY - Your EC2 SSH private key"
        echo "  7. SLACK_WEBHOOK - Your Slack webhook URL (optional)"
        
        echo ""
        print_step "Steps to configure secrets:"
        echo "  1. Go to your GitHub repository"
        echo "  2. Click Settings → Secrets and variables → Actions"
        echo "  3. Click 'New repository secret'"
        echo "  4. Add each secret from the list above"
        
        echo ""
        print_success "GitHub Actions setup complete!"
        ;;
        
    2)
        print_step "Setting up GitLab CI..."
        
        echo ""
        print_step "You need to configure the following variables in GitLab:"
        echo "  1. DOCKER_USERNAME - Your Docker Hub username"
        echo "  2. DOCKER_PASSWORD - Your Docker Hub password/token"
        echo "  3. AWS_ACCESS_KEY_ID - Your AWS access key"
        echo "  4. AWS_SECRET_ACCESS_KEY - Your AWS secret key"
        echo "  5. EC2_HOST - Your EC2 instance public IP"
        echo "  6. EC2_SSH_KEY - Your EC2 SSH private key"
        echo "  7. SLACK_WEBHOOK - Your Slack webhook URL (optional)"
        
        echo ""
        print_step "Steps to configure variables:"
        echo "  1. Go to your GitLab project"
        echo "  2. Click Settings → CI/CD → Variables"
        echo "  3. Click 'Add variable'"
        echo "  4. Add each variable from the list above"
        echo "  5. Mark sensitive variables as 'Protect variable'"
        
        echo ""
        print_success "GitLab CI setup complete!"
        ;;
        
    3)
        print_step "Setting up Jenkins..."
        
        echo ""
        print_step "Jenkins pipeline uses Jenkinsfile"
        echo "Make sure your Jenkins server has:"
        echo "  1. Docker plugin installed"
        echo "  2. AWS plugin installed"
        echo "  3. Git plugin installed"
        echo "  4. Slack plugin installed (optional)"
        
        echo ""
        print_step "Configure these credentials in Jenkins:"
        echo "  1. docker-hub-credentials (Username with password)"
        echo "  2. aws-credentials (Username with password)"
        echo "  3. ec2-host (Secret text)"
        echo "  4. ec2-ssh-key (Secret file)"
        
        echo ""
        print_step "Steps to configure credentials:"
        echo "  1. Go to Jenkins Dashboard"
        echo "  2. Click 'Manage Jenkins' → 'Manage Credentials'"
        echo "  3. Click 'Global' → 'Add Credentials'"
        echo "  4. Add credentials as specified above"
        
        echo ""
        print_success "Jenkins setup complete!"
        ;;
        
    *)
        print_warning "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
print_step "Next steps:"
echo "  1. Commit and push your code to Git"
echo "  2. Configure the required secrets/variables"
echo "  3. Your CI/CD pipeline will automatically trigger"
echo "  4. Monitor the pipeline execution in your platform"
echo ""

print_success "Setup script completed!"
