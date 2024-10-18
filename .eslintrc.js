module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "plugin": prettier/recommended,
    },
    "extends": [
        "plugin:vue/essential",
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        'prettier',
    ],
    "rules": {
        'prettier/prettier': 'error',
    }
};
