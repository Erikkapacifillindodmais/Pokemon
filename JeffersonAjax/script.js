






const formulario = document.querySelector("form")

const resultado = document.querySelector(".resultado")

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let nome = formulario.elements["Nome"].value.trim();

    if(nome === ''){

        formulario.elements['Nome'].value = ''
        formulario.elements['Nome'].placeholder = 'Informe nome'

        return;

    }

    buscarPokemon(nome)
        .then((dados) => {
            let pokemon = dados;

            let nome = pokemon.name

            nome = nome.charAt(0).toUpperCase() + nome.slice(1);

            resultado.querySelector('#pokemon-nome').innerText = nome

            resultado.querySelector('#pokemon-foto img').src = pokemon.sprites.other["official-artwork"].front_default

            resultado.querySelector('#pokemon-num').innerText = '#' + pokemon.id

            const tipos = document.querySelector("#pokemon-tipo")

            tipos.replaceChildren()

            pokemon.types.forEach(element => {

                const tipo = document.createElement('span')

                tipo.innerText = element.type.name
                tipo.classList.add(element.type.name)

                tipos.appendChild(tipo)
                
            });

            resultado.querySelector('#Altura').innerText = pokemon.height/10 + ' m'

            resultado.querySelector('#Peso').innerText = pokemon.weight/10 + ' kg'

            const atributos = document.querySelector("#pokemon-atributos")

            atributos.replaceChildren()

            pokemon.stats.forEach(element => {
                if( element.stat.name === 'hp' || element.stat.name === 'attack' || element.stat.name === 'defense' || element.stat.name === 'speed'){

                    const atributo = document.createElement('div')

                    atributo.classList.add('pokemon-atributo')

                    const atributoNome = document.createElement('span')

                    const atributoValor = document.createElement('strong')

                    const atributoBarra = document.createElement('progress')

                    atributo.classList.add(element.stat.name)

                    atributoNome.innerText = element.stat.name + ':'

                    atributoValor.innerText = element.base_stat

                    atributoBarra.max = 255

                    atributoBarra.value = element.base_stat

                    atributo.appendChild(atributoNome)
                    atributo.appendChild(atributoValor)
                    atributo.appendChild(atributoBarra)

                    atributos.appendChild(atributo)

                }



            });

            resultado.querySelector('#status').classList.remove('invisivel')
            
            console.log(dados);
        })
        .catch((erro) => {

            resultado.querySelector('#pokemon-nome').innerText = 'Erro pokemon ' + formulario.elements["Nome"].value.trim() + ' não encontrado...';

            console.log(erro.message);
        });
});

function buscarPokemon(nome) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
    .then((resposta) => {
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }

        return resposta.json();
    });
}
