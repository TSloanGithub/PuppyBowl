// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2402-FTB-MT-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;
const API_Players = "/players/";
let state = {
  name: [],
  status: [],
  imageUrl: [],
  id: [],
  breed: [],
  cohortID: [],
  // team: [],
  teamId: [],
  createdAt: [],
  updatedAt: [],
}
const puppyCardContainer = document.getElementById("playerCardContainer");
/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    const players = await fetch(API_URL + API_Players);
    const playerList = await players.json();
    console.log(playerList);
    return playerList.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const players = await fetch(API_URL + API_Players + playerId);
    const playerList = await players.json();
    console.log(playerList);
    return playerList.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};
fetchSinglePlayer(2); 
//This runs the function with the input of the playerID. For some reason it does not give my error message even though player 1 does not exist.
/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    // TODO
    const players = await fetch(API_URL + API_Players + playerId,{
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(playerObj),
    });
    const result = await players.json();
    console.log(result);
    //Since i'm updating, do I keep the const "result" as "result" or do I use "players"?
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    // TODO
    const players = await fetch(API_URL + API_Players +playerId,{
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(playerObj),
    });
    const result = await players.json();
    console.log(result);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};


/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
// let state = {
//   name: [],
//   status: [],
//   imageUrl: [],
//   id: [],
//   breed: [],
//   cohortID: [],
//   team: [],
//   teamID: [],
//   createdAt: [],
//   updatedAt: [],
// }

function createPlayerDetails(state){
  let playerCard = document.createElement('div');
  playerCard.id = `div${state.id}`;
  playerCard.classList.add("player-card");

  let playerName = document.createElement('p');
  playerName.innertext = `Name: ${state.name}`;

  let playerImage = document.createElement('p');
  playerImage.src = state.imageUrl;
  playerImage.alt = state.name + state.breed;

  let playerId = document.createElement('p');
  playerId.innertext = `Puppy Id: ${state.id}`;

  let playerBreed = document.createElement('p');
  playerBreed.innertext = `Puppy Breed: ${state.breed}`;

  playerCard.appendChild(playerName);
  playerCard.appendChild(playerImage);
  playerCard.appendChild(playerId);
  playerCard.appendChild(playerBreed);

  return playerCard;
}
createPlayerDetails(state);

const renderAllPlayers = async (playerList) => {
  // TODO
  //Need to build this out similar to my block21 project
  try{
    if (playerList.length !== ''){
      //resetting the array to be 0 so that when we submit new ones via add player it will not add the same players
      state.name = [];
      state.status = [];
      state.imageUrl = [];
      state.id = [];
      state.breed = [];
      state.cohortID = [];
      state.teamId = [];
      state.createdAt = [];
      state.updatedAt = [];

    playerList.forEach(player => {
      state.name.push(player.name);
      state.status.push(player.status);
      state.imageUrl.push(player.imageUrl);
      state.id.push(player.id);
      state.breed.push(player.breed);
      state.cohortID.push(player.cohortID);
      state.teamId.push(player.teamId);
      state.createdAt.push(player.createdAt);
      state.updatedAt.push(player.updatedAt);
      
      return state;
    })}
  } catch(e){
    console.log('No players found');
  }
  console.log(state);}
renderAllPlayers();
/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
