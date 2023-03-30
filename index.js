// Requirements

// const fetch = require("node-fetch");
// An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client. Users can view the country that is associated with their account in the account settings.

class API_Client {};
class Spotify_Client extends API_Client {
    constructor(token) {
        this.token = token;
    };
    /**
     * 
     * @param {String} id - The Spotify ID of the album.
     * @param {String} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client. Users can view the country that is associated with their account in the account settings.
     */
    albums_getAlbum(id, market) {
        fetch(`https://api.spotify.com/v1/albums/${id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "market": `${market}`
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            return new Error(err);
        })
    }
    /**
     * 
     * @param {String} ids - A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
     * @param {String} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client. Users can view the country that is associated with their account in the account settings.
     */
    albums_getSeveralAlbums(ids, market) {
        fetch("https://api.spotify.com/v1/albums", 
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "ids": ids,
                    "market": market
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            return new Error(err)
        });
    }
    /**
     * 
     * @param {String} id - The Spotify ID of the album.
     * @param {String} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client. Users can view the country that is associated with their account in the account settings.
     * @param {Number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
     * @param {Number} offset - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
     */
    albums_getAlbumTracks(id, market, limit, offset) {
        fetch(`https://api.spotify.com/v1/albums/${id}/tracks`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "market": market,
                    "limit": parseInt(limit),
                    "offset": parseInt(offset)
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
    }
    /**
     * @description Get a list of the albums saved in the current Spotify user's 'Your Music' library.
     * @param {Number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
     * @param {Number} offset - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
     * @param {String} market - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client. Users can view the country that is associated with their account in the account settings.
     */
    albums_getUsersSavedAlbums(limit, offset, market) {
        fetch("https://api.spotify.com/v1/me/albums",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "limit": parseInt(limit),
                    "offset": parseInt(offset),
                    "market": String(market)
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(err => {
            return new Error(err);
        });
    }
    /**
     * @description Save one or more albums to the current user's 'Your Music' library.
     * @param {String} ids - A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
     */
    albums_saveAlbumsForCurrentUser(ids) {
        fetch("https://api.spotify.com/v1/me/albums",
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "ids": ids
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            return new Error(err);
        });
    }
    /**
     * @description Remove one or more albums from the current user's 'Your Music' library.
     * @param {String} ids - A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
     */
    albums_removeUsersSavedAlbums(ids) {
        fetch("https://api.spotify.com/v1/me/albums",
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "ids": ids
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            return new Error(err)
        })
    }
    /**
     * @description Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
     * @param {String} ids - A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
     */
    albums_checkUsersSavedAlbums(ids) {
        fetch("https://api.spotify.com/v1/me/albums/contains",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "ids": ids
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            return new Error(err);
        })
    }
    /**
     * @description Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
     * @param {String} country - A country: an ISO 3166-1 alpha-2 country code. Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.
     * @param {Number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
     * @param {Number} offset - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
     */
    albums_getNewReleases(country, limit, offset) {
        fetch("https://api.spotify.com/v1/browse/new-releases",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "country": String(country),
                    "limit": parseInt(limit),
                    "offset": parseInt(offset)
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            return new Error(err);
        })
    }
}