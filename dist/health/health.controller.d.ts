interface HealthResponse {
    status: "ok";
    service: "api-gateway";
    timestamp: string;
}
export declare class HealthController {
    getHealth(): HealthResponse;
}
export {};
