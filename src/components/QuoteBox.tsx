import { useEffect, useState } from "react";
import { Quote, RefreshCw } from "lucide-react";

interface QuoteData {
  content: string;
  author: string;
}

const QuoteBox = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback quotes in case API fails
  const fallbackQuotes: QuoteData[] = [
    {
      content: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      content: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
    },
    {
      content: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
    },
    {
      content: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      content: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
    },
  ];

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try ZenQuotes API first (simpler and more reliable)
      const response = await fetch("https://zenquotes.io/api/random");
      if (!response.ok) {
        throw new Error("API failed");
      }
      const data = await response.json();
      if (data && data[0]) {
        setQuote({
          content: data[0].q,
          author: data[0].a.replace(/, type.+/, ""), // Clean author name
        });
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      // Use a random fallback quote if API fails
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (loading) {
    return (
      <div className="quote-box quote-loading">
        <div className="quote-spinner" />
        <span>Loading inspiration...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quote-box quote-error">
        <p>{error}</p>
        <button onClick={fetchQuote} className="quote-retry">
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="quote-box">
      <Quote className="quote-icon" size={24} />
      <blockquote className="quote-text">"{quote?.content}"</blockquote>
      {quote?.author && <cite className="quote-author">— {quote.author}</cite>}
    </div>
  );
};

export default QuoteBox;
