Feature: Test with scenario outlines

Scenario Outline: Persons
  Given There are "<start>" persons in the list
  When I add "<added>" persons to the list
  Then I should have "<total>" persons in the list

  Examples:
    | start | added | total |
    |  23   |  1    |  24   |
    |  1114 |  275  |  1389 |