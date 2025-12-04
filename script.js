// Alle Fragen, Antworten und die Info, welche Antwort richtig ist
let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Tim Berners-Lee",
        "answer_2": "Bill Gates",
        "answer_3": "Steve Jobs",
        "answer_4": "Mark Zuckerberg",
        "correct_answer": "1" // hier ist die 1 = answer_1 die richtige Antwort
    },

    {
        "question": "Was bedeutet CSS?",
        "answer_1": "Creative Style System",
        "answer_2": "Computer Style Sheets",
        "answer_3": "Cascading Style Sheets",
        "answer_4": "Colorful Style Sheets",
        "correct_answer": "3" // 3 = answer_3
    },

    {
        "question": "Welche Programmiersprache wird hauptsächlich für Webentwicklung verwendet?",
        "answer_1": "Python",
        "answer_2": "JavaScript",
        "answer_3": "C++",
        "answer_4": "Java",
        "correct_answer": "2"
    },   

    {
        "question": "Was ist der Zweck von Git?",
        "answer_1": "Versionskontrolle",
        "answer_2": "Textverarbeitung",
        "answer_3": "Grafikdesign",
        "answer_4": "Datenbankverwaltung",
        "correct_answer": "1"
    },

    {
        "question": "Welche Sprache wird hauptsächlich für die Entwicklung von Android-Apps verwendet?",
        "answer_1": "Swift",
        "answer_2": "Kotlin",
        "answer_3": "Ruby",
        "answer_4": "PHP",
        "correct_answer": "2"
    },

    {
        "question": "Was ist ein Framework in der Softwareentwicklung?",
        "answer_1": "Ein Datenbankmanagementsystem",
        "answer_2": "Ein Betriebssystem",
        "answer_3": "Ein Texteditor",
        "answer_4": "Eine Sammlung von Bibliotheken und Werkzeugen",
        "correct_answer": "4"
    },
];

// Zähler, wie viele Fragen ich richtig beantwortet habe
let rightQuestions = 0;

// Merkt sich, bei welcher Frage ich gerade bin (Index im Array)
let currentQuestion = 0;


// Wird beim Laden der Seite aufgerufen (body onload="Init()")
function Init() {
    // Hier schreibe ich einmalig die Gesamtanzahl der Fragen ins HTML
    document.getElementById("all-questions").innerHTML = questions.length;

    // Dann direkt die erste Frage anzeigen
    showQuestion();
}


// Entscheidet, ob ich noch Fragen zeige oder den Endscreen
function showQuestion() {
    // Wenn das Spiel vorbei ist → Endscreen anzeigen
    if (gameIsOver()) {
        showEndscreen();

    } else {
        // Wenn noch Fragen da sind → Fortschrittsbalken updaten
        updateProgressbar();
        // Und die nächste Frage + Antworten anzeigen
        updateToNextQuestion();
    }
}


// Prüft, ob ich mit den Fragen durch bin
function gameIsOver() {
    // Wenn currentQuestion gleich lang ist wie das Array, bin ich am Ende
    return currentQuestion >= questions.length;
}


// Aktualisiert den Fortschrittsbalken oben
function updateProgressbar() {
    // Prozentzahl ausrechnen: (aktuelle Frage + 1) geteilt durch Anzahl der Fragen
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100); // auf ganze Prozent runden

    // Text im Balken setzen (z.B. "50%")
    document.getElementById('progress').innerHTML = `${percent}%`;

    // Breite vom Balken setzen (CSS width)
    document.getElementById('progress').style = `width: ${percent}%`;
}


// Lädt die Inhalte der aktuellen Frage in die HTML-Elemente
function updateToNextQuestion() {
    // Hole mir das Frage-Objekt zur aktuellen Frage
    let question = questions[currentQuestion];

    // Frage-Nummer im Footer anzeigen (z.B. "1 von 6")
    document.getElementById("question-number").innerHTML = currentQuestion + 1;

    // Fragetext setzen
    document.getElementById("question-text").innerHTML = question["question"];

    // Antworten in die entsprechenden Answer-Boxen schreiben
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}
       

