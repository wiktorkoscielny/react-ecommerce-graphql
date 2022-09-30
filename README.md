# React e-commerce website with apollo graphQL api and with [tilework/opus](https://github.com/tilework/opus) builder

* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Fixes based on feedback](#fixes-based-on-feedback)
* [Preview](#preview)

## General info

###### That application fetch data from the GraphQL endpoint and to provide an interface to view and interact with this data. 

Products can be filtered according to three categories. Products are checked for presence in the warehouse. The application includes a Product Details Page where you can change product photos (if provided from the server). The user has to select the available options for the product and can add it to the cart. Then the product appears in a small cart tab, where you can still change the options of each product. From this tab you can go to the "Cart" route where you can still edit product options, change photos, add quantity, delete, change selected options. The application summarizes the current cost of the basket and adds tax to it.
The solution had been implemented as per design, which is available at this [link](https://www.figma.com/file/MSyCAqVy1UgNap0pvqH6H3/Junior-Frontend-Test-Designs-Public?node-id=0%3A1).


## Technologies
1. The application was written using the React framework
2. Only class components have been used in the application
3. Both regular CSS (inline and in seperate files) and CSS-in-JS approach allowers (styled-components) were used in the application

## Features 
- PLP - product listing page
- PDP - product description page
- Cart page + Cart overlay (minicart)

## Fixes based on feedback
 - [x] Clicking green cart botton should add product to cart with first pre selected attribute values
 - [ ] Routing not working correctly
 - [ ] Add to cart functionality does not work (redirects and shows white space)
 - [x] Out of stock should be accessible but impossible to buy
 - [x] Could not find product secondary images

    `I am not sure if I understood the objection correctly, but in the endpoint I downloaded some products only have one picture`
    ![ss of the endpoint](./src/components/assets/product-gallery.png)

 - [ ] Dont fetch every category at once. (Fetch only 1 for current category)
 - [ ] Also same request is sent multiple times

## Preview
https://user-images.githubusercontent.com/81425551/191923067-d10467f5-bf98-4041-9cb2-3f2dec4edf63.mp4


