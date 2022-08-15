import configDev from "@amira/shared/config/config.dev.json";
import configProd from "@amira/shared/config/config.prod.json";

/**
    Konfiguration.
*/
const config = (window.location.hostname === "localhost") ?
    configDev :
    configProd;

export default config;