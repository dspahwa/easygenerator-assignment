"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(3100);
    console.log(`[bootstrap] server is running on port: 3100`);
}
bootstrap();
//# sourceMappingURL=main.js.map