# React e-commerce website with apollo graphQL api and with [tilework/opus](https://github.com/tilework/opus) builder [UPDATE]

***This Application is currently being refactored!***

ID | Task
-- | ----
1 | Implement redux to manage the state
2 | Type checking
3 | Upload endpoint
4 | Host Apollo Server GraphQL API
5 | Code review, refactor, and cleanup,
6 | Host the production live

---

* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Fixes based on feedback](#fixes-based-on-feedback)
* [Preview](#preview)

## General info

###### This application fetch data from the GraphQL endpoint and provide an interface to view and interact with this data. 

Products can be filtered according to three categories. Products are checked for presence in the warehouse. The application includes a Product Details Page where you can change product photos (if provided from the server). The user has to select the available options for the product and can add it to the cart. Then the product appears in a small cart tab, where you can still change the options of each product. From this tab you can go to the "Cart" route where you can still edit product options, change photos, add quantity, delete, change selected options. The application summarizes the current cost of the cart and adds tax to it.
The solution had been implemented as per design, which is available at this [link](https://www.figma.com/file/MSyCAqVy1UgNap0pvqH6H3/Junior-Frontend-Test-Designs-Public?node-id=0%3A1).

## Technologies
1. The application was written using React library
2. Only class components have been used in the application
3. Both regular CSS (inline and in seperate files) and CSS-in-JS approach allowers (styled-components) were used in the application

## Features 
- PLP - product listing page
- PDP - product description page
- Cart page + Cart overlay (minicart)

## Preview
- will include the URL to the production live
