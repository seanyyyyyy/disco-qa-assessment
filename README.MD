# DISCO QA ASSESSMENT

## 1. Tool Selection
Choose a JavaScript-based testing framework (e.g. Playwright, Cypress, Selenium) for this challenge.

## 2. Interactivity and Functionality Testing: 
In addition to testing the functionality of the billing cycle toggle and the sliders in the Plus and
Pro tiers, it's also crucial to test the standard display elements to ensure
their proper rendering and interactivity.

## 3. Business Logic and Accuracy: 
Employ the provided documentation to validate that the displayed pricing matches our specified logic and
calculations accurately.

## 4. Documentation and Approach: 
Produce a document detailing your testing strategy, including any obstacles you faced and how you
addressed them. Highlight the logic behind your test scenarios and
decision-making process.

- - - 

## Test plan: 
Assumption: header footer excluded

End to end UI tests:
Analysed pricing page and determined the following Scenarios from the key User Flows:
- User wants to Pay Annually, moves sliders to get an estimate, clicks Get Started. 
- User reviews full feature breakdown and tooltips, clicks Get in touch
- User wants to view Catalogs.
- User wants to view the Artist plan.

Price check tests:
- Check calculation algorithm is correct for range slider values.

Need to ensure the scenarios cover the following interactive elements on the page:
- Toggle button
- Plan Cards:
    - User Slider
    - Files Slider
    - Get started buttons
- Catalogs link
- Artist plan link
- Get in touch email link
- tooltips on hover

Visual testing
- Screenshot

Challenges: 
- Locating specific elements that have generic names (e.g. plan price values, sliders, get started button) is difficult. Element test-ids would help with this.
- Pricing page does not seem to interact with any outside APIs so in my opinion automated testing would be more effective and efficient on the integration layer with mocks.