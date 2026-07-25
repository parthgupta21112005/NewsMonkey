export default async function handler(req, res) {
  try {
    const {
      country = "us",
      category = "general",
      page = 1,
      pageSize = 5,
    } = req.query;
    
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        status: "error",
        message: "NEWS_API_KEY is not configured",
      });
    }

    const newsApiUrl =
      `https://newsapi.org/v2/top-headlines` +
      `?country=${country}` +
      `&category=${category}` +
      `&page=${page}` +
      `&pageSize=${pageSize}` +
      `&apiKey=${apiKey}`;

    const response = await fetch(newsApiUrl);

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error("News API Error:", error);

    return res.status(500).json({
      status: "error",
      message: "Something went wrong while fetching news",
    });
  }
}