# Spotify Code Generator

Based on the API used by [spotifycodes.com](https://spotifycodes.com/). There isn't any documentation on this API, so that's included [below](#the-api).


# The API

The API is used to get a code of some format based on a URI. It will not work with URLs, so they need to be converted client-side. Since it is undocumented, I put some basic info here for quick reference.


An example API call:

### Copied Spotify link:

> https://open.spotify.com/track/5Z9KJZvQzH6PFmb8SNkxuk?si=cdb1733863ac447f

### API call:

> https://scannables.scdn.co/uri/plain/svg/000000/white/640/spotify:track:5Z9KJZvQzH6PFmb8SNkxuk

Note that `scannables.scdn.co` is an alias for Spotify.

## Breakdown

```
https://scannables.scdn.co/uri/plain/<FORMAT>/<BACKGROUUND>/<FOREGROUND>/<WIDTH>/<URI>
```

- `uri/plain/`: From what I can tell, this doesn't ever change.
- `FORMAT`: Image format. Accepts `jpeg`, `png`, and `svg`.
  - content-type: `image/jpeg`, `image/png`, `image/svg+xml`
- `BACKGROUUND`: Arbitrary background color. Only accepts 6-digit RGB hex code.
- `FOREGROUND`: The foreground color; only `white` and `black` accepted.
- `WIDTH`: Integer width in pixels. For SVGs, this will just set the file width; the designed width will always be 400.
- `URI`: The URI of the track/user/artist/etc.

# Spotify Metadata API

Example:

> https://api.spotify.com/v1/tracks/5Z9KJZvQzH6PFmb8SNkxuk

Returns the following (greatly shortened for brevity):

```json
{
  "name" : "INDUSTRY BABY (feat. Jack Harlow)",
  "uri" : "spotify:track:5Z9KJZvQzH6PFmb8SNkxuk",
  "album" : {
    "name" : "MONTERO",
    "uri" : "spotify:album:6pOiDiuDQqrmo5DbG0ZubR"
  },
  "artists" : [ {
      "name" : "Lil Nas X",
      "uri" : "spotify:artist:7jVv8c5Fj3E9VhNjxT4snq"
    }, {
      "name" : "Jack Harlow",
      "uri" : "spotify:artist:2LIk90788K0zvyj2JJVwkJ"
    } ]
}
```
