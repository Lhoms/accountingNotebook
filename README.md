# Accounting notebook

Money accounting system express api.   
We emulate debit and credit operations for a single user.

No security.  
Persistence in memory in `repository/db.js` file.

Swagger https://agileengine.bitbucket.io/fsNDJmGOAwqCpzZx/api/#/default/get__

How to execute:

`npm install`  
`npm start`

Curl example  
(best way to test concurrency is doing simultaneous curl calls in some consoles)
```
curl -X POST   http://localhost:3000/api/transactions   -H 'Content-Type: application/json'   -H 'Postman-Token: 772a38cb-f6ce-4732-99b0-dfdf936e8af1'   -H 'cache-control: no-cache'   -d '{
  "type": "credit",
  "amount": 90
}'
```