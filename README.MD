# Test Strategy

## Tool Selection
Selected Playwright (vs Cypress and Selenium) because:
- Similar ease of use and setup to Cypress (setup, no drivers, built in waits, built in reporting) 
- Less limitations and better performance (faster execution, no in-browser memory errors at scale)
- Good support (Microsoft backed, frequent updates and fastest growing community)

## Interactivity and Functionality Testing
Analysed Pricing page and determined the following Scenarios around key User flows:
- User wants to Pay Annually, moves sliders to get an estimate, clicks Get Started. 
- User reviews full feature breakdown and tooltips, clicks Get in touch (not completed due to time constraints)
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
- Tooltips on hover (not completed due to time constraints)

Added visual test for screenshot comparison.

## Business Logic and Accuracy
Analysed pricing logic and determined scenarios:
- 10% discount for Annual 
- Plus Plan User Prices
- Plus Plan File Prices

(other scenarios not implemented due to time constraints)
- Plus Plan User + File Prices
- Plus Plan User + File Prices + Discount
- Pro Plan User Prices
- Pro Plan File Prices
- Pro Plan User + File Prices
- Pro Plan User + File Prices + Discount

## Challenges
- Locating specific elements is messy because all have generic class names (e.g. plan price values, sliders, get started button). Specific element test-ids could help with this.
- Implemented a subset of the pricing calculation tests using the formulas to fulfil the criteria. However in practise I would not recommend testing this type of calculation logic at the E2E layer because it is very messy in terms of feeding the input values. As you can see in the test, at this layer it is simulating a user manually clicking or dragging the slider which is good to verify but does not need to cover all the calulcation permutations. Would be better to verify all the calculating at the unit test layer with some type of mocks that can more easily set the values the slider represents (e.g. react-testing-library can just pump in a value with fireEvent.change(sliderElem, { target: { value: 100} })).