// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
let urlShuffle = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let urlDraw = "https://deckofcardsapi.com/api/deck/"
console.log("Draw One Card.")
async function show1Card() {
  const resp = await axios.get(urlShuffle);
  const deckId = resp.data.deck_id;
  const card = await axios.get(`${urlDraw}${deckId}/draw/?count=1`);
  console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
  console.log("Draw Two Cards")
}

show1Card();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
// Once you have the card, make a request to the same API to get one more card from the **same** deck.
// Once you have both cards, ***console.log*** the values and suits of both cards.
async function draw2Cards() {
  let resp = await axios.get(urlShuffle);
  const deckId = resp.data.deck_id;
  resp = await Promise.all([
    axios.get(`${urlDraw}${deckId}/draw/?count=1`),
    axios.get(`${urlDraw}${deckId}/draw/?count=1`)
  ]);

  resp.forEach(card => console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`));  
}

draw2Cards();

// 3. Build an HTML page that lets you draw cards from a deck. 
// When the page loads, go to the Deck of Cards API to create a new deck, 
// and show a button on the page that will let you draw a card. 
// Every time you click the button, display a new card, until there are no cards left in the deck.
let deckId;
let numCardLeft;
async function drawCards() {
  let resp = await axios.get(urlShuffle);
  deckId = resp.data.deck_id;
  numCardLeft = resp.data.remaining;
  const $button = $("#button").on("click", handleClick);
}

async function handleClick(evt) {
  evt.preventDefault();
  if (numCardLeft !== 0) {
    const res = await axios.get(`${urlDraw}${deckId}/draw/?count=1`);
    const card = res.data.cards[0];
    const angle = Math.round(Math.random() * 360);
    const $cardImg = $(`
      <img src="${card.images.png}" 
      alt="Image showing ${card.value} of ${card.suit}" 
      style="transform: rotate(${angle}deg)">
    `);
    $("#card").append($cardImg);
    numCardLeft = res.data.remaining;
  }
}

drawCards();
