const mongoose = require("mongoose");
const Level = require("../models/level.model");
const Task = require("../models/task.model");
const connectDb = require("../config/database");

connectDb();

const populateLevels = async () => {
    
    try {
        await Level.deleteMany({});
        await Task.deleteMany({});

        console.log("Cleared existing levels and tasks.");

        // Define tasks for each level
        const level1Tasks = await Task.insertMany([
            { name: "HTML Basics", description: "Learn about HTML elements & structure", difficulty: "Easy", points: 10 },
            { name: "CSS Basics", description: "Learn how to style websites with CSS", difficulty: "Easy", points: 10 },
            { name: "JavaScript Basics", description: "Understand variables, loops, and functions", difficulty: "Easy", points: 20 }
        ]);

        const level2Tasks = await Task.insertMany([
            { name: "Version Control with Git", description: "Learn Git basics and commit workflow", difficulty: "Medium", points: 15 },
            { name: "Using GitHub", description: "Understand GitHub repositories and collaboration", difficulty: "Medium", points: 15 },
            { name: "Browser DevTools", description: "Inspect and debug web pages using DevTools", difficulty: "Medium", points: 15 }
        ]);

        const level3Tasks = await Task.insertMany([
            { name: "React Basics", description: "Learn components, props, and state", difficulty: "Hard", points: 25 },
            { name: "API Integration", description: "Fetch and display data from APIs", difficulty: "Hard", points: 30 },
            { name: "Performance Optimization", description: "Learn techniques to optimize frontend performance", difficulty: "Hard", points: 30 }
        ]);

        // Create levels and link tasks
        await Level.insertMany([
            { level: "Level 1", track: "Frontend", isCompleted: false, isUnlocked: true, tasks: level1Tasks.map(task => task._id) },
            { level: "Level 2", track: "Frontend", isCompleted: false, isUnlocked: false, tasks: level2Tasks.map(task => task._id) },
            { level: "Level 3", track: "Frontend", isCompleted: false, isUnlocked: false, tasks: level3Tasks.map(task => task._id) }
        ]);

        console.log("Frontend Development Levels & Tasks populated successfully.");
        process.exit();
    } catch (error) {
        console.error("Error populating levels:", error);
        process.exit(1);
    }
};

populateLevels();
