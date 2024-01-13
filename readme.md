FRONTEND  -   MIDDLE-END  - BACKEND

--  We need an intermediate layer between client and microservices.
--  Using middle-end, when a client sends request we will be able to make decision to which microservice we need to send the request to.
--  We can do message validation, rate limiting, response transmission.
--  We prepare an API Gateway that acts as the middle-end.
--