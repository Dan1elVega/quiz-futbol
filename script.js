// Base de datos de 30 escudos usando CDN oficial de football-data.org (SVG limpios)
const database = [
    { image: "https://crests.football-data.org/86.svg", answer: "Real Madrid", options: ["Real Madrid", "Sevilla", "Chelsea", "Valencia"] },
    { image: "https://crests.football-data.org/81.svg", answer: "Barcelona", options: ["Barcelona", "Levante", "Crystal Palace", "Basilea"] },
    { image: "https://crests.football-data.org/78.svg", answer: "Atlético de Madrid", options: ["Atlético de Madrid", "Athletic Club", "Sunderland", "Chivas"] },
    { image: "https://crests.football-data.org/95.svg", answer: "Valencia", options: ["Valencia", "Mallorca", "Villarreal", "Leeds United"] },
    { image: "https://crests.football-data.org/66.svg", answer: "Manchester United", options: ["Manchester United", "Bayern Múnich", "Roma", "Olympiacos"] },
    { image: "https://crests.football-data.org/64.svg", answer: "Liverpool", options: ["Liverpool", "Nottingham Forest", "Arsenal", "Benfica"] },
    { image: "https://crests.football-data.org/57.svg", answer: "Arsenal", options: ["Arsenal", "Aston Villa", "Spartak Moscú", "Bayer Leverkusen"] },
    { image: "https://crests.football-data.org/61.svg", answer: "Chelsea", options: ["Chelsea", "Everton", "Lazio", "Leicester City"] },
    { image: "https://crests.football-data.org/65.svg", answer: "Manchester City", options: ["Manchester City", "Napoli", "Celta de Vigo", "Lazio"] },
    { image: "https://crests.football-data.org/73.svg", answer: "Tottenham", options: ["Tottenham", "Preston North End", "Swansea", "Eintracht Frankfurt"] },
    { image: "https://crests.football-data.org/109.svg", answer: "Juventus", options: ["Juventus", "Newcastle", "Udinese", "Besiktas"] },
    { image: "https://crests.football-data.org/98.svg", answer: "AC Milan", options: ["AC Milan", "Flamengo", "Rennes", "Bournemouth"] },
    { image: "https://crests.football-data.org/108.svg", answer: "Inter de Milán", options: ["Inter de Milán", "Atalanta", "Club Brujas", "Gremio"] },
    { image: "https://crests.football-data.org/113.svg", answer: "Napoli", options: ["Napoli", "Empoli", "Brescia", "Pescara"] },
    { image: "https://crests.football-data.org/100.svg", answer: "AS Roma", options: ["AS Roma", "Galatasaray", "Wolves", "Lecce"] },
    { image: "https://crests.football-data.org/5.svg", answer: "Bayern Múnich", options: ["Bayern Múnich", "Hamburgo", "Stuttgart", "Núremberg"] },
    { image: "https://crests.football-data.org/4.svg", answer: "Borussia Dortmund", options: ["Borussia Dortmund", "Peñarol", "AEK Atenas", "Villarreal"] },
    { image: "https://crests.football-data.org/3.svg", answer: "Bayer Leverkusen", options: ["Bayer Leverkusen", "Union Berlin", "Augsburgo", "Kaiserslautern"] },
    { image: "https://crests.football-data.org/524.svg", answer: "PSG", options: ["PSG", "Lyon", "Mónaco", "Lille"] },
    { image: "https://crests.football-data.org/516.svg", answer: "Marseille", options: ["Marseille", "Bordeaux", "Nantes", "Rangers"] },
    { image: "https://crests.football-data.org/678.svg", answer: "Ajax", options: ["Ajax", "Feyenoord", "PSV", "River Plate"] },
    { image: "https://crests.football-data.org/674.svg", answer: "PSV", options: ["PSV", "Sparta Rotterdam", "AZ Alkmaar", "Twente"] },
    { image: "https://crests.football-data.org/1903.svg", answer: "Benfica", options: ["Benfica", "Braga", "Independiente", "Mónaco"] },
    { image: "https://crests.football-data.org/503.svg", answer: "FC Porto", options: ["FC Porto", "Belenenses", "Deportivo La Coruña", "Real Sociedad"] },
    { image: "https://crests.football-data.org/498.svg", answer: "Sporting CP", options: ["Sporting CP", "Celtic", "Panathinaikos", "Betis"] },
    { image: "https://crests.football-data.org/58.svg", answer: "Aston Villa", options: ["Aston Villa", "West Ham", "Burnley", "Torino"] },
    { image: "https://crests.football-data.org/62.svg", answer: "Everton", options: ["Everton", "Chelsea", "Boca Juniors", "Schalke 04"] },
    { image: "https://crests.football-data.org/67.svg", answer: "Newcastle", options: ["Newcastle", "Juventus", "Santos", "Botafogo"] },
    { image: "https://crests.football-data.org/76.svg", answer: "Wolves", options: ["Wolves", "Hull City", "Fenerbahçe", "Bochum"] },
    { image: "https://crests.football-data.org/9.svg", answer: "Schalke 04", options: ["Schalke 04", "Hoffenheim", "Werder Bremen", "Hertha BSC"] }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const crestImage = document.getElementById('team-crest');
const optionsGrid = document.getElementById('options-grid');
const questionNumberSpan = document.getElementById('question-number');
const currentScoreSpan = document.getElementById('current-score');
const finalScoreNumber = document.getElementById('final-score-number');
const coachMessage = document.getElementById('coach-message');

function initGame() {
    const shuffledDB = [...database].sort(() => Math.random() - 0.5);
    selectedQuestions = shuffledDB.slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const currentQ = selectedQuestions[currentQuestionIndex];
    questionNumberSpan.textContent = currentQuestionIndex + 1;
    
    // Cargar la imagen y aplicar el filtro de desenfoque para ocultar nombres
    crestImage.src = currentQ.image;
    crestImage.className = 'mystery-mode';
    
    const shuffledOptions = [...currentQ.options].sort(() => Math.random() - 0.5);
    optionsGrid.innerHTML = '';
    
    shuffledOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.className = 'option-btn';
        btn.onclick = () => checkAnswer(btn, option, currentQ.answer);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(clickedBtn, selectedOption, correctAnswer) {
    const isCorrect = (selectedOption === correctAnswer);
    const buttons = optionsGrid.querySelectorAll('.option-btn');
    
    // Revelar el escudo claramente al responder
    crestImage.className = 'reveal-mode';
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        clickedBtn.classList.add('correct');
        score++;
        currentScoreSpan.textContent = score;
    } else {
        clickedBtn.classList.add('wrong');
        buttons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < 10) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500); // 1.5 segundos para que vean el escudo revelado
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    finalScoreNumber.textContent = score;
    
    let message = "";
    // Insultos estilo Vegeta
    if (score <= 3) {
        message = "¡Eres un insecto miserable! Un terrícola de clase baja sin talento futbolístico. ¡Desaparece de mi vista antes de que te aniquile!";
    } else if (score <= 6) {
        message = "Patético... Apenas sirves como saco de boxeo. Tu nivel de pelea futbolística es una absoluta basura. ¡Ve a entrenar a la gravedad aumentada!";
    } else if (score <= 9) {
        message = "Hmpf. No está mal para un simple humano, pero sigues siendo un estorbo en la cancha. Aún estás muy lejos de la élite.";
    } else {
        message = "¡Imposible! ¿Acaso has alcanzado el nivel de un Dios del Balón? Nada mal... Supongo que Kakaroto tendría problemas contra ti.";
    }
    
    coachMessage.textContent = message;
}

initGame();