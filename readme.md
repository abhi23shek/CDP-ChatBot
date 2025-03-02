# CDP ChatBot

CDP ChatBot is a web-based chatbot application designed to provide users with summarized search results from the web. The application leverages Google Custom Search API to fetch search results and OpenAI's GPT model to summarize the information. The project is built with a React frontend and an Express.js backend.

## Project Structure

```
.gitattributes
backend/
	.env
	.gitignore
	package.json
	server.js
frontend/
	.gitignore
	eslint.config.js
	icon.svg
	index.html
	package.json
	public/
		vite.svg
	README.md
	src/
		App.css
		App.jsx
		assets/
			react.svg
		index.css
		main.jsx
	vite.config.js
```

### Frontend

The frontend is built using React and Vite. It includes the following key files:

- **[index.html](frontend/index.html)**: The main HTML file that includes the root div and script to load the React app.
- **[src/main.jsx](frontend/src/main.jsx)**: The entry point for the React application.
- **[src/App.jsx](frontend/src/App.jsx)**: The main component of the application that handles user input, API calls, and rendering the chat interface.
- **[src/App.css](frontend/src/App.css)**: The CSS file for styling the chat interface.
- **[src/index.css](frontend/src/index.css)**: The CSS file for global styles.
- **[vite.config.js](frontend/vite.config.js)**: The Vite configuration file.
- **[eslint.config.js](frontend/eslint.config.js)**: The ESLint configuration file.

### Backend

The backend is built using Express.js and includes the following key files:

- **[server.js](backend/server.js)**: The main server file that handles API requests, fetches search results from Google Custom Search API, and summarizes them using OpenAI's GPT model.
- **[package.json](backend/package.json)**: The package file that lists the dependencies and scripts for the backend.
- **[.env](backend/.env)**: The environment file that stores API keys and other sensitive information (not included in the repository).

## Installation

### Prerequisites

- Node.js
- npm

### Setup

1. Clone the repository:

```sh
git clone https://github.com/yourusername/CDP-ChatBot.git
cd CDP-ChatBot
```

2. Install dependencies for the frontend:

```sh
cd frontend
npm install
```

3. Install dependencies for the backend:

```sh
cd ../backend
npm install
```

4. Create a `.env` file in the backend directory and add your API keys:

```
GOOGLE_API_KEY=your_google_api_key
SEARCH_ENGINE_ID=your_search_engine_id
OPENAI_API_KEY=your_openai_api_key
```

## Usage

### Running the Frontend

To start the frontend development server, run:

```sh
cd frontend
npm run dev
```

### Running the Backend

To start the backend server, run:

```sh
cd backend
node server.js
```

The backend server will run on `http://localhost:3001`.

## Features

- **User Input**: Users can type queries into the input field and press Enter or click the Send button to submit their queries.
- **API Integration**: The application fetches search results from Google Custom Search API and summarizes them using OpenAI's GPT model.
- **Chat Interface**: The chat interface displays the user's queries and the AI's responses, including sources for the information.
- **Auto-Scroll**: The chat interface automatically scrolls to the latest message.

## ESLint Configuration

The project uses ESLint for code linting with the following configuration:

- **eslint.config.js**: Configures ESLint for the frontend, including plugins for React hooks and React refresh.
