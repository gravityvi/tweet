# tweet

### Required Headers
- x-user-data (base64 encoded of user json)
```
user:{
  role: "admin/super-admin/user",
  uid:"james",
  email:"email@gmail.com",
  firstname:"firstname"
}
```

### assumption
- User service is setting ahead of this service which verifies the jwt and sends the user-data to this service. 


#### POSTMAN LINK
https://www.getpostman.com/collections/7f9710f1bd81f94859ae
