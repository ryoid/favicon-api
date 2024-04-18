# favicon api

Get favicon from a website using Cloudflare Workers. Uses Google's favicon service to resolve the favicon, tries to use actual favicon from the website instead of Google's image version.

```bash
https://favicon-api.flop.workers.dev?url=${URL}

# Example
https://favicon-api.flop.workers.dev?url=google.com
https://favicon-api.flop.workers.dev?url=https://github.com
```

[<img src="https://favicon-api.flop.workers.dev?url=google.com" width="32" height="32">](https://favicon-api.flop.workers.dev?url=google.com)
[<img src="https://favicon-api.flop.workers.dev?url=https://github.com" width="32" height="32">](https://favicon-api.flop.workers.dev?url=https://github.com)
[<img src="https://favicon-api.flop.workers.dev?url=cloudflare.com" width="32" height="32">](https://favicon-api.flop.workers.dev?url=cloudflare.com)

## Features

### Specify custom fallback

You can pass a fallback url to use in case the favicon is not found to o verride the default fallback.

[<img src="https://favicon-api.flop.workers.dev/?url=DOESNOTEXIST" width="32" height="32">](https://favicon-api.flop.workers.dev/?url=DOESNOTEXIST)
[<img src="https://favicon-api.flop.workers.dev/?url=DOESNOTEXIST&fallback=https://www.google.com/favicon.ico" width="32" height="32">](https://favicon-api.flop.workers.dev/?url=DOESNOTEXIST&fallback=https://www.google.com/favicon.ico)

```bash
https://favicon-api.flop.workers.dev?url=${URL}&fallback=${FALLBACK_URL}
```

### Identify fallback favicon

If the fallback favicon is used, `x-favicon-fallback=1` header will be present in the response.

### Getting real favicon url

From the api you can identify the actual favicon path using `content-location` header.
