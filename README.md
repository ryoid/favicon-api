# favicon api

Get favicon from a website using Cloudflare Workers. Uses Google's favicon service to resolve the favicon, tries to use actual favicon from the website instead of Google's image version.

```bash
https://favicon-api.flop.workers.dev?url=${URL}

# Example
https://favicon-api.flop.workers.dev?url=google.com
https://favicon-api.flop.workers.dev?url=https://github.com
```

<a href="https://favicon-api.flop.workers.dev?url=google.com"><img src="https://favicon-api.flop.workers.dev?url=google.com" width="1rem" height="1rem"/></a>
<a href="https://favicon-api.flop.workers.dev?url=https://github.com"><img src="https://favicon-api.flop.workers.dev?url=https://github.com" width="1rem" height="1rem"/></a>
<a href="https://favicon-api.flop.workers.dev?url=cloudflare.com"><img src="https://favicon-api.flop.workers.dev?url=cloudflare.com" width="1rem" height="1rem"/></a>

## Features

### Specify custom fallback

You can pass a fallback url to use in case the favicon is not found to o  verride the default fallback.

<a href="https://favicon-api.flop.workers.dev/?url=doesnotexist"><img src="https://favicon-api.flop.workers.dev/?url=doesnotexist" width="1rem" height="1rem"/></a>
<a href="https://favicon-api.flop.workers.dev/?url=doesnotexist&fallback=https://www.google.com/favicon.ico"><img src="https://favicon-api.flop.workers.dev/?url=doesnotexist&fallback=https://www.google.com/favicon.ico" width="1rem" height="1rem"/></a>

```bash
https://favicon-api.flop.workers.dev?url=${URL}&fallback=${FALLBACK_URL}
```

### Identify fallback favicon

If the fallback favicon is used, `x-favicon-fallback=1` header will be present in the response.

### Getting real favicon url

From the api you can identify the actual favicon path using `content-location` header.
