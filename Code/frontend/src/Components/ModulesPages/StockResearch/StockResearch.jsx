import React from "react";
import { Link } from "react-router-dom";

const StockResearch = () => {
  return (
    <div>
      <div className="introstocks">
        <div className="heading">
          <div className="num-Line">
            <div className="num">
              <span>4</span>
            </div>
            <div className="line13"></div>
          </div>

          <h2>Stock Research</h2>
          <div className="linksandpara">
            <div className="linksOfItS">
              <Link to="/thestockmarket">
                <span> Stock Fundamentals</span>
              </Link>
              <Link to="/thestockmarket">
                <span> How To Become Your Own Stock Analyst</span>
              </Link>
              <Link to="/thestockmarket">
                <span> Essentials Of Analyzing Stocks</span>
              </Link>
              <Link to="/thestockmarket">
                <span> Fundamental Analysis</span>
              </Link>
              {/* <Link to="/thestockmarket">
                <span>What owning a stock means</span>
              </Link>
              <Link to="/thestockmarket">
                <span>What is a penny stock?</span>
              </Link> */}
            </div>
            <div className="sideContainer">
              <p>
                Stock research is the process of evaluating and analyzing stocks
                to determine their potential as investments. It involves a blend
                of quantitative and qualitative analysis, and a solid
                understanding of both microeconomic factors affecting individual
                companies and macroeconomic trends that influence broader
                markets.
              </p>
              <p>
              Stock fundamentals cover the basic concepts and structures that underpin the stock market. Understanding these fundamentals is critical for any investor. Key concepts include:
              </p>
            </div>
          </div>

          <h2 style={{ padding: "1rem 0rem" }}>Basics of Stock Market</h2>
          <p>
            <strong>Types of Stocks:</strong>Common and preferred stocks, including voting rights and dividend policies.
          </p>
          <p>
            <strong>Market Capitalization:</strong>Categories such as small-cap, mid-cap, and large-cap stocks, indicating the size of the company.
          </p>
          <p>
            <strong>Dividends and Splits:</strong> How companies return profits to shareholders through dividends and what stock splits mean for investors.
          </p>
          <p>
            <strong>Bonds:</strong> Bonds are debt securities issued by
            governments or corporations. Investors lend money to the issuer in
            exchange for periodic interest payments and the return of the
            principal amount at maturity.
          </p>
          <p>
            <strong>Mutual Funds and Exchange-Traded Funds (ETFs):</strong>These
            are investment vehicles that pool money from multiple investors to
            invest in a diversified portfolio of stocks, bonds, or other assets.
          </p>
          <h2 style={{ padding: "1rem 0rem" }}>Operations of Stock Market</h2>
          <p>
            <strong>Trading Sessions:</strong>Stock markets typically operate
            during specific trading hours, allowing investors to buy and sell
            securities. In the U.S., trading hours are usually from 9:30 am to
            4:00 pm Eastern Time.
          </p>
          <p>
            <strong>Order Types:</strong>Investors can place different types of
            orders, such as market orders (executed at the current market price)
            or limit orders (executed only at a specified price or better).
          </p>
          <p>
            <strong>Market Participants:</strong> Market participants include
            individual investors, institutional investors (such as mutual funds
            and pension funds), traders, market makers, and investment banks.
          </p>
          <p>
            <strong>Price Determination:</strong> Stock prices are determined by
            supply and demand dynamics in the market. Factors such as company
            performance, economic indicators, and investor sentiment influence
            stock prices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockResearch;
