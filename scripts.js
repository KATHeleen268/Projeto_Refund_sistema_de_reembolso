//seleciona os elementos do formulário
const amount = document.getElementById("amount")

//captura o evento de input ppara formatar o valor.
amount.oninput = () => {
    //obtém o valor atual do input e remove os caracteres não númericos
    let value = amount.value.replace(/\D/g, "")

    //transformar o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$ 1,50)
    value = Number(value)/100
    
    //Atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    //Formata o alor no padrão BRL (Real Brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    } )

    //retorna o valor formatado
    return value
}