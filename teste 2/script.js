let slideIndex = 0;
let respostas = [];
showSlide(slideIndex);

function showSlide(n) {
  const slides = document.querySelectorAll('.question-slide');
  const resultSlide = document.querySelector('.result-slide');
  const dots = document.querySelectorAll('.dot');
  const navDots = document.querySelector('.nav-dots');

  if (n >= slides.length) {
    // Mostra o slide de resultado
    resultSlide.style.display = 'block';
    slides.forEach(slide => slide.style.display = 'none');
    navDots.style.display = 'none'; // Esconde as bolhinhas de navegação
    showResult();
  } else {
    // Mostra a pergunta correspondente ao índice n
    slides.forEach(slide => slide.style.display = 'none');
    slides[n].style.display = 'block';
    dots.forEach(dot => dot.classList.remove('active'));
    dots[n].classList.add('active');
  }
}

function nextSlide() {
  const currentQuestion = document.querySelectorAll('.question-slide')[slideIndex];
  const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');
  if (selectedOption) {
    respostas[slideIndex] = selectedOption.value;
    slideIndex++;
    showSlide(slideIndex);
  } else {
    alert('Por favor, selecione uma resposta antes de continuar.');
  }
}

function currentSlide(n) {
  if (n < slideIndex) {
    // Permite navegar apenas para perguntas anteriores
    slideIndex = n;
    showSlide(slideIndex);
  } else if (n > slideIndex) {
    // Impede a navegação para perguntas não respondidas
    alert('Você só pode navegar para perguntas que já foram respondidas.');
  }
}

function showResult() {
  const resultElement = document.getElementById('resultado');
  // Lógica para calcular o resultado com base nas respostas
  if (respostas.length === document.querySelectorAll('.question-slide').length) {
    let countHumanas = 0;
    let countExatas = 0;

    respostas.forEach(function(resposta) {
      if (resposta === "h") {
        countHumanas++;
      } else if (resposta === "e") {
        countExatas++;
      }
    });

    // Calcular porcentagem
    const totalQuestions = respostas.length;
    const porcentagemHumanas = (countHumanas / totalQuestions) * 100;
    const porcentagemExatas = (countExatas / totalQuestions) * 100;

    // Exibir a afinidade
    let resultado = "";
    if (porcentagemHumanas > porcentagemExatas) {
      resultado = "Você parece ter afinidade com áreas de Humanas.";
    } else if (porcentagemExatas > porcentagemHumanas) {
      resultado = "Você parece ter afinidade com áreas de Exatas.";
    } else {
      resultado = "Você possui características de ambas as áreas. Considere explorar mais sobre cada uma delas.";
    }

    // Exibir o resultado com o id "resultado"
    resultElement.innerHTML = '<h2>Resultado do Teste Vocacional</h2>' +
                              '<p>' + resultado + '</p>' +
                              '<p>Porcentagem de afinidade com Humanas: ' + porcentagemHumanas.toFixed(2) + '%</p>' +
                              '<p>Porcentagem de afinidade com Exatas: ' + porcentagemExatas.toFixed(2) + '%</p>';
  } else {
    resultElement.innerHTML = '<p>Por favor, responda todas as perguntas.</p>';
  }
}
