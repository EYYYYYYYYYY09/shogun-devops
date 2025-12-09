#!/bin/bash

# Local Testing Script
# Run this before pushing to Git

echo "========================================"
echo "Local Testing Script"
echo "========================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

test_passed=0
test_failed=0

# Test 1: Check required files
echo -e "${BLUE}[TEST 1]${NC} Checking required files..."
for file in index.html style.css script.js Dockerfile; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file found"
        ((test_passed++))
    else
        echo -e "${RED}✗${NC} $file not found"
        ((test_failed++))
    fi
done
echo ""

# Test 2: Validate HTML
echo -e "${BLUE}[TEST 2]${NC} Validating HTML..."
if grep -q "<!DOCTYPE html>" index.html && grep -q "<html" index.html; then
    echo -e "${GREEN}✓${NC} HTML structure is valid"
    ((test_passed++))
else
    echo -e "${RED}✗${NC} HTML structure is invalid"
    ((test_failed++))
fi
echo ""

# Test 3: Validate CSS
echo -e "${BLUE}[TEST 3]${NC} Validating CSS..."
if grep -q "{" style.css && grep -q "}" style.css; then
    echo -e "${GREEN}✓${NC} CSS syntax is valid"
    ((test_passed++))
else
    echo -e "${RED}✗${NC} CSS syntax is invalid"
    ((test_failed++))
fi
echo ""

# Test 4: Validate JavaScript
echo -e "${BLUE}[TEST 4]${NC} Validating JavaScript..."
if grep -q "function\|const\|let\|var" script.js; then
    echo -e "${GREEN}✓${NC} JavaScript is present"
    ((test_passed++))
else
    echo -e "${RED}✗${NC} JavaScript is invalid"
    ((test_failed++))
fi
echo ""

# Test 5: Check Dockerfile
echo -e "${BLUE}[TEST 5]${NC} Validating Dockerfile..."
if grep -q "FROM" Dockerfile && grep -q "EXPOSE" Dockerfile; then
    echo -e "${GREEN}✓${NC} Dockerfile is valid"
    ((test_passed++))
else
    echo -e "${RED}✗${NC} Dockerfile is invalid"
    ((test_failed++))
fi
echo ""

# Test 6: Build Docker image
echo -e "${BLUE}[TEST 6]${NC} Building Docker image..."
if docker build -t my-website:test . > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Docker image built successfully"
    ((test_passed++))
else
    echo -e "${RED}✗${NC} Docker image build failed"
    ((test_failed++))
fi
echo ""

# Test 7: Run Docker container
echo -e "${BLUE}[TEST 7]${NC} Testing Docker container..."
if docker run -d -p 8080:80 --name test-website my-website:test > /dev/null 2>&1; then
    sleep 3
    if curl -s http://localhost:8080 | grep -q "Cybersecurity\|html"; then
        echo -e "${GREEN}✓${NC} Container is running and responsive"
        ((test_passed++))
    else
        echo -e "${RED}✗${NC} Container is not responding correctly"
        ((test_failed++))
    fi
    docker stop test-website > /dev/null 2>&1
    docker rm test-website > /dev/null 2>&1
else
    echo -e "${RED}✗${NC} Failed to run container"
    ((test_failed++))
fi
echo ""

# Summary
echo "========================================"
echo "Test Summary"
echo "========================================"
echo -e "Tests Passed: ${GREEN}$test_passed${NC}"
echo -e "Tests Failed: ${RED}$test_failed${NC}"
echo ""

if [ $test_failed -eq 0 ]; then
    echo -e "${GREEN}All tests passed! Ready to push to Git.${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please fix the issues before pushing.${NC}"
    exit 1
fi
