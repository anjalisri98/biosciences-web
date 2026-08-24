import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Blog.css";

// Dummy data for Blog Posts (Replace with API calls later)
const blogPosts = [
  {
    id: 1,
    tag: "Industry Trends",
    date: "May 16, 2025",
    title: "Sustainable Chemistry: Building a Greener Future",
    excerpt:
      "Explore how sustainable practices and green chemistry are shaping the future of the chemical industry.",
    image: "/image4.jpg",
  },
  {
    id: 2,
    tag: "Technical Guide",
    date: "May 09, 2025",
    title: "Best Practices for Safe Chemical Handling",
    excerpt:
      "A comprehensive guide to safety protocols, equipment, and handling procedures.",
    image: "/image1.jpg",
  },
  {
    id: 3,
    tag: "Regulatory Update",
    date: "Apr 28, 2025",
    title: "Understanding REACH Compliance in 2025",
    excerpt:
      "Stay updated with the latest international regulations and compliance requirements.",
    image: "/image6.jpg",
  },
];

const filterOptions = [
  "All",
  "Industry Trends",
  "Technical Guide",
  "Regulatory Update",
];

function Blog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesFilter = activeFilter === "All" || post.tag === activeFilter;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="blog-page">
      {/* Hero Banner */}
      <div className="blog-hero">
        <h1>Latest Insights & Knowledge</h1>
        <p>
          Explore our deep resources, industry trends, and expert knowledge to
          empower your research.
        </p>
        <div className="blog-search-container">
          <input
            type="text"
            className="blog-search-input"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="blog-search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="container">
        <div className="blog-filters">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className={`blog-filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <div className="blog-card" key={post.id}>
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-card-body">
                <span className="blog-card-tag">{post.tag}</span>
                <span className="blog-card-meta">
                  <i className="far fa-calendar-alt"></i> {post.date}
                </span>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="blog-read-more">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="blog-pagination">
          <button className="page-btn">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blog;
