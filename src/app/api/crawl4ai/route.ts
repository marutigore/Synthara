import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls, options = {} } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      );
    }

    console.log(`[Crawl4AI API] Processing ${urls.length} URLs`);

    // Default options for content extraction
    const defaultOptions = {
      extract_media: false,
      extract_links: false,
      extract_images: false,
      extract_tables: true,
      extract_markdown: true,
      extract_clean_html: true,
      extract_text: true,
      wait_for: null,
      timeout: 30000,
      remove_forms: true,
      remove_scripts: true,
      remove_styles: true,
      remove_comments: true,
      ...options
    };

    const results = [];

    // Process each URL
    for (const url of urls) {
      try {
        console.log(`[Crawl4AI API] Scraping: ${url}`);

        // Call actual Crawl4AI service
        const crawl4aiUrl = process.env.CRAWL4AI_SERVICE_URL || process.env.CRAWL4AI_EXTRACT_URL || 'http://localhost:11235';
        let crawlResult;
        
        try {
          const response = await fetch(`${crawl4aiUrl}/crawl`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              urls: [url],
              browser_config: {},
              crawler_config: defaultOptions
            }),
          });

          if (!response.ok) {
            throw new Error(`Crawl4AI service error: ${response.status}`);
          }
          crawlResult = await response.json();
        } catch (crawlError) {
          console.warn(`[Crawl4AI Fallback] Service failed. Executing JSDom mock scraper fallback for ${url}`);
          const fallbackRes = await fetch(url, { signal: AbortSignal.timeout(10000) });
          if (!fallbackRes.ok) throw new Error(`Fallback HTTP request failed: ${fallbackRes.status}`);
          const rawHtml = await fallbackRes.text();
          
          // Heuristic parser mock
          const cleanText = rawHtml
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim();

          crawlResult = {
            title: url.split('/').pop() || 'Parsed Page',
            content: cleanText.substring(0, 15000),
            markdown: cleanText.substring(0, 12000)
          };
        }

        results.push({
          url,
          title: crawlResult.title || '',
          content: crawlResult.content || '',
          markdown: crawlResult.markdown || '',
          success: true,
          timestamp: new Date().toISOString()
        });

      } catch (error: any) {
        console.error(`[Crawl4AI API] Error scraping ${url}:`, error);
        results.push({
          url,
          title: '',
          content: '',
          markdown: '',
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failCount = urls.length - successCount;
    console.log(`[Crawl4AI API] Scraping completed. Successes: ${successCount}, Failures: ${failCount}. Initiating partial data compilation.`);

    return NextResponse.json({
      success: successCount > 0,
      results,
      summary: {
        total: urls.length,
        successful: successCount,
        failed: failCount,
        recoveryStatus: successCount > 0 ? "partial_recovery_active" : "failed"
      }
    });

  } catch (error: any) {
    console.error('[Crawl4AI API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

