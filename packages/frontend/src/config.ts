import devConfig from "../config/dev.config.json";
import prodConfig from "../config/prod.config.json";

/**
    Konfiguration für Amira FE.
*/
let config;

switch(location.hostname) {
    case "localhost": {
        config = devConfig;
        break;
    }

    default: {
        config = prodConfig;
        break;
    }
}

export default config;