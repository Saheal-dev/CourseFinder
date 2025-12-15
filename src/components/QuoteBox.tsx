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

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      setQuote({
        content: data.content,
        author: data.author,
      });
    } catch (err) {
      setError("Unable to load quote. Please try again later.");
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
