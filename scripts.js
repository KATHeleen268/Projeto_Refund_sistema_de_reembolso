//seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")

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

//adiciona um novo item na lista
function expenseAdd(newExpense){
    try {
       //cria o elemento para adicionar o item (li)  na lista  (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //cria o ícon da categoria.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //adiciona name e category na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        //cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", " ")}`

        //cria o ícone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        // Adiciona as informações do item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
       
        //adiciona o item na lista
        expenseList.append(expenseItem)

        //atualiza os totais
        updateTotals()
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }

    
}

//atualiza os totais.
function updateTotals(){
    try{
        //recupera todos os itens (li) da lista (ul)
        const items = expenseList.children
        
        //atualiza a quantidade de itens na lista
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais.")
    }
}
