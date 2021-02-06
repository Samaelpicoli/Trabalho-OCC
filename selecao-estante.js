function inicio(){

const navLendo = document.querySelector(".lendo");
const navQueroLer = document.querySelector(".queroLer");
const navLido = document.querySelector(".lido");
console.log(navLendo);

getMyBooks().then(function(data) {
    const books = data.books;
    $(".lendo").html("");
    $(".queroLer").html("");
    $(".lido").html("");
    books.forEach(function (book){ 

    let titulo = book.title
    let autor = book.authors
    let estante = book.shelf
    let idBook = book.id
    
    if(book.imageLinks && book.imageLinks.thumbnail) {
        imagem = book.imageLinks.thumbnail;
      }
      else{
        imagem = "https://www.pge.rs.gov.br/themes/modelo-noticias/images/outros/MD_imgSemImagem.png";
      }

    let listaItem = document.createElement("div");
    listaItem.classList.add("estilo-geral-card");
    listaItem.innerHTML = ` 
        <div class="card p-0 m-3 col-12 col-md-3 col-lg-6 borda">
            <img class="card-img-top card-image" id="cover-book"  src="${imagem}"
                alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title" id="title-book">${titulo}</h5>
                    <p class="card-text" id="author_book">${autor}</p>
                    <div class="option-book">
                    <select class="option-shelf" id="${idBook}">
                        <option >Mover para...</option>
                        <option value="currentlyReading" data-lendo>Lendo</option>
                        <option value="wantToRead" data-quero>Quero Ler</option>
                        <option value="read">Lido</option>
                        <option value="none">Remover</option>
                    </select>
                    </div>
                </div>
        </div>   `    
         //console.log(listaItem) 
        listaItem.id="book-" + idBook
        if(estante == "currentlyReading"){ 
            $(".lendo").append(listaItem)
        }
        if(estante == "wantToRead"){ 
            $(".queroLer").append(listaItem)
        } 
        if(estante == "read"){ 
            $(".lido").append(listaItem)
        }

         
    })
    
    
})
}

$('body').on('click' ,'#search-botao', function(event){ 
 
    event.preventDefault()
    $(".resultado-pesquisa").text("")
    var val = $('#search').val();

    searchBooks(val).then(function (data) {
        const books = data.books
            books.forEach(function (book) {
                
                let idBook = book.id
                let titulo = book.title
                let autor = book.authors
                let estante = book.shelf

                if (book.imageLinks && book.imageLinks.thumbnail) {
                    imagem = book.imageLinks.thumbnail;
                }
                else {
                    imagem = "https://www.pge.rs.gov.br/themes/modelo-noticias/images/outros/MD_imgSemImagem.png";
                }
                
                const listaItem = document.createElement("div");
                listaItem.classList.add("estilo-geral-card");
                listaItem.innerHTML = ` 
                <div class="card p-0 m-3 col-12 col-md-3 col-lg-6 borda">
                    <img class="card-img-top card-image" id="cover-book"  src="${imagem}"
                        alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title" id="title-book">${titulo}</h5>
                            <p class="card-text" id="author_book">${autor}</p>
                            <div class="option-book">
                            <select class="option-shelf" id="${idBook}">
                                <option >Mover para...</option>
                                <option value="currentlyReading" data-lendo>Lendo</option>
                                <option value="wantToRead" data-quero>Quero Ler</option>
                                <option value="read">Lido</option>
                                <option value="none">Remover</option>
                            </select>
                            </div>
                        </div>
                </div>   `
                listaItem.id="book-" + idBook
        
                $('.lido').hide()
                $('.lendo').hide() 
                $('.queroLer').hide()
                $(".resultado-pesquisa").append(listaItem)
            
          
            
        })   
    })
})

//Movendo Livros

$('body').on('change', ".option-shelf", function (event) {
    var selecionar = this.value;
    var idSelecionado = this.id; 
   
       console.log(idSelecionado);
       console.log(selecionar); 

       updateBook({id:idSelecionado}, selecionar).then(function(data) {
     //  document.querySelector("#book-"+idSelecionado).remove()
    inicio();
       })        
})