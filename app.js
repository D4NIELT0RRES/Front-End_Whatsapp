'use strict'

async function pegarDados() {

    const url = `https://one-projeto-2025.onrender.com/v1/whatsapp/v1/whatsapp/dados_de_contato_por_usuario/11987876567`

    const response = await fetch(url) //FETCH é uma ferramenta que faz resuisição web e retorna uma resposta do servidor
    const data = await response.json()

    return data.message
}

async function carregarMensagem(nome) {

    const url = `https://one-projeto-2025.onrender.com/v1/whatsapp/dados_de_contato_para_cada_usuario/11955577796`

    const response = await fetch(url) //FETCH é uma ferramenta que faz resuisição web e retorna uma resposta do servidor
    const data = await response.json()

    return data.message
}

async function criarMensagem() {
    const dados = await carregarMensagem(nome)

    const container = document.getElementById('telaConversa')
    container.replaceChildren('')

    dados.mensagens.forEach(function(item){
        item.forEach(function(itemConversa){
            if(itemConversa.enviar == 'me'){

            //puxar todos os elementos
            const containerUsuario = document.createElement('div')
            containerUsuario.classList.add(containerUsuario)
            
            const conversasDoUsuario = document.createElement('div')
            conversasDoUsuario.classList.add(conversasDoUsuario)

            const h1 = document.createElement('h1')
            const pTimeUsuario = document.createElement('p')
            const pTextoUsuario = document.createElement('p')

            h1.textContent = itemConversa.enviar
            pTimeUsuario.textContent = itemConversa.tome
            pTextoUsuario.textContent = itemConversa.content

            conversasDoUsuario.appendChild(h1)
            conversasDoUsuario.appendChild(pTimeUsuario)
            conversasDoUsuario.appendChild(pTextoUsuario)

            containerUsuario.appendChild(conversasDoUsuario)
            conta

            }
        })
    })
    
    
}






