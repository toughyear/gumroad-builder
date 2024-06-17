# Getting Started with the Gumroad Website Builder

This is a standard rails app that uses React + TailwindCSS for Frontend.

![Screenshot of the website builder](https://raw.githubusercontent.com/toughyear/blog-uploads/main/uploads/gumroad/landing.png)

## Prerequisites

- Ruby 3.2.3
- Rails 7.1.3
- Node.js and Yarn
- SQLite3 (for development)
- PostgreSQL (for production)

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:gumroad/website-builder.git
   cd website-builder
   ```

2. **Set up Ruby environment:**
   Ensure you have Ruby 3.2.3 installed. You can use [rbenv](https://github.com/rbenv/rbenv) or [rvm](https://rvm.io) to manage Ruby versions.

3. **Install dependencies:**
   Run the setup script to install Ruby and JavaScript dependencies:

   ```bash
   bin/setup
   ```

4. **Configure the database:**
   This application uses SQLite for development and PostgreSQL for production. Ensure your database configurations in `config/database.yml` are correct.

For development, just install SQLite3 and run `bin/rails db:setup`. For production, install PostgreSQL and set up the appropriate environment variables.

5. **Start the application:**
   Use the provided `Procfile.dev` for development servers:
   ```bash
   bin/dev
   ```

- **Access the application:**
  Open your browser and navigate to `http://localhost:3000`.

## Notes

- Hot reloading is not set up yet. Refresh the page to see changes.
- For production, right now we use neon.tech to host the database.

For more detailed information, refer to the specific configuration files and scripts in the repository.

## Contributing

Feel free to fork the repository and make your own changes. If you encounter any issues or have suggestions for improvement, please open an issue in the repository.
