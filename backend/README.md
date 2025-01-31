## API endpoints

| Method | Endpoint                  | Description                          | Request Body                                    | Response                                   |
| ------ | ------------------------- | ------------------------------------ | ----------------------------------------------- | ------------------------------------------ |
| POST   | `/shorten`                | Shorten a URL                        | `{ longUrl: string, customShortCode?: string }` | `{ shortUrl: string }`                     |
| GET    | `/:shortCode`             | Redirect to the original URL         | -                                               | 302 Redirect                               |
| GET    | `/check/:customShortCode` | Check custom short code availability | -                                               | `{ available: boolean }`                   |
| GET    | `/recent/:userId`         | Get recent URLs for a user           | -                                               | `{ longUrl: string, shortCode: string }[]` |

### Example requests

#### Shorten a URL

```bash
curl -X POST http://localhost:5000/shorten \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://www.arcube.org/demo"}'
```

#### Shorten a URL by choosing custom short code

```bash
curl -X POST http://localhost:5000/shorten \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://www.arcube.org/demo", "customShortCode":"ARC"}'
```

#### Check availability of the custom short code

```bash
curl -X GET http://localhost:5000/check/arc
```

#### Redirect to original URL

```bash
curl -X GET http://localhost:5000/abc
```

#### Get last 5 URLs for a user

```bash
curl -X GET http://localhost:5000/recent/user123
```
