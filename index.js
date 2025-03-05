un prvar quotes = [
    "...Christophe arrive en retard à la réunion...",
    "Point Gratuit Félicitation !",
    "Ca c'est pas SCRUM",
    "L'agilité, c'est comme ça",
    "Les devs font de la merde",
    "Je ne donne pas de date de livraison",
    "C'est la faute à Leroille",
    "C'est la faute à Sifac",
    "J'ai dit à Ondine",
    "Moi je sais",
    "Tout ce que tu fais, je le fais en mieux",
    "C'est agnostique",
    "... Christophe et Michel se prennent la tête ...",
    "Déploiement en canari",
    "Ah non ça ce n'est pas possible",
    "J'ai un quick win",
    "Il y a un sujet d'architecture",
    "C'est pas difficile mais dans ce sens c'est compliqué",
    "C'est de la gouvernance",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25"
]

var bingoSize = 5;
grid_state = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];


function changedBingo(element)
{
    let val = parseInt(element.value);
    if (val > 5)
        return;
    bingoSize = val;
    generateBingo();
}


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
    resetGrid();
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

function resetGrid()
{
    for (let i = 0; i < grid_state.length; i++)
        grid_state[i] = false;
    document.getElementById("cases").innerHTML = "cases cochées: 0/" + parseInt(bingoSize * bingoSize);
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
