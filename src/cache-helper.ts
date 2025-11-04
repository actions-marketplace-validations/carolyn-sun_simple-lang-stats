/**
 * Cache helper utilities for Cloudflare Workers
 * Provides consistent caching behavior across the application
 */

export interface CacheConfig {
  browserTTL: number;  // Browser cache duration in seconds
  cdnTTL: number;      // CDN/Edge cache duration in seconds
  staleWhileRevalidate?: number; // Optional SWR cache duration
}

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  browserTTL: 3600,    // 1 hour
  cdnTTL: 7200,        // 2 hours
  staleWhileRevalidate: 86400  // 24 hours
};

/**
 * Generate cache control headers based on configuration
 */
export function generateCacheHeaders(config: CacheConfig): string {
  let cacheControl = `public, max-age=${config.browserTTL}, s-maxage=${config.cdnTTL}`;
  
  if (config.staleWhileRevalidate) {
    cacheControl += `, stale-while-revalidate=${config.staleWhileRevalidate}`;
  }
  
  return cacheControl;
}

/**
 * Create a cache key for the given request
 */
export function createCacheKey(url: URL, additionalParams?: string[]): string {
  const params = new URLSearchParams();
  
  // Include all search params
  url.searchParams.forEach((value, key) => {
    params.set(key, value);
  });
  
  // Include additional parameters if provided
  if (additionalParams) {
    additionalParams.forEach((param, index) => {
      params.set(`_extra_${index}`, param);
    });
  }
  
  // Sort parameters for consistent cache keys
  params.sort();
  
  return `${url.pathname}?${params.toString()}`;
}

/**
 * Try to get response from Cloudflare cache
 */
export async function getCachedResponse(cacheKey: string): Promise<Response | null> {
  try {
    const cache = (globalThis as any).caches?.default;
    if (!cache) {
      return null;
    }
    
    const cachedResponse = await cache.match(cacheKey);
    return cachedResponse || null;
  } catch (error) {
    console.log('Cache retrieval failed:', error);
    return null;
  }
}

/**
 * Store response in Cloudflare cache
 */
export async function setCachedResponse(cacheKey: string, response: Response): Promise<void> {
  try {
    const cache = (globalThis as any).caches?.default;
    if (!cache) {
      return;
    }
    
    // Clone the response before caching to avoid consuming the stream
    await cache.put(cacheKey, response.clone());
  } catch (error) {
    console.log('Cache storage failed:', error);
  }
}

/**
 * Create cache configuration from environment variables
 */
export function getCacheConfigFromEnv(env: any): CacheConfig {
  return {
    browserTTL: parseInt(env?.BROWSER_CACHE_TTL || '3600'),
    cdnTTL: parseInt(env?.CDN_CACHE_TTL || '7200'),
    staleWhileRevalidate: parseInt(env?.SWR_CACHE_TTL || '86400')
  };
}

/**
 * Add cache headers to a response
 */
export function addCacheHeaders(response: Response, config: CacheConfig, cacheStatus: 'HIT' | 'MISS' = 'MISS'): Response {
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', generateCacheHeaders(config));
  headers.set('X-Cache', cacheStatus);
  headers.set('Vary', 'User-Agent');
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}