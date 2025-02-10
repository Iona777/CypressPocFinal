Feature: Automation Practice

Practice various Automation features

Scenario: Select Radio Buttons
Given I am on the Automation Practice page
And I select various radio buttons

Scenario: Select a Checkbox
Given I am on the Automation Practice page
When I select checkbox 'Option1'

Scenario Outline: Select Multiple Checkboxes
Given I am on the Automation Practice page
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
Given I am on the Automation Practice page
When I select dropdown option "<Option>"
Examples:
|Option|
|option3|
|option2|
|option1|

  
Scenario Outline: Enter various countries in the dynamic dropdown
Given I am on the Automation Practice page
When I enter "<Country>" in the country dynamic dropdown
Examples:
    | Country               |    
    | India                 |
    | Canada                |
    | United Kingdom (UK)   |
