import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const contactRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),

  limiter: Ratelimit.slidingWindow(5, "10 m"),

  prefix: "mahiman-portfolio:contact",

  analytics: false,
});
