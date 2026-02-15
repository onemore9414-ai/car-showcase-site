import React, { useState, useMemo } from 'react';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { FadeInImage } from '../components/FadeInImage';

// Mock Data
const POSTS = [
  {
    id: 1,
    title: 'The Future of Electric Aerodynamics',
    excerpt: 'How active airflow management is redefining range and performance in our latest concept vehicle.',
    category: 'Technology',
    author: 'Dr. Marcus Chen',
    date: 'Feb 24, 2025',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Designing for the Senses',
    excerpt: 'Why the tactile feel of a button or the scent of leather matters just as much as 0-60 times.',
    category: 'Design',
    author: 'Elena Vance',
    date: 'Feb 18, 2025',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2072&auto=format&fit=crop',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'From Track to Street: The V8 Legacy',
    excerpt: 'Tracing the engineering lineage of our championship-winning engines to the new Phantom GT.',
    category: 'Engineering',
    author: 'Alessandro Rossi',
    date: 'Feb 10, 2025',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop',
    readTime: '7 min read'
  },
  {
    id: 4,
    title: 'Sustainability in Hypercar Manufacturing',
    excerpt: 'Implementing carbon-neutral production methods without compromising on performance.',
    category: 'Sustainability',
    author: 'Sarah Jenkins',
    date: 'Feb 05, 2025',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1974&auto=format&fit=crop',
    readTime: '6 min read'
  },
  {
    id: 5,
    title: 'Winter Testing in the Arctic Circle',
    excerpt: 'Pushing the boundaries of battery thermal management in sub-zero conditions.',
    category: 'Testing',
    author: 'Lars Jensen',
    date: 'Jan 28, 2025',
    image: 'https://images.unsplash.com/photo-1517153192978-b2e472669e46?q=80&w=2070&auto=format&fit=crop',
    readTime: '8 min read'
  },
  {
    id: 6,
    title: 'The Art of the Monocoque',
    excerpt: 'A deep dive into the carbon fiber weaving process that gives our chassis its legendary rigidity.',
    category: 'Engineering',
    author: 'Dr. Marcus Chen',
    date: 'Jan 15, 2025',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    readTime: '10 min read'
  }
];

const CATEGORIES = ['All', 'Technology', 'Design', 'Engineering', 'Sustainability', 'Testing'];

export const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-white">
      <SEO 
        title="Journal & News" 
        description="Insights, updates, and stories from the world of Brand Automotive." 
      />

      {/* Hero Section */}
      <div className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">The Journal</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Behind the scenes of automotive excellence. Discover stories of design, engineering, and the future of mobility.
            </p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="border-y border-gray-100 bg-gray-50/50 sticky top-16 z-30 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-shadow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {filteredPosts.length > 0 ? (
          <div className="grid gap-x-8 gap-y-16 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 100}>
                <article className="flex flex-col items-start justify-between group h-full">
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 mb-6">
                    <FadeInImage
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      containerClassName="h-full w-full"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-900/10">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-x-4 text-xs text-gray-500">
                    <time dateTime={post.date} className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-bold leading-6 text-gray-900 group-hover:text-indigo-600 transition-colors">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="relative mt-6 flex items-center gap-x-4 border-t border-gray-100 pt-6 w-full">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                       <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href="#">
                          <span className="absolute inset-0" />
                          {post.author}
                        </a>
                      </p>
                      <p className="text-gray-600">Author</p>
                    </div>
                    <div className="ml-auto">
                       <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No articles found</h3>
            <p className="mt-2 text-gray-500">We couldn't find any articles matching your search terms.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Get the latest news, concept reveals, and engineering deep dives delivered directly to your inbox.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <Calendar className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  New content released every Monday, curated by our editorial team.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <Tag className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-white">No spam</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Official updates only. We value your inbox as much as you do.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};