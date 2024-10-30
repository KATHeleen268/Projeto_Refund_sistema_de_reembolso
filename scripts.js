//seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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

//captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
    //previne o comportamento padrão de recarregar a página
    event.preventDefault()

    //cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    //chama a função que irá adicionar um item na lista
    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
       //cria o elemento para adicionar o item (li)  na lista  (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")


    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

