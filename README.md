# vamp
A source for makeup reviews and ratings

Full-stack web application mimicking Craiglsist’s personal section for a younger generation. Allows users to post something to do and specify how many people can attend. Users can then join each other’s events. User authentication utilizing jwt tokens. MongoDB back-end with relational schemas connecting users and events. React front-end that breaks down several components and imports them where required. 

**Tech stack:** HTML, CSS, EJS, JavaScript, Express, Sequelize & Node.js

**API:** http://makeup-api.herokuapp.com/

http://makeup-api.herokuapp.com/api/v1/products.json?
     - brand=maybelline & 
     - product_type=lipstick
     - json data returned:
     ![datareturned](/images/jsondatareturned.png)    

**MVP Goals:**
     - Allow users to search by brand or product
     - Allow users to rate/comment
     - View of user profile should display their activity/comments
     - View of products should display rating/comments

**Stretch goals:**
     - Login
     - Products page with type categories or brand categories
     - Display youtube videos about product or link to them
     - Display ratings from other sites
