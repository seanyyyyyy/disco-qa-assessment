# Test Strategy

## Tool Selection
Selected Playwright (vs Cypress and Selenium) because:
- similar ease of use and setup to Cypress (setup, no drivers, built in waits, built in reporting) 
- less limitations and better performance (faster execution, no in-browser memory errors at scale)
- good support (Microsoft backed, frequent updates and fastest growing community)

## Interactivity and Functionality Testing: 
Analysed pricing page and determined the following Scenarios from the key User Flows:
- User wants to Pay Annually, moves sliders to get an estimate, clicks Get Started. 
* User reviews full feature breakdown and tooltips, clicks Get in touch
- User wants to view Catalogs.
- User wants to view the Artist plan.

Checked to ensure the scenarios covered all the interactive elements on the page:
- Toggle button
- Plan Cards:
    - User Slider
    - Files Slider
    - Get started buttons
- Catalogs link
- Artist plan link
- Get in touch email link
* Tooltips on hover

Added visual test for screenshot comparison.

## Business Logic and Accuracy: 
Analysed pricing logic and determined scenarios:
- 10% discount for Annual 
- Plus Plan User Prices
- Plus Plan File Prices
* Plus Plan User + File Prices
* Plus Plan User + File Prices + Discount
* Pro Plan User Prices
* Pro Plan File Prices
* Pro Plan User + File Prices
* Pro Plan User + File Prices + Discount

I Implemented a subset of these tests using the formulas to fulfil the challenge. 
However in practise I would not recommend testing this type of calculation logic at the E2E layer 
because it is very messy in terms of feeding the input values (as you can see in the test).
Would be better verified at unit test layer with some type of mocks that can more easily establish the values the slider represents.

## Challenges: 
- Locating specific elements that have generic names (e.g. plan price values, sliders, get started button) is messy. Element test-ids would help with this.
- Pricing page does not seem to interact with any outside APIs so in my opinion automated testing would be more effective and efficient on the integration layer with mocks.