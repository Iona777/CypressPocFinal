Feature: Automation Practice
Practice various Automation features




Background: Access landing page
Given I am on the Automation Practice page



Scenario: Testing tables
When I test tables



Scenario: Select Radio Buttons
And I select various radio buttons

Scenario: Select a Checkbox
When I select checkbox 'Option1'

Scenario Outline: Select Multiple Checkboxes
When I select checkbox "<firstCheckBox>"
And I select checkbox "<secondCheckbox>"
And only "<unselectedCheckbox>" remains unselected
#Alternate, and simpler, way to check
And a simpler approach for only "<unselectedCheckbox>" remains unselected
Examples:
|firstCheckBox  |secondCheckbox |unselectedCheckbox |
|Option2        |Option3        |Option1            |
|option1        |option2        |option3            |

Scenario Outline: Select various values from static dropdown
When I select dropdown option "<Option>"
Examples:
|Option|
|option3|
|option2|
|option1|
  
Scenario Outline: Enter various countries in the dynamic dropdown
When I enter "<Country>" in the country dynamic dropdown
Examples:
    | Country               |    
    | India                 |
    | Canada                |
    | United Kingdom (UK)   |

Scenario: Test the invisible elements
When I select hide
Then the the show hide example is invisible
When I select show
Then the the show hide example is visible

Scenario: Trigger alert and get its text
When I click on alert button and check its text
And I click on the confirm button and check its text

#Scenario: Testing tabs and different domains
#When I test tabs


