"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get("PORT", 3000);
    const corsOrigin = configService.get("CORS_ORIGIN", "*");
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: corsOrigin === "*" ? true : corsOrigin.split(","),
        credentials: corsOrigin !== "*",
    });
    app.setGlobalPrefix("api");
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: "1",
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableShutdownHooks();
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle("Order Platform API Gateway")
        .setDescription("Public API entry point for the Order Platform")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup("docs", app, swaggerDocument);
    await app.listen(port, "0.0.0.0");
    console.log(`API Gateway is running on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/docs`);
}
void bootstrap();
//# sourceMappingURL=main.js.map