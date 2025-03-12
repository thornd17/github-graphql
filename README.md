# GitHub Repository Explorer

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher) (used v22.13.0)
- pnpm (package manager)

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up GitHub GraphQL Schema**:
   - Run the following command to automatically load the schema:
     ```bash
     pnpm load-github-gql-schema
     ```
   - Alternatively, you can manually download the schema from [GitHub's Public Schema](https://docs.github.com/en/graphql/overview/public-schema) and place it in:
     ```
     src/shared/api/graphql/github-schema.docs.graphql
     ```

3. **Configure Environment Variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - **GitHub Personal Access Token (Optional but Recommended)**:
     - While optional, having a token enables additional features:
       - Access to private repositories (if granted)
       - Higher API rate limits (5000 requests/hour vs 60 or 0 in some cases for unauthenticated)
       - Ability to fetch current user's repositories
     - To create a token:
       - Follow the [GitHub Token Creation Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)
       - Add your token to the `.env` file
     - Note: The application will work without a token, but with limited functionality and stricter rate limits

### Running the Application
Start the development server:
```bash
pnpm dev
```
