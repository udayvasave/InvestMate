import React from 'react'
import Navbar from '../../../Navbar'
import ScrollToTop from '../../ScrollToTop'
import TableOfContent from '../../TableofContent'
import '../../IntroToStocks/introToStocks.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StockFundamentals = () => {
    const headings = [
      { id: "section1", title: "Introduction to Stock Fundamentals" },
      { id: "section2", title: "Key Points" },
      { id: "section3", title: "How Stock Fundamentals Work" },
      { id: "section4", title: "Common Indicators Used in Fundamental Analysis" },
      { id: "section5", title: "Example of Stock Fundamentals" },
      { id: "section6", title: "Special Considerations" },
      { id: "section7", title: "Fundamental Analysis vs. Technical Analysis" },
    ];
  
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
      if (!token) {
        // Redirect to login page if token doesn't exist
        navigate("/login");
      }
    }, [token, navigate]);
  
    return (
      <div>
        <ScrollToTop />
        <Navbar />
        <h1 className="stockpagetitle">Stock Fundamentals</h1>
        <div className="tableContent-mainContainer">
          <TableOfContent headings={headings} />
  
          <div className="content">
            {headings.map((heading, index) => (
              <div key={index} id={heading.id} className="section">
                <h2>{heading.title}</h2>
                {heading.id === "section1" && (
                  <>
                    <p>
                      Stock fundamentals refer to the key metrics used to evaluate
                      a company's financial health and performance, such as cash
                      flow and return on assets (ROA). These metrics are often
                      examined through a process called fundamental analysis,
                      which involves assessing any data expected to impact a
                      stock's price or perceived value
                    </p>
                  </>
                )}
                {heading.id === "section2" && (
                  <>
                    <p>
                      <strong>Fundamental analysis</strong> involves examining
                      data that impacts a stock's price or value.
                    </p>
                    <p>
                      <strong>Stock fundamentals</strong>include metrics like cash
                      flow, ROA, conservative gearing, and other financial
                      indicators.
                    </p>
                    <p>
                      <strong>Fundamental analysis</strong>requires digging
                      through financial statements to determine if a stock is
                      over- or under-valued.
                    </p>
                  </>
                )}
                {heading.id === "section3" && (
                  <>
                    <p>
                      Fundamental analysis focuses on evaluating a company's
                      intrinsic value and assessing whether a stock is correctly
                      priced. This involves examining a range of factors,
                      including industry trends, competition, management
                      structure, income, revenue, and growth potential. By looking
                      at these fundamentals, analysts aim to create a
                      comprehensive portrait of a company to inform buy or sell
                      decisions.
                    </p>
                  </>
                )}
                {heading.id === "section4" && (
                  <>
                    <p>
                      Fundamental analysts often use several key indicators to
                      gauge a company's health and future prospects, such as:
                    </p>
                    <p>
                      <strong>Cash flow:</strong>The net cash generated by a
                      company's operations.
                    </p>
                    <p>
                      <strong>Return on assets (ROA):</strong>A measure of how
                      efficiently a company uses its assets to generate profits.
                    </p>
                    <p>
                      <strong>Conservative gearing: </strong>Indicates a company's
                      financial leverage and risk level.
                    </p>
                    <p>
                      <strong>History of profit retention:</strong>Assessing a
                      company's practice of retaining profits for future growth.
                    </p>
                    <p>
                      <strong>Soundness of capital management:</strong>Evaluating
                      how well a company manages its resources to maximize
                      shareholder returns.
                    </p>
                  </>
                )}
                {heading.id === "section5" && (
                  <>
                    <p>
                      To illustrate stock fundamentals, consider the analogy of a
                      shopping mall, where each store represents a different
                      industry or sector. Fundamental analysts, much like careful
                      shoppers, will inspect various "stores" to evaluate the
                      quality of their offerings. They examine the products'
                      intrinsic value, looking at their durability, quality, and
                      features. Similarly, fundamental analysts analyze a
                      company's financial statements and forecast earnings to
                      determine a stock's intrinsic value.
                    </p>
                  </>
                )}
                {heading.id === "section6" && (
                  <>
                    <p>
                      Performing fundamental analysis can be challenging, as it
                      requires digging through detailed financial statements and
                      understanding broader market trends. However, the effort can
                      pay off by revealing stocks that are under- or over-valued.
                      By taking a comprehensive approach to stock analysis,
                      fundamental analysts aim to find opportunities that the
                      market may have missed, ultimately leading to profitable
                      investments.
                    </p>
                    <p>
                      That said, just because fundamental analysis indicates that
                      a stock is undervalued, it doesn't guarantee the stock will
                      reach its intrinsic value soon. Market behavior can be
                      unpredictable, and even the most well-researched analysis
                      can yield unexpected results.
                    </p>
                  </>
                )}
                {heading.id === "section7" && (
                  <>
                    <p>
                      Fundamental analysis differs from technical analysis, which
                      focuses on a stock's trading and price history to predict
                      future trends. Technical analysts believe that price
                      movements are not random and can be predicted by studying
                      past patterns and trends. In contrast, fundamental analysts
                      focus on a stock's intrinsic value, evaluating a company's
                      financial health and prospects.
                    </p>
                  </>
                )}
                {heading.id === "section8" && (
                  <>
                    <p>
                      While technical analysts might look at crowd behavior and
                      trading patterns to make investment decisions, fundamental
                      analysts rely on financial data and a thorough understanding
                      of a company's business operations. These two approaches
                      represent different philosophies on how to analyze and
                      invest in stocks, each with its advantages and limitations.
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

export default StockFundamentals