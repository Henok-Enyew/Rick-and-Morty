# Rick and Morty TV Show Website

A website showcasing characters, episodes, and locations from the popular TV show **Rick and Morty**. The website is built using **Vue.js** (powered by **Vite**), styled with **Tailwind CSS**, and fetches data from the [Rick and Morty API](https://rickandmortyapi.com/) using **GraphQL**.

## Live Demo

You can view the live version of the site [here](https://rick-and-morty-tv-show.netlify.app/).

## Figma Design

The design for the website is available on [Figma](https://www.figma.com/design/ZSVmfKMGibjB1y3a2mzXWg/Home-Page-of-the-Rick-and-Morty-Website?node-id=0-1&t=cFiTbdoqk9C7olcl-1).

## Features

- **Episodes**: Browse through the entire list of Rick and Morty episodes.
- **Characters**: View all the characters from the show with detailed information.
- **Locations**: Explore various locations featured in the series.
- **Search Functionality**: Quickly search for specific episodes, characters, or locations.
- **Responsive Design**: Fully optimized for all devices.
  
## Tech Stack

- **Vue.js**: Frontend framework.
- **Vite**: Bundler for fast development and optimized builds.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **GraphQL**: For querying data from the Rick and Morty API.
- **Netlify**: Hosting for the live demo.

## Installation and Setup

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/rick-and-morty-website.git
cd rick-and-morty-website
```
### Install Dependencies
```bash
npm install
```

### Run the Project Locally
```bash
npm run dev
```

### API

This project uses the [Rick and Morty API](https://rickandmortyapi.com/) with **GraphQL** to fetch the following data:

- **Characters**: `/graphql/character`
- **Episodes**: `/graphql/episode`
- **Locations**: `/graphql/location`

You can check the full API documentation [here](https://rickandmortyapi.com/documentation).
