export default function Blog() {
  const featuredArticle = {
    title: "The Science Behind Mindful Movement: How Exercise Enhances Mental Health",
    excerpt: "Discover the fascinating connection between physical activity and mental wellbeing, backed by the latest research.",
    author: "Dr. Sarah Chen",
    date: "September 25, 2025",
    readTime: "8 min read",
    category: "Mental Health",
    image: "/api/placeholder/600/400"
  };

  const articles = [
    {
      title: "10 Simple Breathing Techniques for Instant Stress Relief",
      excerpt: "Learn quick and effective breathing exercises you can do anywhere, anytime.",
      author: "Mark Rodriguez, LCSW",
      date: "September 24, 2025",
      readTime: "5 min read",
      category: "Stress Management"
    },
    {
      title: "Building Healthy Sleep Habits: A 30-Day Challenge",
      excerpt: "Transform your sleep quality with evidence-based strategies and daily practices.",
      author: "Dr. Emily Foster",
      date: "September 22, 2025",
      readTime: "7 min read",
      category: "Physical Health"
    },
    {
      title: "Nutrition for Mental Clarity: Foods That Boost Brain Health",
      excerpt: "Discover how the right foods can enhance cognitive function and mood.",
      author: "James Thompson, RD",
      date: "September 20, 2025",
      readTime: "6 min read",
      category: "Nutrition"
    },
    {
      title: "Creating Boundaries: Essential Skills for Mental Wellness",
      excerpt: "Learn to protect your energy and improve relationships with healthy boundaries.",
      author: "Dr. Sarah Chen",
      date: "September 18, 2025",
      readTime: "9 min read",
      category: "Mental Health"
    },
    {
      title: "The Power of Gratitude: Simple Practices for Daily Joy",
      excerpt: "Explore how gratitude practices can transform your mindset and overall wellbeing.",
      author: "Mark Rodriguez, LCSW",
      date: "September 15, 2025",
      readTime: "4 min read",
      category: "Mindfulness"
    }
  ];

  const categories = ["All", "Mental Health", "Physical Health", "Nutrition", "Mindfulness", "Stress Management"];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Wellness Blog & News
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest health tips, research insights, and wellness trends from our expert contributors.
          </p>
        </div>

        {/* Featured Article */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl overflow-hidden">
            <div className="p-8 lg:p-12 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 inline-block">
                    Featured Article
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-teal-100 mb-6 text-lg">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center text-teal-100 text-sm mb-6">
                    <span>{featuredArticle.author}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredArticle.date}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                    Read Full Article
                  </button>
                </div>
                <div className="hidden lg:block">
                  <div className="w-full h-64 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-white/60">Featured Article Image</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-gray-300 hover:border-teal-500 hover:text-teal-600 transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Article Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with Weekly Wellness Tips
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest articles, research insights, and wellness tips delivered directly to your inbox every week.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 text-sm mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}