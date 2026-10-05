// Simulação do comportamento do modelo Mentor de Carreiras
const respostasSimuladas = {
    curto: {
        texto: "Para mudar para TI: 1. Escolha uma área (Dev, Dados, UX). 2. Estude a base online. 3. Monte um portfólio no GitHub. 4. Faça networking no LinkedIn.",
        factorEntrada: 1.3,
        factorSaida: 1.4
    },
    detalhado: {
        texto: "Plano Individual de Transição para Ciência de Dados (12 Meses):\n\n• Meses 1-3: Fundamentos de Python e Lógica.\n• Meses 4-6: SQL Avançado e Manipulação de Dados (Pandas).\n• Meses 7-9: Projetos Práticos de Análise e Visualização.\n• Meses 10-12: Portfólio no GitHub, ajuste no LinkedIn e aplicação para vagas.",
        factorEntrada: 1.3,
        factorSaida: 1.4
    }
};

const dadosExecucao = { curto: null, detalhado: null };

// Função aproximada de contagem de tokens (1 token ≈ 4 caracteres em português/inglês)
function estimarTokens(texto) {
    return Math.ceil(texto.length / 3.8);
}

function executarTeste(tipo) {
    const textarea = document.getElementById(`prompt-${tipo}`);
    const promptTexto = textarea.value;

    if (!promptTexto.trim()) {
        alert("Digite um prompt antes de executar!");
        return;
    }

    // Cálculo dos tokens
    const tokensEntrada = estimarTokens(promptTexto);
    const respostaTexto = respostasSimuladas[tipo].texto;
    const tokensSaida = estimarTokens(respostaTexto);
    const totalTokens = tokensEntrada + tokensSaida;

    // Guarda os dados para comparação
    dadosExecucao[tipo] = { entrada: tokensEntrada, saída: tokensSaida, total: totalTokens };

    // Exibe os resultados na tela
    document.getElementById(`in-${tipo}`).textContent = tokensEntrada;
    document.getElementById(`out-${tipo}`).textContent = tokensSaida;
    document.getElementById(`total-${tipo}`).textContent = totalTokens;
    document.getElementById(`resposta-${tipo}`).textContent = respostaTexto;

    document.getElementById(`resultado-${tipo}`).classList.remove('hidden');

    // Atualiza a análise comparativa se ambos forem executados
    atualizarComparacao();
}

function atualizarComparacao() {
    if (!dadosExecucao.curto || !dadosExecucao.detalhado) return;

    const c = dadosExecucao.curto;
    const d = dadosExecucao.detalhado;

    const diferencaTotal = d.total - c.total;
    const percentualAumento = (((d.total - c.total) / c.total) * 100).toFixed(1);

    const painel = document.getElementById('painel-comparativo');
    const analise = document.getElementById('analise-texto');

    painel.classList.remove('hidden');
    analise.innerHTML = `
        <p><strong>Resultado do Comparativo:</strong></p>
        <p>• O <strong>Prompt Detalhado</strong> consumiu <strong>${diferencaTotal} tokens a mais</strong> (${percentualAumento}% de aumento em relação ao curto).</p>
        <p>• <strong>Entrada:</strong> Aumentou de ${c.entrada} para ${d.entrada} tokens devido às restrições e contexto fornecidos.</p>
        <p>• <strong>Saída:</strong> Aumentou de ${c.saída} para ${d.saída} tokens, pois o modelo respondeu com uma estrutura mais rica e personalizada.</p>
        <br>
        <p>💡 <em>Conclusão: Prompts detalhados consomem mais tokens, porém geram respostas mais precisas, personalizadas e úteis para o contexto do usuário.</em></p>
    `;
}
