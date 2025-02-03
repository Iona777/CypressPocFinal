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
And I select checkbox "<secondChecbox>"

#When I select checkboxes "<firstCheckBox>" and "<secondChecbox>"

And only "<unselectedCheckbox>" remains unselected
Examples:
|firstCheckBox  |secondChecbox  |unselectedCheckbox |
|Option1        |Option2        |Option3            |
#|Option2        |Option3        |Option1            |

  
