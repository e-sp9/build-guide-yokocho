export const prerender = true;

export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://yokocho.build/</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="https://yokocho.build/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://yokocho.build/en/" />
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yokocho.build/en/</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="https://yokocho.build/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://yokocho.build/en/" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
