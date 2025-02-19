var quotes = [
    "Christophe arrive en retard à la réunion",
    "Point Gratuit Félicitation !",
    "C'est pas SCRUM",
    "Agilité, c'est comme ça",
    "Les devs font de la merde",
    "Je ne donne pas de date de livraison",
    "C'est la faute à Leroille",
    "C'est la faute à Sifac",
    "J'ai dit à Ondine",
    "Moi je sais",
    "Tout ce que tu fais, je le fais en mieux",
    "C'est agnostique",
    "Christophe et Michel se prennent la tête",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25"
]

const bingoSize = 5;
grid_state = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];


function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }


function generateBingo()
{
    shuffle(quotes);
    let grid = document.getElementById("bingo-grid");
    let row = "";
    let table = "";
    for (let i = 0; i < bingoSize; i++)
    {
        table += "<tr>\n";
        row = "";
        for (let j = 0; j < bingoSize; j++)
        {
            row += "<td id=\"" + parseInt((parseInt(i) * bingoSize) + parseInt(j)) +"\" onclick=\"tileClicked(this);\">";
            row += quotes[i * bingoSize + j];
            row += "</td>";
        }
        table += row;
        table += "\n</tr>";
    }
    grid.innerHTML = table;
}

function countTicked(state)
{
    let count = 0;
    for (let i = 0; i < state.length; i++)
    {
        if (state[i])
            count++;
    }
    return count;
}

function tileClicked(element)
{
    let state = grid_state[parseInt(element.id)];
    if (state)
        element.classList.remove("ticked");
    else
        element.classList.add("ticked");
    grid_state[parseInt(element.id)] = !state;

    let tickedCases = document.getElementById("cases");
    tickedCases.innerHTML = "cases cochées: " + countTicked(grid_state) + "/" + parseInt(bingoSize * bingoSize);
}
