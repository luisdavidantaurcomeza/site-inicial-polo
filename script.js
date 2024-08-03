function submitTest() {
    var respostas = [];
    var sections = document.querySelectorAll('.question');

    sections.forEach(function(section) {
        var resposta = section.querySelector('input[type="radio"]:checked');
        if (resposta) {
            respostas.push(resposta.value);
        } else {
            alert("Por favor, responda todas as perguntas para continuar.");
            return;
        }
    });

    if (respostas.length === sections.length) {
        var countHumanas = 0;
        var countExatas = 0;

        respostas.forEach(function(resposta) {
            if (resposta === "h" ) {
                countHumanas++;
            } else if (resposta === "e") {
                countExatas++;
            }
        });

        // Calcular porcentagem
        var totalQuestions = sections.length;
        var porcentagemHumanas = (countHumanas / totalQuestions) * 100;
        var porcentagemExatas = (countExatas / totalQuestions) * 100;

        // Formatar para exibir uma mensagem
        var resultado = "";
        if (porcentagemHumanas > porcentagemExatas) {
            resultado = "Você parece ter afinidade com áreas de Humanas.";
        } else if (porcentagemExatas > porcentagemHumanas) {
            resultado = "Você parece ter afinidade com áreas de Exatas.<br>";
        } else {
            resultado = "Você possui características de ambas as áreas. Considere explorar mais sobre cada uma delas.";
        }

        // Exibir o resultado na div com id "resultado"
        var resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '<h2>Resultado do Teste Vocacional</h2>' + '<p>' + resultado + '</p>' +
                                  '<p>Porcentagem de afinidade com Humanas: ' + porcentagemHumanas.toFixed(2) + '%</p>' +
                                  '<p>Porcentagem de afinidade com Exatas: ' + porcentagemExatas.toFixed(2) + '%</p>';
    }
}
