/**
 * Generate a URI usable with the spotify/scannable API. Also creates the URL
 * for the metadata API. Takes URIs or URLs.
 *
 * @param  {str}  input_str The spotify URL or URI.
 * @return {dict}           A dict with keys uriLink and apiLink.
 */

function apiUriFrom(input_str) {
  /* Code snatched from https://www.spotifycodes.com/
   * lines for URL and track information removed for simplicity. The original
   * function would fill a variable with all this information, but it's not needed here.
   */
  var idx_track = input_str.indexOf("track"),
    idx_artist = input_str.indexOf("artist"),
    idx_album = input_str.indexOf("album"),
    idx_playlist = input_str.indexOf("playlist"),
    idx_user = input_str.indexOf("user"),
    idx_genre = input_str.indexOf("genre"),
    idx_show = input_str.indexOf("show"),
    idx_episode = input_str.indexOf("episode"),
    base_url = "https://api.spotify.com/v1",
    result = {};

  if (idx_track >= 0) {
    var track_id = input_str.substr(idx_track + 6, 22);
    result.apiLink = base_url + "/tracks/" + track_id;
    result.uriLink = "spotify:track:" + track_id;
    // result.type = "track"
  } else if (idx_artist >= 0) {
    var artist_id = input_str.substr(idx_artist + 7, 22);
    result.apiLink = base_url + "/artists/" + artist_id;
    result.uriLink = "spotify:artist:" + artist_id;
    // result.type = "artist"
  } else if (idx_album >= 0) {
    var album_id = input_str.substr(idx_album + 6, 22);
    result.apiLink = base_url + "/albums/" + album_id;
    result.uriLink = "spotify:album:" + album_id;
    // result.type = "album"
  } else if (idx_playlist >= 0 && idx_user >= 0) {
    var user_id = input_str.substring(idx_user + 5, idx_playlist - 1),
      playlist_id = input_str.substr(idx_playlist + 9, 22);
    result.apiLink = base_url + "/users/" + user_id + "/playlists/" + playlist_id;
    result.uriLink = "spotify:user:" + user_id + ":playlist:" + playlist_id;
    // result.type = "playlist"
  } else if (idx_playlist >= 0) {
    var playlist_id = input_str.substr(idx_playlist + 9, 22);
    result.apiLink = base_url + "/playlists/" + playlist_id;
    result.uriLink = "spotify:playlist:" + playlist_id;
    // result.type = "playlist"
  } else if (-1 == idx_playlist && idx_user >= 0) {
    var uri_input = input_str.split(":"),
      user_id = uri_input.pop();
    result.apiLink = base_url + "/users/" + user_id;
    result.uriLink = "spotify:user:" + user_id;
    // result.type = "user"
  } else if (idx_genre >= 0) {
    var genre_id = input_str.substr(idx_genre + 6, input_str.length);
    result.apiLink = base_url + "/genre/" + genre_id;
    result.uriLink = "spotify:genre:" + genre_id;
    // result.type = "genre"
  } else if (idx_show >= 0) {
    var show_id = input_str.substr(idx_show + 5, input_str.length);
    result.apiLink = base_url + "/show/" + show_id;
    result.uriLink = "spotify:show:" + show_id;
    // result.type = "show"
  } else if (idx_episode >= 0) {
    var episode_id = input_str.substr(idx_episode + 8, input_str.length);
    result.apiLink = base_url + "/episode/" + episode_id;
    result.uriLink = "spotify:episode:" + episode_id;
    // result.type = "episode"
  } else return null;
  return result;
}
