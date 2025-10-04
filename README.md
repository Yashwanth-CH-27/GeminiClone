# Gemini Clone

A sleek and responsive web application that replicates the core functionality of a conversational AI assistant, inspired by Google's Gemini. This project is built with **React**, **Vite**, and **Tailwind CSS**, and uses **Redux Toolkit** for state management and **React Router** for navigation. The AI-powered chat is integrated using the **Groq API**.

## Features

* **User Authentication**: A simple login flow with OTP (One-Time Password) verification.
* **Country Code Selector**: A dropdown menu on the login page dynamically fetches and displays a list of country codes using the `restcountries.com` API.
* **AI Chat Interface**: A clean and modern chatroom UI where users can interact with an AI model.
* **Real-time Responses**: The app uses the Groq SDK to send user queries to an AI model and display responses in real-time.
* **Responsive Design**: The application's layout is optimized for a seamless experience on various screen sizes, from mobile devices to desktops.
* **State Management**: Redux Toolkit is used to efficiently manage global state, such as country code data.
* **Navigation**: React Router is implemented for smooth, client-side routing between the login, OTP, and dashboard pages.
* **Toast Notifications**: Provides user feedback with toast notifications for various actions, like login success or OTP errors.

---

## Technologies Used

* **React**: A JavaScript library for building user interfaces.
* **Vite**: A fast build tool for modern web development.
* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
* **React Router DOM**: Declarative routing for React.
* **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.
* **Groq SDK**: The official SDK to interact with Groq's API for AI functionalities.
* **`react-toastify`**: A library to add toast notifications to the app.

---


## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd gemini-clone
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up the environment variables:**
    * Create a `.env` file in the root directory.
    * Get an API key from [Groq](https://groq.com/).
    * Add your API key to the `.env` file:
    ```
    VITE_GROQ_API_KEY=your_groq_api_key_here
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.
    
---

## Live Demo

You can view a live, deployed version of the application here:

[![Vercel Deploy](https://vercel.com/button)](https://gemini-clone-kohl-seven.vercel.app/)