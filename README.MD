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


Test plan:
For end to end UI tests they should focus on:
- Key User Flows
- Visuals


Assumption: header footer excluded

User scenarios (functional):
- Select payment frequency > get price estimate > Get started
- Reviews full feature breakdown > Get in touch email

Visual testing
- Screenshot

Interactive elements
- Radio button
- Plan Cards:
    - User Slider
    - Files Slider
    - Get started buttons
- Catalogs link
- Artist plan link
- Get in touch email link
- tooltips on hover

Pricing calculation:
- In my opinion the end-to-end layer isn't the best place to test calculations, messy to grab the values. Would be much better tested at unit/integration layer with mocks.

Challenges: 
- test-ids would help a lot with locating elements especially those with generic names