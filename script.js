// Password Strength Checker
const passwordInput = document.getElementById("password-input")
const toggleBtn = document.getElementById("toggle-btn")
const strengthFill = document.getElementById("strength-fill")
const strengthLabel = document.getElementById("strength-label")
const scoreNumber = document.getElementById("score-number")
const scoreMessage = document.getElementById("score-message")

// Requirements elements
const lengthCheck = document.getElementById("length-check")
const uppercaseCheck = document.getElementById("uppercase-check")
const lowercaseCheck = document.getElementById("lowercase-check")
const numberCheck = document.getElementById("number-check")
const specialCheck = document.getElementById("special-check")

// Toggle password visibility
toggleBtn.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
  passwordInput.setAttribute("type", type)
  toggleBtn.textContent = type === "password" ? "👁️" : "👁️‍🗨️"
})

// Check password requirements
function checkRequirements(password) {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  }

  // Update visual indicators
  updateCheckbox(lengthCheck, requirements.length)
  updateCheckbox(uppercaseCheck, requirements.uppercase)
  updateCheckbox(lowercaseCheck, requirements.lowercase)
  updateCheckbox(numberCheck, requirements.number)
  updateCheckbox(specialCheck, requirements.special)

  return requirements
}

// Update checkbox visual
function updateCheckbox(element, isMet) {
  if (isMet) {
    element.classList.add("met")
    element.textContent = "✓"
  } else {
    element.classList.remove("met")
    element.textContent = "✗"
  }
}

// Calculate password strength
function calculateStrength(password) {
  let score = 0
  const feedback = []

  if (!password) {
    return { score: 0, label: "Very Weak", feedback: "Enter a password to see the score" }
  }

  // Length scoring
  if (password.length >= 8) score += 10
  if (password.length >= 12) score += 10
  if (password.length >= 16) score += 10

  // Character variety scoring
  if (/[a-z]/.test(password)) score += 15
  if (/[A-Z]/.test(password)) score += 15
  if (/[0-9]/.test(password)) score += 15
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score += 25

  // Deductions for common patterns
  if (/(.)\1{2,}/.test(password)) score -= 10 // Repeating characters
  if (/^[a-zA-Z]+$/.test(password)) score -= 15 // Only letters
  if (/^[0-9]+$/.test(password)) score -= 15 // Only numbers

  // Cap score at 100
  score = Math.min(score, 100)
  score = Math.max(score, 0)

  // Determine strength label
  let label, color
  if (score < 20) {
    label = "Very Weak"
    color = "#ff3333"
  } else if (score < 40) {
    label = "Weak"
    color = "#ffb700"
  } else if (score < 60) {
    label = "Fair"
    color = "#ffa500"
  } else if (score < 80) {
    label = "Good"
    color = "#00d4ff"
  } else {
    label = "Very Strong"
    color = "#00ff88"
  }

  // Generate feedback
  if (password.length < 8) feedback.push("Use at least 8 characters")
  if (!/[A-Z]/.test(password)) feedback.push("Add uppercase letters")
  if (!/[a-z]/.test(password)) feedback.push("Add lowercase letters")
  if (!/[0-9]/.test(password)) feedback.push("Add numbers")
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) feedback.push("Add special characters")

  const feedbackText = feedback.length > 0 ? "Tip: " + feedback.join(", ") : "Excellent password strength!"

  return { score, label, color, feedbackText }
}

// Update UI with password strength
function updatePasswordStrength(password) {
  const requirements = checkRequirements(password)
  const strength = calculateStrength(password)

  // Update strength bar
  strengthFill.style.width = strength.score + "%"

  // Update strength label
  strengthLabel.textContent = strength.label
  strengthLabel.style.color = strength.color || "#ff3333"

  // Update score
  scoreNumber.textContent = strength.score + "%"
  scoreNumber.style.color = strength.color || "#ff3333"

  // Update feedback message
  scoreMessage.textContent = strength.feedbackText
}

// Event listener for password input
passwordInput.addEventListener("input", (e) => {
  updatePasswordStrength(e.target.value)
})

// Contact form handler
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault()
  alert("Thank you for your message! We will get back to you soon.")
  e.target.reset()
})

// Initialize on page load
window.addEventListener("load", () => {
  updatePasswordStrength("")
})
