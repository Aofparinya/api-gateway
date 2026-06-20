import { BadGatewayException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

type QueryValue = string | number | boolean | undefined;

@Injectable()
export class CatalogProxyService {
  private readonly baseUrl: string;

  constructor(config: ConfigService) {
    this.baseUrl = config
      .get<string>("CATALOG_SERVICE_URL", "http://localhost:3003")
      .replace(/\/$/, "");
  }

  async forward(
    path: string,
    method: string,
    authorization: string | undefined,
    body?: unknown,
    query?: Record<string, QueryValue>,
  ): Promise<{ status: number; body: unknown }> {
    try {
      const url = new URL(`${this.baseUrl}/api/v1/${path}`);
      for (const [key, value] of Object.entries(query ?? {})) {
        if (value !== undefined && value !== "") {
          url.searchParams.set(key, String(value));
        }
      }
      const response = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
          ...(authorization ? { authorization } : {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      });
      const text = await response.text();
      return {
        status: response.status,
        body: text ? (JSON.parse(text) as unknown) : undefined,
      };
    } catch {
      throw new BadGatewayException("Catalog service is unavailable");
    }
  }
}
