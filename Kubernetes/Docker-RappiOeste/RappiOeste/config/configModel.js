const HashMap = require('hashmap');

module.exports.config = (env) => {
    const DEV = {
        DB_DATABASE: 'rappioeste',
        DB_HOST: 'mysql',
        DB_PASSWORD: 'rapiuserpass',
        DB_USER: 'rapiuser',
        POOL_MAX: 5
    };
    const TEST = {
        DB_DATABASE: 'rappioeste',
        DB_HOST: 'localhost',
        DB_PASSWORD: 'rapiuserpass',
        DB_PORT: '3307',
        DB_USER: 'rapiuser',
        POOL_MAX: 5
    };

    const envMap = new HashMap();
    envMap.set('DEV', DEV);
    envMap.set('TEST', TEST);

    return envMap.get(env);
};
