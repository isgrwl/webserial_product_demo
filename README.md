Web-based interface to control a rotating platform via serial communication. This was built for a client from 2022-2023.

The client had a rotating platform meant to faciliate "360 degree" views of products, by spinning an item and taking pictures at different angles. They already had an existing touch-screen HMI built in C, which they wanted to port to the web in order to lower cost per unit. I recreated it in React and implemented the same functionality using the WebSerial api. 

For the sake of this demo, I disabled serial functionality as the commands are only meant to be used with that specific product.
