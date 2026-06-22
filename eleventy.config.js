module.exports = function (eleventyConfig) {
  // Copy static assets straight through to the built site.
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Rebuild when the stylesheet changes.
  eleventyConfig.addWatchTarget("src/css/");

  // --- Filters -------------------------------------------------------------

  // "22 June 2026"
  eleventyConfig.addFilter("readableDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  // ISO timestamp for <time datetime="…">
  eleventyConfig.addFilter("isoDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString();
  });

  // "4" (minutes) — rough reading time from rendered HTML.
  eleventyConfig.addFilter("readingTime", (content) => {
    const text = String(content).replace(/<[^>]*>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  // The collection tag every post shares; hidden from the visible tag list.
  eleventyConfig.addFilter("topicTags", (tags) =>
    (tags || []).filter((t) => t !== "posts")
  );

  // --- Collections ---------------------------------------------------------

  // Posts, newest first.
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
