const Joi = require("joi");
const path = require("path");
const dotnev = require("dotenv");

dotnev.config({ path: path.join(__dirname, "../../.env")});

// schema of env files for validation
const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid("development").required(),
    PORT: Joi.number().default(8000),
    MONGODB_URL: Joi.string().required(),
    FIREBASE_API_KEY: Joi.string().required(),
    FIREBASE_AUTH_DOMAIN: Joi.string().required(),
    FIREBASE_DATABASE_URL: Joi.string().required(),
    FIREBASE_PROJECT_ID: Joi.string().required(),
    FIREBASE_STORAGE_BUCKET: Joi.string().required(),
    FIREBASE_MESSAGING_SENDER_ID: Joi.string().required(),
    FIREBASE_APP_ID: Joi.string().required(),
    FIREBASE_MEASUREMENT_ID: Joi.string().required(),
}).unknown();

// validating the process.env object that contains all the env variables
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' }}).validate(process.env);

// throw error if the validation fails or results into false
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    FIREBASE_API_KEY: envVars.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: envVars.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: envVars.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: envVars.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: envVars.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: envVars.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: envVars.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: envVars.FIREBASE_MEASUREMENT_ID,
    mongoose: {
        // exception added for TDD purpose 
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    insertDummyCategories: false, 
}