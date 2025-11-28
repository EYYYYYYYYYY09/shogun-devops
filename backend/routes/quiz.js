import express from "express";
const router = express.Router();

const sampleQuiz = [
  {
    id: 1,
    question: "Which of these is a red flag for phishing?",
    choices: ["An email from your colleague's address", "An urgent request to confirm account details", "A scheduled meeting invite"],
    correct: "An urgent request to confirm account details"
  },
  {
    id: 2,
    question: "What should you do with an unexpected attachment?",
    choices: ["Open it if it looks important", "Scan the file with antivirus and confirm sender", "Forward to colleagues"],
    correct: "Scan the file with antivirus and confirm sender"
  },
  {
    id: 3,
    question: "Which password is stronger?",
    choices: ["P@ssw0rd123", "John1985", "correcthorsebatterystaple!"],
    correct: "correcthorsebatterystaple!"
  }
];

router.get("/", (req, res) => {
  res.json(sampleQuiz);
});

export default router;
