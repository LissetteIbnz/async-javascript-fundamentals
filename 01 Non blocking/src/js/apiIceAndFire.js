var apiIceAndFire = apiIceAndFire || {};

const baseRequestFactory = ({err, callback}) => {
    const req = new XMLHttpRequest();
    req.onload = callback;
    req.onerror = err;
    return req;
};

let baseRequests = new WeakMap();

const getRequest = (config) => {
    let baseRequest = baseRequests.get(config);
    if (!baseRequest) {
        baseRequest = baseRequestFactory(config);
        baseRequests.set(config, baseRequest);
    }
    return baseRequest;
};

const sendGetRequest = (req, url) => {
    req.open('get', url, false); // setting async to false, send() does not return until the response is received, then is forced to work synchronously
    req.send();
};

((apiIceAndFire) => {
    apiIceAndFire.Service = class Service {
        constructor() {
            this.baseUrl = 'https://www.anapioficeandfire.com/api';
        }
        
        getHouseById(id, config) {
            const req = getRequest(config);
            const url =  `${this.baseUrl}/houses/${id}`;
            sendGetRequest(req, url);
        }

        getCharacterById(id, config) {
            const req = getRequest(config);
            const url = `${this.baseUrl}/characters/${id}`;
            sendGetRequest(req, url);
        }

        getHousesByName(name, config) {
            const req = getRequest(config);
            const url =  `${this.baseUrl}/houses?name=${name}`;
            sendGetRequest(req, url);
        }

        getCharactersByName(name, config) {
            const req = getRequest(config);
            const url = `${this.baseUrl}/characters?name=${name}`;
            sendGetRequest(req, url);
        }
    }
})(apiIceAndFire)
