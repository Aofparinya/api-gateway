import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

interface HealthResponse {
  status: "ok";
  service: "api-gateway";
  timestamp: string;
}

@ApiTags("health")
@Controller("health")
export class HealthController {
  @Get()
  @ApiOperation({ summary: "Check API Gateway health" })
  @ApiOkResponse({
    schema: {
      example: {
        status: "ok",
        service: "api-gateway",
        timestamp: "2026-06-19T10:00:00.000Z",
      },
    },
  })
  getHealth(): HealthResponse {
    return {
      status: "ok",
      service: "api-gateway",
      timestamp: new Date().toISOString(),
    };
  }
}
