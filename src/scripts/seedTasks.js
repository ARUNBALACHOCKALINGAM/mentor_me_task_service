const mongoose = require('mongoose');
const connectDb = require('../config/database');
const Task = require('../models/task.model');

connectDb();

const userId = '67a5e8d498e7f8cba994b221'; // Replace with an actual user ID from your database

const tasks = [
  {
    name: "HTML Basics",
    description: "Learn the basics of HTML including elements, attributes, and structure.",
    status: "todo",
    difficulty: "Easy",
    resources: [
      { name: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "HTML Tutorial", url: "https://www.w3schools.com/html/" }
    ],
    userId: userId,
    subTasks: [],
    level: 1,
    track: "frontend"
  },
  {
    name: "CSS Fundamentals",
    description: "Understand how to style web pages using CSS, including selectors, properties, and layout techniques.",
    status: "todo",
    difficulty: "Easy",
    resources: [
      { name: "MDN CSS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "CSS Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" }
    ],
    userId: userId,
    subTasks: [],
    level: 1,
    track: "frontend"
  },
  {
    name: "JavaScript Basics",
    description: "Get familiar with JavaScript syntax, variables, functions, and basic DOM manipulation.",
    status: "todo",
    difficulty: "Medium",
    resources: [
      { name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "JavaScript Course", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" }
    ],
    userId: userId,
    subTasks: [],
    level: 1,
    track: "frontend"
  },
  {
    name: "Responsive Web Design",
    description: "Learn about media queries, flexible grids, and how to create mobile-friendly designs.",
    status: "todo",
    difficulty: "Medium",
    resources: [
      { name: "FreeCodeCamp Course", url: "https://www.freecodecamp.org/learn/responsive-web-design/" },
      { name: "MDN Responsive Design", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" }
    ],
    userId: userId,
    subTasks: [],
    level: 1,
    track: "frontend"
  },
  {
    name: "Version Control with Git",
    description: "Understand the basics of Git, GitHub, and version control best practices.",
    status: "todo",
    difficulty: "Easy",
    resources: [
      { name: "Git Documentation", url: "https://git-scm.com/doc" },
      { name: "GitHub Guides", url: "https://docs.github.com/en/get-started" }
    ],
    userId: userId,
    subTasks: [],
    level: 1,
    track: "frontend"
  }
];

const seedTasks = async () => {
  try {
    await Task.insertMany(tasks);
    console.log("Frontend tasks added successfully.");
    process.exit();
  } catch (error) {
    console.error("Error adding tasks:", error);
    process.exit(1);
  }
};

seedTasks();
