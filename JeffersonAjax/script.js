






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

            resultado.querySelector('#pokemon-nome').innerText = pokemon.name

            resultado.querySelector('#pokemon-nome').innerText = pokemon.name

            resultado.querySelector('#pokemon-foto img').src = pokemon.sprites.other["official-artwork"].front_default

            resultado.querySelector('#pokemon-num').innerText = pokemon.id

            const tipos = document.querySelector("#pokemon-tipo")

            let i = 0

            tipos.replaceChildren()

            pokemon.types.forEach(element => {

                const tipo = document.createElement('span')

                tipo.innerText = pokemon.types[i].type.name

                tipos.appendChild(tipo)

                i++
                
            });

            resultado.querySelector('#altura').innerText = pokemon.height/10

            resultado.querySelector('#peso').innerText = pokemon.weight/10

            const atributos = document.querySelector("#pokemon-atributos")

            i = 0

            atributos.replaceChildren()

            pokemon.stats.forEach(element => {
                if( i == 0 || i == 1 || i == 2 || i == 5){

                    const atributo = createElement('div')

                    const atributoNome = createElememt('span')

                    const atributoValor = createElement('strong')

                    const atributoBarra = createElememt('progress')

                    atributoNome.innerText = pokemon.stats[i].stats.name

                    atributoValor.innerText = pokemon.stats[i].base_stat

                    atributoBarra.max = 255

                    atributoBarra.value = pokemon.stats[i].base_stat

                }
            });


            console.log(dados);
        })
        .catch((erro) => {
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
