# React Physical Education

## Overview

React Physical Education is an interactive learning platform built with React for delivering physical education content, interactive quizzes, and instructional videos. This educational application is organized into chapters, offering a structured approach to physical education through various components including videos, quizzes, and reading materials.

## Purpose

This application serves as an interactive learning platform for physical education, featuring:

- Educational content organized into chapters  
- Interactive quizzes with assessment capabilities  
- Video-based learning content  
- User-friendly navigation between different educational elements

## Technical Foundation

The application is built with a modern JavaScript stack:

| Technology     | Version | Purpose                    |
|----------------|---------|----------------------------|
| React          | 19.0.0  | Core UI library            |
| React Router   | 7.2.0   | Application routing        |
| Bootstrap      | 5.3.3   | UI framework and styling   |
| Framer Motion  | 12.4.7  | Animations                 |
| Vite           | 6.2.0   | Build tool and development server |

## Installation

```bash
# Clone the repository
git clone https://github.com/xmkabel/react-physical-education.git

# Navigate to the project directory
cd react-physical-education

# Install dependencies
npm install

# Start the development server
npm run dev


```
## Scripts

The following npm scripts are available (see `package.json` lines 6–11).

## Application Structure

The application follows a structured organization with the following main components:

* **Intro**: Landing page with project information
* **ExamCards**: Interface for accessing different quizzes
* **Video Player**: Component for viewing educational videos
* **Chapter Routes**: Organized educational content by chapters

## Core Components

### App Component

The App component serves as the entry point for the application, configuring React Router and defining the main routes.

### Home Component

The Home component provides the main dashboard interface with:

* Navigation bar
* Carousel with educational highlights
* Video card section displaying available educational videos (`index.jsx:16–86`)

### Quiz Component

The Quiz component delivers interactive assessments with:

* Reading materials and questions
* Answer selection and validation
* Score calculation and results display
* Visual feedback for user performance

### Intro Component

The Intro component serves as the landing page with:

* Project information
* Supervisor details
* Navigation to the main application (`index.jsx:10–82`)

## Educational Content

The application organizes educational content into:

1. **Quiz Questions**: Structured assessments with multiple-choice options
2. **Reading Materials**: Text-based educational content
3. **Video Content**: Educational videos accessible through the Video component
4. **Chapter Content**: Structured educational materials organized by chapter

## Styling

The application employs a consistent styling approach using CSS variables defined in the main stylesheet (`main.css:5–15`).

## Screenshots

Below are some screenshots showcasing key parts of the application:

### Intro
![Intro](https://github.com/user-attachments/assets/e15b2b05-b659-406b-a870-3141d5222e42)

### Video Learning Page
![Video Page](https://github.com/user-attachments/assets/aeae96b0-d7a6-4341-b660-c8f4491b845c)

### Quiz Interface
![Quiz Interface](https://github.com/user-attachments/assets/a4a95901-4a64-4f5e-b2b0-c79c53f07245)

### Chapter Navigation
![Chapters](https://github.com/user-attachments/assets/04bdde66-dc1a-4f4d-8c4d-bb1cd713f690)
![Screenshot (331)](https://github.com/user-attachments/assets/0d8b5482-5e00-4f99-8eb0-10b0c1e4b91f)
![Screenshot (329)](https://github.com/user-attachments/assets/c79dbd3f-55a6-4710-a89d-c777fdae560b)

## License

This project is licensed under the Apache License 2.0. See the LICENSE file for details (`LICENSE:91–104`).

## Contributors

* [Mohamed Kabel](https://www.linkedin.com/in/mohamedkabel)
* [Karim Mahmoud](https://www.linkedin.com/in/karim-mahmoud-hassan)
* [Youssef Hany](https://www.linkedin.com/in/youssef-hany-65a990283)

## About

This application was developed as part of a doctoral program in teaching methods at Helwan University, focusing on "The effectiveness of an interactive electronic learning environment on cognitive achievement and developing physical education teaching skills."

# Notes

This README was created based on the Overview wiki page and the provided code snippets. The application is an educational platform for physical education with interactive quizzes, videos, and structured learning content. The main technologies used are React, React Router, Bootstrap, and Framer Motion, with Vite as the build tool.

# Demo Live ([view here](https://miss-marwa-pe.web.app))
