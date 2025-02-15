        const iniciar = document.querySelector("#iniciar");
        const pausar = document.querySelector("#pausar");
        const resetar = document.querySelector("#resetar");
        const tela = document.querySelector("#tela");
        const listaParadas = document.querySelector("#listaParadas")

        let tempoInicial;
        let tempoDecorrido = 0; 
        let intervaloId;
        //variável intervaloId para armazenar a função setInterval que tem como objetivo executar uma função repetidamente com um intervalo de tempo fixo entre cada chamada. Nós podemos determinar a quantidade do intervalo de tempo.
        let contando = false;

        function alterarTempo() {
            tempoDecorrido = Date.now() - tempoInicial;
            let segundos = Math.floor((tempoDecorrido / 1000) % 60);
            let minutos = Math.floor((tempoDecorrido / (1000 * 60)) % 60);
            let horas = Math.floor((tempoDecorrido / (1000 * 60 * 60)) % 24);

            let strHora = (horas < 10 ? '0' : '') + horas;
            let strMin = (minutos < 10 ? '0' : '') + minutos;
            let strSeg = (segundos < 10 ? '0' : '') + segundos;

            tela.innerHTML = `${strHora}:${strMin}:${strSeg}`;
            }

        function iniciarCronometro() {
            if (!contando) {
                tempoInicial = Date.now() - tempoDecorrido;
                intervaloId = setInterval(alterarTempo, 1000);
                contando = true;
            }
        }

        function pausarCronometro() {
            if (contando) {
                clearInterval(intervaloId);
                let parada = document.createElement("li");
                parada.textContent = tela.innerHTML; // Adiciona o tempo atual à lista de paradas
                listaParadas.appendChild(parada);
                pausar.innerText = "Retomar(p)";
                contando = false;
        } else {
            tempoInicial = Date.now() - tempoDecorrido;
            intervaloId = setInterval(alterarTempo,1000);
            pausar.innerText = "Pausar(p)"
            contando = true;
        }
    }

        function resetarCronometro() {
            clearInterval(intervaloId);
            tela.innerHTML = '00:00:00';
            tempoDecorrido = 0;
            contando = false;
            listaParadas.innerHTML= "";
        }

        document.querySelector("#iniciar").onclick = iniciarCronometro;
        document.querySelector("#pausar").onclick = pausarCronometro;
        document.querySelector("#resetar").onclick = resetarCronometro;

        document.addEventListener('keydown', (evento) => {
        if (evento.key.toLowerCase() === 'i') iniciarCronometro();
        if (evento.key.toLowerCase() === 'p') pausarCronometro();
        if (evento.key.toLowerCase() === 'r') resetarCronometro();
    });
 