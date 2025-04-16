# README.md

# REST API Testing with Cucumber

This project is designed for testing REST APIs using Cucumber and writing test cases in Gherkin syntax. It provides a structured approach to define features, scenarios, and step definitions for effective API testing.

## Project Structure

```
rest-api-testing
├── src
│   ├── features
│   │   ├── api.feature
│   │   └── step_definitions
│   │       └── apiSteps.ts
│   ├── support
│   │   ├── types.ts
│   │   └── world.ts
│   └── utils
│       └── apiHelper.ts
├── cucumber.js
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd rest-api-testing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the tests:**
   ```bash
   npx cucumber-js
   ```

## Usage Guidelines

- Define your API scenarios in the `src/features/api.feature` file using Gherkin syntax.
- Implement the step definitions in `src/features/step_definitions/apiSteps.ts`.
- Use the helper functions in `src/utils/apiHelper.ts` to interact with the REST API.
- Customize the `cucumber.js` configuration as needed for your testing environment.

## Contributing

Feel free to submit issues or pull requests to improve the project.