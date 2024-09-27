# GIPHY Search App

## Setup Instructions

Follow the steps below to get the app up and running on your local machine:

### 1. **Clone the repository**:
   ```
   git clone https://github.com/iamsujanstha/giphy-search.git
```
### 2. **Navigate to the Project Directory**:
```
cd giphy-search
```

### 3. **Install Dependencies**:
```
yarn or npm i
```

### 4. **Create `.env` File**:

### 5. **Start the Development Server**:
 ```
 yarn dev  or npm run dev
 ```

###  **Steps for Collaborators**:
- You should copy the `.env.example` file to `.env`.
- Then, you must obtain your own Giphy API key (or any other required keys) and fill it in the `.env` file.

###  **Why Use `.env.example`**:
- **Security**: Sensitive keys are not committed to the repository.
- **Clarity**: Developers cloning the repo will know exactly which environment variables are required to run the project without exposing any secrets.
- **Reusability**: The `.env.example` file serves as a template, making it easier for others to configure their environment without any confusion.


