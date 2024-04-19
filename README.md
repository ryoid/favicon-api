# favicon api

Retrieve a website's favicon using Cloudflare Workers.

Uses Google's favicon service to resolve the favicon, but uses the actual favicon from the website instead of Google's image version.

```bash
https://favicon.undash.co?url=${URL}

# Example
https://favicon.undash.co?url=google.com
https://favicon.undash.co?url=https://github.com
```

[<img src="https://favicon.undash.co?url=google.com" width="32" height="32">](https://favicon.undash.co?url=google.com)
[<img src="https://favicon.undash.co?url=https://github.com" width="32" height="32">](https://favicon.undash.co?url=https://github.com)
[<img src="https://favicon.undash.co?url=cloudflare.com" width="32" height="32">](https://favicon.undash.co?url=cloudflare.com)

## Features

### Custom fallback icon

You can pass a fallback url to use instead of the default.

```bash
https://favicon.undash.co?url=${URL}&fallback=${FALLBACK_URL}
```

Default

[<img src="https://favicon.undash.co/?url=DOESNOTEXIST" width="32" height="32">](https://favicon.undash.co/?url=DOESNOTEXIST)

Custom fallback `google.com/favicon.ico`

[<img src="https://favicon.undash.co/?url=DOESNOTEXIST&fallback=https://www.google.com/favicon.ico" width="32" height="32">](https://favicon.undash.co/?url=DOESNOTEXIST&fallback=https://www.google.com/favicon.ico)

### Identify fallback favicon

If the fallback favicon is used, `x-favicon-fallback=1` header will be present in the response.

### Getting real favicon url

From the api you can identify the actual favicon path using `content-location` header.
