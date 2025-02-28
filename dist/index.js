"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const app_1 = require("./app");
app_1.app.listen(settings_1.SETTINGS.PORT, () => {
    console.log(`server started on port ${settings_1.SETTINGS.PORT}`);
});
