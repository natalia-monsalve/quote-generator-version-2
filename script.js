const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function newQuoteFromAPI() {
  // Pick a random quote from apiQuotes array 
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
  return quote;
}

function newQuoteLocally() {
  // Pick a random quote from localQuotes array 
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  console.log(quote);
  return quote;
}

async function getQuotesFromAPI() {
  let quote;
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    quote = newQuoteFromAPI();
    removeLoadingSpinner();
  } catch (error) {
    console.error(error);
    console.log('Quote from localQuotes array');
    quote = newQuoteLocally();
    removeLoadingSpinner();
  }
  // If author is null, add 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Dynamically reduce font size for long quotes
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.innerText = quote.text;
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotesFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotesFromAPI();