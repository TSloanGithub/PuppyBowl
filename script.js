// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2402-FTB-MT-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;
const API_Players = "/players/";

let state = {
  players: [],
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

//This runs the function with the input of the playerID. For some reason it does not give my error message even though player 1 does not exist.
/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    // TODO
    const players = await fetch(API_URL + API_Players,{
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(playerObj),
    });
    const result = await players.json();
    console.log("New puppy added", result);
    return result.data.newPlayer;
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
      method: "DELETE",
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

let renderPlayerCard = (player) => {

  let playerCard = document.createElement('div');
  playerCard.classList.add('player-card');

  let playerName = document.createElement('p');
  playerName.innerText = `Name: ${player.name}`;

  let playerImage = document.createElement('img');
  playerImage.src = player.imageUrl;
  playerImage.alt = player.name + player.breed;
  playerImage.style.width = "40px";

  let playerId = document.createElement('p');
  playerId.innerText = `Puppy Id: ${player.id}`;

  let playerBreed = document.createElement('p');
  playerBreed.innerText = `Puppy Breed: ${player.breed}`;

  let moreInfoButton = document.createElement('button');
  moreInfoButton.innerText="more info";
  moreInfoButton.addEventListener('click', async() =>{
    let detailedPlayer = await fetchSinglePlayer(player.id);
    console.log("detailed player info:", detailedPlayer);
    renderSinglePlayer(detailedPlayer);
  });

  playerCard.appendChild(playerName);
  playerCard.appendChild(playerImage);
  playerCard.appendChild(playerId);
  playerCard.appendChild(playerBreed);
  playerCard.appendChild(moreInfoButton);

  puppyCardContainer.appendChild(playerCard);
};

const renderAllPlayers = async (playerList) => {
  // TODO
  //Need to build this out similar to my block21 project
  puppyCardContainer.innerHTML = '';
  const players1 = await fetchAllPlayers();
  if (players1 && players1.length > 0){
  state.players1 = players1;
  players1.forEach(player =>{
    renderPlayerCard(player);
  });
  } else {
    console.log('No players found');
  }
}

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
  puppyCardContainer.innerHTML = '';
  let moreDetailsPuppy = document.createElement('div');
  moreDetailsPuppy.classList.add('puppyDetails');

  let playerName = document.createElement('H2');
  playerName.innerText = `Name: ${player.name} & ${player.breed}`;

  let playerTeam = document.createElement('p');
  playerTeam.innerText = `Team Number: ${player.teamId}`;

  let playerStatus = document.createElement('p');
  playerStatus.innerText = `Puppy Status: ${player.status}`;

  let playerCreation = document.createElement('p');
  playerCreation.innerText = `Puppy Joined: ${player.createdAt}`;

  let returnButton = document.createElement('button');
  returnButton.innerText = 'Return to main page';
  returnButton.addEventListener('click', async()=>{
    await renderAllPlayers();

  })

  moreDetailsPuppy.appendChild(playerName);
  moreDetailsPuppy.appendChild(playerTeam);
  moreDetailsPuppy.appendChild(playerStatus);
  moreDetailsPuppy.appendChild(playerCreation);
  moreDetailsPuppy.appendChild(returnButton);

  puppyCardContainer.appendChild(moreDetailsPuppy);

};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  const form = document.createElement('form');
  form.id = 'new-player-form';

  const nameLabel = document.createElement('label');
  nameLabel.innerText = 'Name: ';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameLabel.appendChild(nameInput);

  const breedLabel = document.createElement('label');
  breedLabel.innerText = 'Breed: ';
  const breedInput = document.createElement('input');
  breedInput.type = 'text';
  breedInput.name = 'breed';
  breedLabel.appendChild(breedInput);

  const statusLabel = document.createElement('label');
  statusLabel.innerText = 'Status: ';
  const statusInput = document.createElement('input');
  statusInput.type = 'text';
  statusInput.name = 'status';
  statusLabel.appendChild(statusInput);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.innerText = 'Add Player';
  submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const playerObj = {};
    formData.forEach((value, key) => {
      playerObj[key] = value;
    });
    const newPlayer = await addNewPlayer(playerObj);
    renderPlayerCard(newPlayer);
    form.reset();
  });

  form.appendChild(nameLabel);
  form.appendChild(breedLabel);
  form.appendChild(statusLabel);
  form.appendChild(submitBtn);
  let formContainer = document.getElementById('playerFormContainer');
  formContainer.appendChild(form);
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  renderNewPlayerForm();
  await renderAllPlayers();
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
