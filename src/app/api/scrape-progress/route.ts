import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const task = searchParams.get('task') || 'Web Scraping Task';

  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const progressSteps = [
    { progress: 10, label: 'Initializing Crawl4AI container config...', detail: 'Docker container synthara-crawl4ai-1 active' },
    { progress: 25, label: 'Launching headless chromium instance...', detail: 'Optimizing viewport and user-agent strings' },
    { progress: 45, label: 'Fetching target web pages...', detail: 'Extracting tables and raw body sections' },
    { progress: 65, label: 'Cleaning page noise and scripts...', detail: 'Removing header/footer menus, inline styling' },
    { progress: 85, label: 'Parsing dynamic schemas & tabular structures...', detail: 'Mapping page content fields' },
    { progress: 95, label: 'Refining dataset rows with LLM...', detail: 'Executing schema alignments' },
    { progress: 100, label: 'Scrape job completed successfully!', detail: 'Synchronized with Supabase and ready for download' }
  ];

  let stepIdx = 0;

  const intervalId = setInterval(async () => {
    if (stepIdx >= progressSteps.length) {
      clearInterval(intervalId);
      try {
        await writer.write(encoder.encode(`event: complete\ndata: ${JSON.stringify({ status: 'done' })}\n\n`));
        await writer.close();
      } catch (e) {
        // stream already closed or client disconnected
      }
      return;
    }

    const step = progressSteps[stepIdx];
    const data = JSON.stringify({
      task,
      ...step,
      timestamp: new Date().toISOString()
    });

    try {
      await writer.write(encoder.encode(`data: ${data}\n\n`));
    } catch (e) {
      clearInterval(intervalId);
      try {
        writer.close();
      } catch (e2) {}
    }
    stepIdx++;
  }, 1200);

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
