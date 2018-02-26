
var form = $('#search-form');

var search = $('#searchProducts');
let searchedForText;

form.submit(function(e) {
  e.preventDefault();
  searchedForText = search.val();
  getData();
});

function getData() {
  $.ajax({
    url: `https://api.mercadolibre.com/sites/MLA/search?q=${searchedForText}`,
    contentType: 'application/json',
    method: 'GET',
    success: function(response) {
      console.log(response.results);
      var result = response.results;

      $.each(result, function(index, obj) {
        $('.content').append(`
        <div class="card-deck">
          <div class="card col-xs-12 col-sm-4 col-md-4">
          <img class="card-img-top tam" src=${result[index].thumbnail}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${result[index].title}</h5>
            <p class="card-text">S/.${result[index].price}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted"><i class="fa  fa-2x fa-cart-plus" aria-hidden="true"></i></small>
            <a href="#" class="btn btn-default producto"  titulo="${result[index].title}" precio="${result[index].price}"role="button">Comprar</a>
          </div>
        </div>
        </div>`);
        console.log(result[index].title);
        // $('img.tam').attr('src', '');
        
        //  carro de compras
        paypal.minicart.render({
          strings: {
            button: 'Pagar'
            , buttonAlt: 'Total'
            , subtotal: 'Total:'
            , empty: 'No hay productos en el carrito'
          }
        });

        $('.producto').click(function(e) {
          e.stopPropagation();
          paypal.minicart.cart.add({
            business: 'test@gmail.com', // Cuenta paypal para recibir el dinero
            itemName: $(this).attr('titulo'),
            amount: $(this).attr('precio'),
            currencyCode: 'USD',
          });
        });
      });
    },
    fail: function(request) {
      if (request) {
        alert(request.message);
      }
    }
  });
}

$('#categorias').click(function() {
  getCategories();
});

function getCategories() {
  $.ajax({
    url: 'https://api.mercadolibre.com/sites/MLA/search?category=MLA1273',
    contentType: 'application/json',
    method: 'GET',
    success: function(response) {
      console.log(response);
    },
    fail: function(request) {
      if (request) {
        alert(request.message);
      }
    }
  });
}


