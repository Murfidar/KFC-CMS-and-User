# KFC API Documentations

## Endpoints:

list Endpoints:

- POST /cuisines/create
- GET /cuisines
- GET /cuisines/:id
- GET /cuisines/delete/:id
- GET /categories

&nbsp;

## 1. POST /cuisines/

- Description: create cuisine instance

Request:

- body

```json
{
  "name": "Coca-cola Medium",
  "description": "Coca-cola Medium",
  "price": 11364,
  "imgUrl": "https://static.order.kfcku.com/images/items/lg/11940.jpg?v=q3rWJL",
  "authorId": 2,
  "categoryId": 3
},
```

- user

```json
{
  "username": "admin123",
},
```

_Response (201 - Created)_

```json
{
  "cuisine": {
    "id" : 6,
    "name": "Coca-cola Medium",
    "description": "Coca-cola Medium",
    "price": 11364,
    "imgUrl": "https://static.order.kfcku.com/images/items/lg/11940.jpg?v=q3rWJL",
    "authorId": 2,
    "categoryId": 3,
    "status": "Active",
    "createdAt": "2023-07-10T10:20:29.818Z",
    "updatedAt": "2023-07-10T10:20:29.818Z"
  },
  "history": {
    "id": 11,
    "name": "Hemat Sendiri",
    "description": "POST: new cuisine with id ${id} has been created",
    "updatedBy": "admin123",
    "updatedAt": "2023-07-17T10:27:35.092Z",
    "createdAt": "2023-07-17T10:27:35.092Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Name is Required",
    "Description is Required",
    "Price is Required",
    "Price cannot be below 6000",
    "Img Url is Required",
    "Author Id is Required",
    "Updated By is Required"
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 2. GET /cuisines

- Description: read all cuisine instance

Request:

_Response (200 - OK)_

```json
[
  {
    "id": 2,
    "name": "Sprite Medium",
    "description": "Sprite Medium",
    "price": 11364,
    "imgUrl": "https://static.order.kfcku.com/images/items/lg/11941.jpg?v=q3rWJL",
    "authorId": 2,
    "categoryId": 3,
    "createdAt": "2023-07-10T10:20:29.818Z",
    "updatedAt": "2023-07-10T10:20:29.818Z"
  }
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 3. GET /cuisines/:id

- Description: read a specific cuisine instance with requested id

Request:

```json
{
  "id": 2
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 2,
    "name": "Sprite Medium",
    "description": "Sprite Medium",
    "price": 11364,
    "imgUrl": "https://static.order.kfcku.com/images/items/lg/11941.jpg?v=q3rWJL",
    "authorId": 2,
    "categoryId": 3,
    "createdAt": "2023-07-10T10:20:29.818Z",
    "updatedAt": "2023-07-10T10:20:29.818Z"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 4. DELETE /cuisines/:id

- Description: delete a specific cuisine instance with requested id

Request:

```json
{
  "id": 2
}
```

_Response (200 - OK)_

```json
[
  "message": "Cuisine success to delete",
  "data": {
    "id": 2,
    "name": "Sprite Medium",
    "description": "Sprite Medium",
    "price": 11364,
    "imgUrl": "https://static.order.kfcku.com/images/items/lg/11941.jpg?v=q3rWJL",
    "authorId": 2,
    "categoryId": 3,
    "createdAt": "2023-07-10T10:20:29.818Z",
    "updatedAt": "2023-07-10T10:20:29.818Z"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 5. PUT /cuisines/:id

- Description: Replace cuisine data

Request:

- body

```json
{
  "name": "Coca-cola Medium",
  "description": "Coca-cola Medium",
  "price": 11364,
  "imgUrl": "https://static.order.kfcku.com/images/items/lg/11940.jpg?v=q3rWJL",
  "categoryId": 3
},
```

- user

```json
{
  "username": "admin123",
},
```

_Response (200 - PUT)_

```json
{
  "cuisine": {
    "id" : 6,
    "name": "Coca-cola Medium",
    "description": "Coca-cola Medium",
    "price": 11364,
    "imgUrl": "https://static.order.kfcku.com/images/items/lg/11940.jpg?v=q3rWJL",
    "authorId": 2,
    "categoryId": 3,
    "status": "Active",
    "createdAt": "2023-07-10T10:20:29.818Z",
    "updatedAt": "2023-07-10T10:20:29.818Z"
  },
  "history": {
    "id": 11,
    "name": "Hemat Sendiri",
    "description": "PUT: cuisine with id ${id} has been updated ",
    "updatedBy": "admin123",
    "updatedAt": "2023-07-17T10:27:35.092Z",
    "createdAt": "2023-07-17T10:27:35.092Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Name is Required",
    "Description Id is Required",
    "Updated By is Required"
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 6. PATCH /cuisines/:id

- Description: Replace cuisine data

Request:

- body

```json
{
  "status": "Inactive"
},
```

- user

```json
{
  "username": "admin123",
},
```

_Response (200 - PATCH)_

```json
{
  "cuisine": {
    "id" : 6,
    "name": "Coca-cola Medium",
    "description": "Coca-cola Medium",
    "price": 11364,
    "imgUrl": "https://static.order.kfcku.com/images/items/lg/11940.jpg?v=q3rWJL",
    "authorId": 2,
    "categoryId": 3,
    "status": "Inactive",
    "createdAt": "2023-07-10T10:20:29.818Z",
    "updatedAt": "2023-07-10T10:20:29.818Z"
  },
  "history": {
    "id": 11,
    "name": "Hemat Sendiri",
    "description": "PATCH: cuisine STATUS with id 3 has been updated FROM Inactive to Active ",
    "updatedBy": "admin123",
    "updatedAt": "2023-07-17T10:27:35.092Z",
    "createdAt": "2023-07-17T10:27:35.092Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Name is Required",
    "Description Id is Required",
    "Updated By is Required"
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 7. GET /categories

- Description: read all category instance

Request:

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Spesial",
    "authorId": 1
    "createdAt": "2023-07-10T10:20:29.810Z",
    "updatedAt": "2023-07-10T10:20:29.810Z"
  }
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 8. POST /categories

- Description: create cuisine instance

Request:

- body

```json
{
  "name": "Spesial",
  "authorId": 1
},
```

_Response (201 - Created)_

```json
{
  "name": "Spesial",
  "authorId": 1
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Category is Required"
    "Author Id is Required",
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 9. DELETE /categories/:id

- Description: delete a specific cuisine instance with requested id

Request:

```json
{
  "id": 1
}
```

_Response (200 - OK)_

```json
[
  "message": "Cateogory success to delete",
  "data": {
    "id": 1,
    "name": "Spesial",
    "authorId": 1,
    "createdAt": "2023-07-10T10:20:29.818Z",
    "updatedAt": "2023-07-10T10:20:29.818Z"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 10. POST /register

- Description: register a new admin

Request:

```json
{
  "username": "admin123",
  "email": "admin@admin.com",
  "password": "Amdinsaasd",
  "phoneNumber": "022885112112",
  "address": "Jl. Kokas X"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "username": "admin123",
  "email": "admin@admin.com",
  "Role": "Admin",
  "phoneNumber": "022885112112",
  "address": "Jl. Kokas X",
  "createdAt": "2023-07-10T10:20:29.818Z",
  "updatedAt": "2023-07-10T10:20:29.818Z"
}
```

_Response (400 - SequelizeValidationError)_

```json
{
  "message": [
    "username is Required",
    "email is Required",
    "Please enter the correct email format"
    "password is Required",
    "Password length must be 5 characters or more"
    "phoneNumber is Required",
    "address is Required",
    "Category Id is Required"
  ]
}
```

_Response (400 - SequelizeUniqueConstraintError)_

```json
{
  "message": [
    "There is already a user with this username",
    "There is already a user with this email"
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 11. POST /login

- Description: user login 

Request:

```json
{
  "username": "admin123",
  "email": "admin@admin.com",
  "password": "Amdinsaasd",
}
```

_Response (200 - OK)_

```json
{
  "access_token": "asdsdadsadsadsadsaA#Q$",
  "user": {
    "id": 1,
  }
}
```

_Response (401 - NotFoundLoginDetais)_

```json
{
  "message": "Invalid Username or Email"
}
```

_Response (401 - Invalid Password)_

```json
{
  "message": "Invalid Password"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 12. POST /googleLogin

- Description: user google login 

Request:

```json
{
  "google_token": "asddadwqacxr2_d_das_d",
}
```

_Response (200 - OK)_

```json
{
  "access_token": "asdsdadsadsadsadsaA#Q$",
  "user": {
    "id": 1,
    "username": "admin123"
  }
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