// Wird aufgerufen, wenn ich auf eine Antwort klicke (onclick="answer('answer_1')" usw.)
function answer(selection) {
    // Hole mir die aktuelle Frage aus dem Array
    let question = questions[currentQuestion];

    // Debug: Welche Antwort-ID wurde geklickt? (z.B. "answer_2")
    console.log('selected answer is ', selection);

    // Aus der ID die letzte Ziffer rausholen (z.B. "answer_2" → "2")
    let selectedQuestionNumber = selection.slice(-1);

    // Debug: Welche Nummer habe ich aus der Auswahl rausbekommen?
    console.log('selectedQuestionNumber is ', selectedQuestionNumber);

    // Debug: Was ist laut Daten die richtige Antwortnummer?
    console.log('current question is', question['correct_answer']);

    // Aus der richtigen Nummer wieder eine ID bauen (z.B. "3" → "answer_3")
    let idofrightanswer = `answer_${question["correct_answer"]}`;

    // Prüfen, ob die ausgewählte Nummer mit der korrekten Nummer übereinstimmt
    if (selectedQuestionNumber == question['correct_answer']) {
        // Wenn ja → richtige Antwort
        console.log('Richtige Antwort');
        rightQuestions++; // Richtige-Antwort-Zähler hochsetzen

        // Geklickte Antwort grün hinterlegen
        document.getElementById(selection).parentNode.classList.add('bg-success');

    } else {
        // Wenn nein → falsche Antwort
        console.log('Falsche Antwort');

        // Geklickte Antwort rot markieren
        document.getElementById(selection).parentNode.classList.add('bg-danger');

        // Zusätzlich die richtige Antwort grün markieren
        document.getElementById(idofrightanswer).parentNode.classList.add('bg-success');
    }

    // "Nächste Frage"-Button aktivieren, damit ich weiterklicken kann
    document.getElementById("next-button").disabled = false;
}


// Wird aufgerufen, wenn ich auf "Nächste Frage" klicke
function nextQuestion() {
    // Zur nächsten Frage im Array springen (Index + 1)
    currentQuestion++;

    // Button wieder deaktivieren, bis ich die nächste Antwort auswähle
    document.getElementById("next-button").disabled = true;

    // Farben (grün/rot) von den Antworten der vorherigen Frage zurücksetzen
    resetAnswerbuttons();

    // Über showQuestion wird entschieden: nächste Frage oder Endscreen
    showQuestion();
}


// Entfernt die Hintergrundfarben von allen Antwort-Boxen
function resetAnswerbuttons() {
    document.getElementById("answer_1").parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById("answer_2").parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById("answer_3").parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById("answer_4").parentNode.classList.remove('bg-success', 'bg-danger');  
}


// Wird aufgerufen, wenn ich auf "Erneut spielen" klicke
function restartGame() {
    // Bild im Endscreen zurücksetzen (falls ich das mal ändere)
    document.getElementById('endscreen').src = './Quizapp/brain result.png';

    // Frage-Card wieder einblenden
    document.getElementById("question-body").style = ''; 

    // Endscreen ausblenden
    document.getElementById("endscreen").style = 'display: none';

    // Zähler für richtige Antworten zurücksetzen
    rightQuestions = 0;

    // Wieder bei der ersten Frage anfangen
    currentQuestion = 0;

    // Spiel neu initialisieren
    Init();
}


// Zeigt den Endscreen an, wenn das Quiz vorbei ist
function showEndscreen() {
    // Endscreen sichtbar machen
    document.getElementById("endscreen").style = '';

    // Die eigentliche Frage-Card ausblenden
    document.getElementById("question-body").style = 'display: none';

    // Gesamtanzahl der Fragen im Endscreen anzeigen
    document.getElementById("amount-all-questions").innerHTML = questions.length;

    // Anzahl der richtigen Antworten im Endscreen anzeigen
    document.getElementById("amount-right-questions").innerHTML = rightQuestions;
}
