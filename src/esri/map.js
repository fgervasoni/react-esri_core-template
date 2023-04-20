import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import esriRequest from '@arcgis/core/request';

export function initializeMap(ref) {
    IdentityManager.checkSignInStatus(
        'https://jakalacorp.maps.arcgis.com/arcgis/sharing'
    )
        .then(function () {
            console.log('User Logged in, proceeding');
        })
        .catch(function () {
            console.log('User not logged in.. Logging in...');
            const referer = document.URL; // || 'https://www.tradedimensions.io/';
            esriRequest(
                'https://jakalacorp.maps.arcgis.com/sharing/rest/generateToken',
                {
                    responseType: 'json',
                    method: 'post',
                    query: {
                        username: import.meta.env.VITE_REACT_APP_USER_ID,
                        password: import.meta.env.VITE_REACT_APP_PASSWORD,
                        client: 'referer',
                        referer,
                        f: 'json',
                    },
                }
            )
                .then(function (response) {
                    IdentityManager.registerToken({
                        expires: response.data.expires,
                        server: 'https://jakalacorp.maps.arcgis.com/sharing/rest',
                        ssl: true,
                        token: response.data.token,
                        userId: import.meta.env.VITE_REACT_APP_USER_ID,
                    });
                    console.log('User Logged in');
                })
                .catch(function (error) {
                    console.log(error);
                });
        });

    // create from a web map?
    const webmap = new WebMap({
        portalItem: {
            id: import.meta.env.VITE_REACT_APP_PORTAL_ID,
        },
    });
    const view = new MapView({
        container: ref,
        map: webmap,
    });

    return [webmap, view];
}
