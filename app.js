'use strict'

async function contatosApi(){
    const url = `https://projeto-whats-marcel.onrender.com/v1/whatsapp/contatos-para-usuarios/11966578996`
    const response = await fetch(url)

    const data = await response.json()
    
    return data
}

async function dadosConversasApi(nome) {
    const url = `https://projeto-whats-marcel.onrender.com/v1/whatsapp/conversas-cada-usuario/cont/11966578996?cont=${nome}`
    const response = await fetch(url)
    
    const data = await response.json()

    return data
}

async function abrirConversa(nome){
    const dadosMensagens = await dadosConversasApi(nome)
    
    const containerConversa = document.querySelector('.telaInicial')
    containerConversa.replaceChildren('')
    dadosMensagens.mensagens.forEach(function(item){
        item.forEach(function(itemConversas){
            if(itemConversas.sender == "me"){
                const containerInvisivelUsuario = document.createElement('div')
                containerInvisivelUsuario.classList.add('containerInvisivelUsuario')
                const conversaPropia = document.createElement('div')
                conversaPropia.classList.add('conversaPropia')
                const h1Usuario = document.createElement('h1')
                const pUsuarioHorario = document.createElement('p')
                const pUsuarioTexto = document.createElement('p')

                h1Usuario.textContent = itemConversas.sender
                pUsuarioHorario.textContent = itemConversas.time
                pUsuarioTexto.textContent = itemConversas.content

                conversaPropia.appendChild(h1Usuario)
                conversaPropia.appendChild(pUsuarioTexto)
                conversaPropia.appendChild(pUsuarioHorario)
    
                containerInvisivelUsuario.appendChild(conversaPropia)
                containerConversa.appendChild(containerInvisivelUsuario)
            }else{
                const containerInvisivelContato = document.createElement('div')
                containerInvisivelContato.classList.add('containerInvisivel')
                const conversaContato = document.createElement('div')
                conversaContato.classList.add('conversaContato')
                const h1Contato = document.createElement('h1')
                const pContatoHorario = document.createElement('p')
                const pContatoTexto = document.createElement('p')

                h1Contato.textContent = itemConversas.sender
                pContatoHorario.textContent = itemConversas.time
                pContatoTexto.textContent = itemConversas.content

                conversaContato.appendChild(h1Contato)
                conversaContato.appendChild(pContatoTexto)
                conversaContato.appendChild(pContatoHorario)
    
                containerInvisivelContato.appendChild(conversaContato)
                containerConversa.appendChild(containerInvisivelContato)
            }
        })
    })
}

async function criarLiDeContatos() {
    const dadosContatos = await contatosApi()

    const ul = document.getElementById('ulContato')

    dadosContatos.forEach(function(item){
        const liContato = document.createElement('li')
        liContato.classList.add('contatos')
        
        liContato.addEventListener('click', () => abrirConversa(item.nome))

        const divImage = document.createElement('div')
        divImage.classList.add('imgContato')
        
        const divTextosCont = document.createElement('div')
        divTextosCont.classList.add('textos')
        const h1ListaContato = document.createElement('h1')
        const pListaContato = document.createElement('p')

        h1ListaContato.textContent = item.nome
        pListaContato.textContent = item.descricao

        liContato.appendChild(divImage)
        divTextosCont.appendChild(h1ListaContato)
        divTextosCont.appendChild(pListaContato)
        liContato.appendChild(divTextosCont)
        ul.appendChild(liContato)
    })
}

// Inicializa a lista de contatos
document.addEventListener('DOMContentLoaded', () => {
    
    // Adiciona evento de envio de mensagem
    const enviarBtn = document.querySelector('.digitarConversa .enviar')
    enviarBtn.addEventListener('click', function() {
        const input = document.querySelector('.digitarConversa input')
        const mensagem = input.value.trim()
        if(mensagem) {
            // Aqui você pode adicionar a lógica para enviar a mensagem
            console.log('Mensagem a enviar:', mensagem)
            input.value = ''
        }
    })
})

criarLiDeContatos()