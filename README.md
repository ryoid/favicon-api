# favicon api

Get favicon from a website using Cloudflare Workers.

Uses Google's favicon service to resolve the favicon, but uses the actual favicon from the website instead of Google's image version.

```bash
https://api.favicon.ryanjc.com?url=${URL}

# Example
https://api.favicon.ryanjc.com?url=google.com
https://api.favicon.ryanjc.com?url=https://github.com
```

[<img src="https://api.favicon.ryanjc.com?url=google.com" width="32" height="32">](https://api.favicon.ryanjc.com?url=google.com)
[<img src="https://api.favicon.ryanjc.com?url=https://github.com" width="32" height="32">](https://api.favicon.ryanjc.com?url=https://github.com)
[<img src="https://api.favicon.ryanjc.com?url=cloudflare.com" width="32" height="32">](https://api.favicon.ryanjc.com?url=cloudflare.com)

## Features

### Specify custom fallback

You can pass a fallback url to use instead of the default.

```bash
https://api.favicon.ryanjc.com?url=${URL}&fallback=${FALLBACK_URL}
```

Default

[<img src="https://api.favicon.ryanjc.com/?url=DOESNOTEXIST" width="32" height="32">](https://api.favicon.ryanjc.com/?url=DOESNOTEXIST)

Custom fallback `google.com/favicon.ico`

[<img src="https://api.favicon.ryanjc.com/?url=DOESNOTEXIST&fallback=https://www.google.com/favicon.ico" width="32" height="32">](https://api.favicon.ryanjc.com/?url=DOESNOTEXIST&fallback=https://www.google.com/favicon.ico)

### Identify fallback favicon

If the fallback favicon is used, `x-favicon-fallback=1` header will be present in the response.

### Getting real favicon url

From the api you can identify the actual favicon path using `content-location` header.
