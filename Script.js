// Função para rolar os dados
document.getElementById('roll-button').addEventListener('click', function() {
    const diceType = parseInt(document.getElementById('dice').value);
    const numDice = parseInt(document.getElementById('numDice').value);
    const modifier = parseInt(document.getElementById('modifier').value) || 0;
    
    const results = [];
    let total = 0;
    
    // Rolagem dos dados
    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * diceType) + 1;
        results.push(roll);
        total += roll;
    }
    
    // Aplica o modificador ao total
    total += modifier;
    
    // Cria a string para exibir o resultado
    const resultsString = results.join(', ');
    const modifierString = modifier >= 0 ? `+${modifier}` : modifier;
    const totalString = `Total: ${total}`;
    
    // Exibe o resultado
    document.getElementById('result-output').innerText = `${resultsString} ${modifierString} = ${totalString}`;
    
    // Adiciona ao histórico
    const historyItem = `${resultsString} ${modifierString} = ${totalString}`;
    addHistoryItem(historyItem);
    
    // Salva o histórico
    saveHistory();
});

// Função para adicionar item ao histórico
function addHistoryItem(item) {
    const historyItem = document.createElement('li');
    historyItem.textContent = item;
    document.getElementById('history-list').appendChild(historyItem);
}

// Função para limpar o histórico
document.getElementById('clear-history').addEventListener('click', function() {
    document.getElementById('history-list').innerHTML = '';
    localStorage.removeItem('rollHistory'); // Remove o histórico do localStorage
});

// Função para salvar histórico no localStorage
function saveHistory() {
    const historyItems = [];
    document.querySelectorAll('#history-list li').forEach(item => {
        historyItems.push(item.textContent);
    });
    localStorage.setItem('rollHistory', JSON.stringify(historyItems));
}

// Função para carregar histórico do localStorage
function loadHistory() {
    const savedHistory = JSON.parse(localStorage.getItem('rollHistory')) || [];
    savedHistory.forEach(item => {
        addHistoryItem(item);
    });
}

// Carrega o histórico ao iniciar a página
loadHistory();
