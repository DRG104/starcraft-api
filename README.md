### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |


#### POST /sign-up

Request:

```
POST http://localhost:8000/sign-up
{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
}
```

Response:

```
HTTP/1.1 201 Created
{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```
POST http://localhost:8000/sign-in
{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }
```

Response:

```
HTTP/1.1 200 OK
{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/

Request:

```
PATCH http://localhost:8000/

--header "Authorization: Bearer $TOKEN"

{
    "passwords": {
        "old": "an example password",
        "new": "super sekrit"
    }
}
```

Response:

```
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/

Request:

```
DELETE http://localhost:8000/sign-out/ 

--header "Authorization: Bearer $TOKEN"

```

Response:

```
HTTP/1.1 204 No Content
```

### Unit Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/units/`              | `unit#index`      |
| GET    | `/units/:id`           | `unit#show`       |
| POST   | `/units/`              | `unit#create`     |
| PATCH  | `/units/:id`           | `unit#update`     |
| DELETE | `/units/:id`           | `unit#delete`     |

#### GET / INDEX

Request:

```
GET http://localhost:8000/units
```

Response:

```
HTTP/1.1 200 OK
{
    "unit": {
        "Name": "Sentry",
        "Cost": "50 minerals 100 gas",
        "Tier": 1.5,
        "Produced": "Gateway",
        "Targets": "Ground / Air",
        "Alive": true,
        "Status": "Idle",
        "owner": "62e3c56c896160da1e143b8e",
        "_id": "62e3cb909228d164d8b697e2",
        "stats": [],
        "createdAt": "2022-07-29T11:59:12.599Z",
        "updatedAt": "2022-07-29T11:59:12.599Z",
        "__v": 0,
        "unitInfo": "Sentry is a 1.5 tier unit, produced from the Gateway.",
        "isAlive": "Sentry standing by and awaiting orders.",
        "id": "62e3cb909228d164d8b697e2"
    }
}
```

#### GET / SHOW

Request:

```
GET http://localhost:8000/units/62e3cb909228d164d8b697e2
```

Response:

```
HTTP/1.1 200 OK
{
    "unit": {
        "Name": "Sentry",
        "Cost": "50 minerals 100 gas",
        "Tier": 1.5,
        "Produced": "Gateway",
        "Targets": "Ground / Air",
        "Alive": true,
        "Status": "Idle",
        "owner": "62e3c56c896160da1e143b8e",
        "_id": "62e3cb909228d164d8b697e2",
        "stats": [],
        "createdAt": "2022-07-29T11:59:12.599Z",
        "updatedAt": "2022-07-29T11:59:12.599Z",
        "__v": 0,
        "unitInfo": "Sentry is a 1.5 tier unit, produced from the Gateway.",
        "isAlive": "Sentry standing by and awaiting orders.",
        "id": "62e3cb909228d164d8b697e2"
    }
}
```

#### POST / CREATE

Request:

```
POST http://localhost:8000/units
```

Response:

```
HTTP/1.1 201 Created
{
    "unit": {
        "Name": "Sentry",
        "Cost": "50 minerals 100 gas",
        "Tier": 1.5,
        "Produced": "Gateway",
        "Targets": "Ground / Air",
        "Alive": true,
        "Status": "Idle",
        "owner": "62e3c56c896160da1e143b8e",
        "_id": "62e3cb909228d164d8b697e2",
        "stats": [],
        "createdAt": "2022-07-29T11:59:12.599Z",
        "updatedAt": "2022-07-29T11:59:12.599Z",
        "__v": 0,
        "unitInfo": "Sentry is a 1.5 tier unit, produced from the Gateway.",
        "isAlive": "Sentry standing by and awaiting orders.",
        "id": "62e3cb909228d164d8b697e2"
    }
}
```

#### PATCH / UPDATE

Request:

```
PATCH http://localhost:8000/units/62e3cb909228d164d8b697e2

{
    "unit": {
        "Name": "Sentry",
        "Cost": "50 minerals 100 gas",
        "Tier": 1.5,
        "Produced": "Gateway",
        "Targets": "Ground / Air",
        "Alive": true,
        "Status": "Idle"
    }
}
```

Response:

```
HTTP/1.1 204 No Content
{
    "unit": {
        "Name": "Sentry",
        "Cost": "50 minerals 100 gas",
        "Tier": 1.5,
        "Produced": "Gateway",
        "Targets": "Ground / Air",
        "Alive": true,
        "Status": "Idle",
        "owner": "62e3c56c896160da1e143b8e",
        "_id": "62e3cb909228d164d8b697e2",
        "stats": [],
        "createdAt": "2022-07-29T11:59:12.599Z",
        "updatedAt": "2022-07-29T11:59:12.599Z",
        "__v": 0,
        "unitInfo": "Sentry is a 1.5 tier unit, produced from the Gateway.",
        "isAlive": "Sentry standing by and awaiting orders.",
        "id": "62e3cb909228d164d8b697e2"
    }
}
```

#### DELETE / DESTROY

Request:

```
DELETE http://localhost:8000/units/62e3c77bfc106c2949a2f8f3

--header "Authorization: Bearer $TOKEN"
```

Response:

```
HTTP/1.1 204 No Content
```

### Stat Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/stats/:unitId`       | `stats#create`    |
| PATCH  | `/stats/:unitId/:statId` | `stats#update`  |
| DELETE | `/stats/:unitId/:statId` | `stats#delete`  |

#### POST / CREATE

Request:

```
POST http://localhost:8000/stats/62e3cb909228d164d8b697e2

{
    "stat": {
        "HP": 40,
        "Shields": 40,
        "Damage": 6,
        "Ability": "Force Field, Guardian Shield, Hallucination",
        "Rank": "Mentor"
    }
}

```

Response:

```
HTTP/1.1 201 Created
```

#### PATCH / UPDATE

Request:

```
PATCH http://localhost:8000/stats/62e3cb909228d164d8b697e2/62e3ceb3894721a4156b4413

{
    "stat": {
        "HP": 15,
        "Shields": 0,
        "Damage": 6,
        "Ability": "Force Field, Guardian Shield, Hallucination",
        "Rank": "Mentor"
    }
}

--header "Authorization: Bearer $TOKEN"
```

Response:

```
HTTP/1.1 204 No Content
```

#### DELTE / DESTROY

Request:

```
DELETE http://localhost:8000/stats/62e3cb909228d164d8b697e2/62e3cd8d894721a4156b43ff

--header "Authorization: Bearer $TOKEN"
```

Response:

```
HTTP/1.1 204 No Content
```