import {SETTINGS} from "./settings";
import {app} from "./app";

app.listen(SETTINGS.PORT, () => {
    console.log(`server started on port ${SETTINGS.PORT}`)
})