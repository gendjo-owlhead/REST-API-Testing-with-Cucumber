Feature: REST API Testing

  Scenario: Retrieve objects from the API
    Given I have the API endpoint "https://api.restful-api.dev/objects"
    When I send a GET request to the API
    Then I should receive a response with status code 200
    And the response should contain a list of objects

  Scenario: Create and manage an object
    Given I have the API endpoint "https://api.restful-api.dev/objects"
    And I have a new object with the following details:
      | name | Apple MacBook Pro 16 |
      | data | {"year": 2019, "price": 1849.99, "CPU model": "Intel Core i9"} |
    When I send a POST request to the API with the new object
    Then I should receive a response with status code 200
    And I store the created object id
    When I update the object with new details:
      | name | Updated MacBook Pro |
      | data | {"year": 2023, "price": 2499.99, "CPU model": "M2 Max"} |
    Then I should receive a response with status code 200
    And the response should contain the updated details
    When I delete the stored object
    Then I should receive a response with status code 200