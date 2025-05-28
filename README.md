# Checkout the [demo link](https://drive.google.com/file/d/1hmuDy4Ow9bJBYQ-02ToSxHbSDyKFwUWH/view?usp=sharing)

# Next.js + MongoDB App

This is a web application built with **Next.js** and uses **MongoDB** as the backend. The app is containerized using Docker and supports running locally using Docker Compose or manual setup steps.

## 🚀 Getting Started Locally

### Option 1: Using Docker Compose (Recommended)

1. Run the following command:

   ```bash
   docker compose up
   ```

2. This will:

   - Pull the latest images.
   - Start both the Next.js app and MongoDB.
   - Seed static data from a JSON file into the database.

3. Once the setup is complete, the app will be available at:

   ```
   http://localhost:3000
   ```

---

### Option 2: Manually Using Docker (If Docker Compose Fails)

1. Pull the Next.js app image from Docker Hub:

   ```bash
   docker pull sandeeepmodi/instinctive-studio-app
   ```

2. Pull the latest MongoDB image:

   ```bash
   docker pull mongo:latest
   ```

3. Start MongoDB on port 27017 and expose it to the host machine:

   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

4. Start the Next.js app container, mapping any port (e.g., 3000):

   ```bash
   docker run -p 3000:3000 sandeeepmodi/instinctive-studio-app
   ```

5. The app should now be available at:

   ```
   http://localhost:3000
   ```

---

### Option 3: Run Locally with Node (If All Docker Options Fail)

1. Pull and run MongoDB on your local machine:

   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. Clone the repository (if you haven't already) and install dependencies:

   ```bash
   git clone https://github.com/sandeeepgithub/instictive-studio.git
   cd instictive-studio
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The app will be available at:

   ```
   http://localhost:3000
   ```

---

## 📝 Notes

- Ensure MongoDB is running and accessible on `localhost:27017` for local development.
- The app automatically seeds static data on initial startup.
- Add `MONGODB_URI=mongodb://localhost:27017/b2b-marketplace` if running the app using `npm run dev`
