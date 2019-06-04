const url = 'https://newsapi.org/v2/top-headlines?' +
          'sources=google-news-br&' +
          'apiKey=4b1a62ff6c404214ac7095c8a0135ae8';
window.addEventListener('load',pegarDados());
function pegarDados(){
    let req = new XMLHttpRequest();
    req.onload = function(){
        let dados = JSON.parse(req.responseText);
        
        console.log(dados.articles); 
        mostraNoticiaIndex(dados.articles);           
        setaNoticia(dados.articles);    
    };    
    req.open('GET',url,true);
    req.send();
}



function setaNoticia(dados){   
    //pegando os dados da url, no caso o id
    let query=window.location.search.substr(1).split('?');
    let id = query[0].split('=')[1]; 

    $( '.texto' ).html('');  
    let div =`                
            <div class="titulo-conteudo">
                <h2 id="anc">${dados[id].title}</h2>                   
            </div>              
            <div class="banner-conteudo">  
                <img  src="${dados[id].urlToImage}" alt="Banner referente a notícia.">
            </div>
            <article class="texto-conteudo">                    
                    <p class="noticia-conteudo">
                    ${dados[id].content}
                     </p>  
            </article>  
            `;
    $( '.texto' ).html(div);  
}

    

function mostraNoticiaIndex(dados){     
    /* Limpando os campos sempre que atualizar */  
    $( '.importante' ).html(''); 
    /* Setando a noticia de destaque */     
    $( '.importante' ).append( 
        `<img  src="${dados[0].urlToImage}" title="Clique no texto para ver mais" alt="Noticia"> 
            <div class="texto-dentro">
                <a href="../noticia1.html?id=0#anc">
                    <h2>${dados[0].title}</h2> 
                    <h5>${(dados[0].publishedAt.split('T')[0]).split('-')[2]+" - "+(dados[0].publishedAt.split('T')[0]).split('-')[1]+" - "+(dados[0].publishedAt.split('T')[0]).split('-')[0]}</h5>

                </a>
            </div>`
        );  
    /* Setando as noticias secundárias */

    for(let i = 1; i <dados.length-1;i+=2){  
        $( '.notindex'  ).append( 
            `
            <section class="sec-secundarias">
                <div class="div-noticia secundarias">
                    <a href="noticia1.html?id=${i}#anc">
                        <div class="imagem-noticia">
                            <img  src="${dados[i].urlToImage}" title="Clique na Imagem para ver mais" alt="Noticia">
                            <div class="texto-dentro"> 
                                <h2>${dados[i].description}</h2>
                                <h5>${(dados[i].publishedAt.split('T')[0]).split('-')[2]+" - "+(dados[i].publishedAt.split('T')[0]).split('-')[1]+" - "+(dados[i].publishedAt.split('T')[0]).split('-')[0]}</h5>
                            </div>  
                        </div> 
                    </a> 
                </div>
                <div class="div-noticia secundarias">
                    <a href="noticia1.html?id=${i+1}#anc">
                        <div class="imagem-noticia">
                            <img src="${dados[i+1].urlToImage}" title="Clique na Imagem para ver mais" alt="Noticia">
                        </div>
                            <div class="texto-dentro"> 
                                <h2>${dados[i+1].description}</h2>
                                <h5>${(dados[i+1].publishedAt.split('T')[0]).split('-')[2]+" - "+(dados[i+1].publishedAt.split('T')[0]).split('-')[1]+" - "+(dados[i+1].publishedAt.split('T')[0]).split('-')[0]}</h5>
                            </div>  
                        </div> 
                    </a> 
                </div>
            </section>
            `);    
    }
}

