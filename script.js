$(function(){
  
  $('#toggle-categorias').on('click', function(){
    $('#categorias-lista').slideToggle(200);
    var txt = $('#toggle-text').text();
    $('#toggle-text').text(txt.includes('más') ? 'ver menos ↑' : 'ver más ↓');
  });

  $('#toggle-Smartphones').on('click', function(){
    $('#Smartphones-lista').slideToggle(200);
    var txt2 = $('#toggle-text-2').text();
    $('#toggle-text-2').text(txt2.includes('más') ? 'ver menos ↑' : 'ver más ↓');
  });

  const $price = $('.price').first();
  const originalPrice = $price.text();
  $('#B_trans').on('click', function(){
    if ($price.text() === originalPrice) {
      const nuevo = originalPrice.replace(/([0-9]+\.?[0-9]*)/, num =>
        (parseFloat(num) * 0.9).toFixed(2)
      );
      $price.text(nuevo + " (¡Oferta!)");
    } else {
      $price.text(originalPrice);
    }
  });

  $('#B_append').on('click', function(){
    const url = $('#input').val().trim();
    if (url) {
      $('#img').append(
        `<img src="${url}" alt="img" style="width:120px; height:auto; border-radius:8px;">`
      );
      $('#input').val('');
    }
  });
//Modo Oscuro
  const $btn = $('#theme-toggle');
  const DARK_CLASS = 'dark-mode';
  if (localStorage.getItem('dark') === 'true') {
    $('body').addClass(DARK_CLASS);
    $btn.text('☀️');
  }
  $btn.on('click', function(){
    $('body').toggleClass(DARK_CLASS);
    const isDark = $('body').hasClass(DARK_CLASS);
    $btn.text(isDark ? '☀️' : '🌙');
    localStorage.setItem('dark', isDark);
  });


  // Obtiene el carrito del localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  // Guarda el carrito en localStorage
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Añadir o incrementar producto
  window.addToCart = function(id, name, price) {
    let cart = getCart();
    let found = cart.find(p => p.id === id);
    if(found) {
      found.qty += 1;
    } else {
      cart.push({id, name, price, qty: 1});
    }
    saveCart(cart);
    alert(`"${name}" agregado al carrito.`);
  };

  // Renderizar tabla del carrito
  function renderCartTable() {
    if (!$('#cart-body').length) return;
    let cart = getCart();
    let html = '';
    let total = 0;
    cart.forEach(product => {
      let subtotal = product.price * product.qty;
      total += subtotal;
      html += `
        <tr data-id="${product.id}">
          <td>${product.name}</td>
          <td><input type="number" class="quantity" min="1" value="${product.qty}"></td>
          <td class="unit-price">${product.price.toFixed(2)}</td>
          <td class="subtotal">${subtotal.toFixed(2)}</td>
          <td><button class="remove-item">❌</button></td>
        </tr>
      `;
    });
    $('#cart-body').html(html);
    $('#cart-total').text(total.toFixed(2));
  }

  // Cambiar cantidad en carrito
  $('#cart-body').on('input', '.quantity', function(){
    let id = $(this).closest('tr').data('id');
    let cart = getCart();
    let prod = cart.find(p => p.id === id);
    if (prod) prod.qty = parseInt($(this).val(),10) || 1;
    saveCart(cart);
    renderCartTable();
  });

  // Eliminar producto en carrito
  $('#cart-body').on('click', '.remove-item', function(){
    let id = $(this).closest('tr').data('id');
    let cart = getCart().filter(p => p.id !== id);
    saveCart(cart);
    renderCartTable();
  });

  // Renderizar tabla al entrar a cart.html
  renderCartTable();

  // Vincular todos los botones “LO QUIERO!”
  $('.btn-add').on('click', function(){
    const id    = $(this).data('id');
    const name  = $(this).data('name');
    const price = parseFloat($(this).data('price'));
    addToCart(id, name, price);
  });

});
