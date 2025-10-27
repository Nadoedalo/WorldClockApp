# The goal of this project is to create a world clock with following capabilities:
1) Add clocks for any country in the world
2) Display clocks in a clean digital format along with the country's flag
   - Clock format should be 24h in the following format: HH:MM
   - use flags from `/public/flags` with the country code as the filename in PNG format
   - use countries-and-timezones package to get the list of countries and their timezones
     - use getAllCountries to get a list of all countries
     - use getTimezoneForCountry to get the timezone for a country
3) Update in real-time (auto-ticking)
4) Use country search with autocomplete to select a timezone based on the country name
# Additional goals
- Support dark / light themes
- Use a map or country picker as a way to select countries
- Allow users to label clocks

# Infrastructure and Architecture
- Use existing package.json as a reference point
- Use Next.js
- Use TypeScript 
- Use Tailwind as a CSS solution with CSS modules if necessary
- Use Zustand for state management
  - Add LocalStorage support for persistent clocks between user sessions
- Use Material UI for styling
  - Use MUI Icons for icons
- Setup a solid folder structure that supports
  - Feature-based modularization
  - Scoped styling with global theming
  - Reusable component system (e.g. via @/components)
    - Component should be the following
      - CountryAutocomplete with autocomplete and search capabilities
        - After selecting a country show available timezones to select
          - If country just has 1 timezone available add it to the list immediately
      - ClockList containing the ClockCard with a flag, name of the country, current time and timezone displayed with an optional label available
        - Add an ability to edit the selected country with following:
          - Delete the selected country
          - Add a label to the selected country
          - Select another timezone if available
      - ThemeToggle component implementing light and dark theme switcher
- Setup
  - ESLint
  - Testing (unit test 1-2 core components e.g clock renderer)
    - Test the rendering of the selected countries and timezones
    - Test the clock ticking
  - Storybook
    - Add the flags, country select and clock renderer components to the storybook
  - Responsive design principles
# CI - Continuous Integration Setup
Setup CI using GitHub Actions to ensure code quality and stability by automating
1) Install dependencies
2) Run linting (ESLint)
3) Run type checks (TypeScript)
4) Run tests (Jest, React Testing Library)
5) Build the project (Next.js)
For the above create a simple `.github/workflows/ci.yml` file 