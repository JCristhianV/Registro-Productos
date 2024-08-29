document.addEventListener("DOMContentLoaded", function () {
    // Cargar opciones de Bodega, Sucursal y Moneda desde la base de datos
    cargarBodegas();
     // Evento para cargar sucursales cuando se seleccione una bodega
    document.getElementById('bodega').addEventListener('change', function () {
      cargarSucursales(this.value);
    });

    // Cargar Monedas al iniciar la página
    cargarMonedas();

    const objectToFormData = (obj) => {
      const formData = new FormData();
      Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
      });
      return formData;
    }
    const cleanForm = () => {
      document.getElementById("codigo").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("precio").value = "";
      document.getElementById("bodega").value = "";
      document.getElementById("sucursal").value = "";
      document.getElementById("moneda").value = "";
      document.getElementById("descripcion").value = "";
      document.querySelectorAll("input[name='material']").forEach(checkbox => checkbox.checked = false);
    }
    document.getElementById("productForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Validaciones en el frontend
      if (!validateForm()) return;
  
      const { codigo, nombre, precio, bodega, sucursal, moneda, descripcion } = this;
  
      // const checkboxHtmlForm = this.querySelectorAll("input[name='material']");
  
      const checkboxValue = Array.from(this.querySelectorAll("input[name='material']:checked")).map(checkbox => checkbox.value);
  
      const form = {
        codigo: codigo.value,
        nombre: nombre.value,
        precio: precio.value,
        bodega: bodega.value,
        sucursal: sucursal.value,
        moneda: moneda.value,
        descripcion: descripcion.value,
        material: checkboxValue.join(", ")
      }
      console.log({ form })
      // Enviar datos por AJAX
      var formData = objectToFormData(form);
  
      fetch("guardar_producto.php", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log({ data })
          if (data.success) {
            alert("Producto guardado exitosamente.");
            cleanForm()
          } else {
            alert("Error al guardar el producto: " + data.message);
          }
        })
        .catch(error => console.error("Error:", error));
    });
  });
  
  function cargarBodegas() {
    fetch('cargar_datos.php?action=getBodegas')
        .then(response => response.json())
        .then(data => {
            const bodegaSelect = document.getElementById('bodega');
            data.forEach(bodega => {
                const option = document.createElement('option');
                option.value = bodega.id;
                option.textContent = bodega.nombre;
                bodegaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar bodegas:', error));
  }

  function cargarSucursales(bodegaId) {
    fetch(`cargar_datos.php?action=getSucursales&bodegaId=${bodegaId}`)
        .then(response => response.json())
        .then(data => {
            const sucursalSelect = document.getElementById('sucursal');
            sucursalSelect.innerHTML = '<option value="">Seleccione una sucursal</option>'; // Resetear opciones
            data.forEach(sucursal => {
                const option = document.createElement('option');
                option.value = sucursal.id;
                option.textContent = sucursal.nombre;
                sucursalSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar sucursales:', error));
}

function cargarMonedas() {
    fetch('cargar_datos.php?action=getMonedas')
        .then(response => response.json())
        .then(data => {
            const monedaSelect = document.getElementById('moneda');
            data.forEach(moneda => {
                const option = document.createElement('option');
                option.value = moneda.id;
                option.textContent = `${moneda.nombre} (${moneda.simbolo})`;
                monedaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar monedas:', error));
}

function verificarCodigoExistente() {
  const codigo = document.getElementById('codigo').value.trim();


  fetch(`verificar_codigo.php?codigo=${codigo}`)
      .then(response => response.json())
      .then(data => {
          if (data.exists) {
            alert('El código del producto ya está registrado.');
          }
      })
      .catch(error => console.error('Error al verificar el código:', error));
}
  
  function validateForm() {
    var codigo = document.getElementById("codigo").value.trim();
    var nombre = document.getElementById("nombre").value.trim();
    var precio = document.getElementById("precio").value.trim();
    var materiales = document.querySelectorAll("input[name='material']:checked");
    var descripcion = document.getElementById("descripcion").value.trim();
    var bodega = document.getElementById("bodega");
    var sucursal = document.getElementById("sucursal");
    var moneda = document.getElementById("moneda");

    let codigoRegex =  /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    if (!codigo) {
      alert("El código del producto no puede estar en blanco.");
      return false;
    }else if (!codigoRegex.test(codigo)) {
      alert("El código del producto debe contener letras y números.");
      return false;
    }else if (!codigo || codigo.length < 5 || codigo.length > 15) {
      alert("El código del producto debe tener entre 5 y 15 caracteres. ");
      return false;
    }

    if (!nombre) {
      alert("El nombre del producto no puede estar en blanco.");
      return false;
    }else if (!nombre || nombre.length < 2 || nombre.length > 50) {
      alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
      return false;
    }
    
    let precioRegex = /^\d+(\.\d{1,2})?$/;
    if (!precio) {
      alert("El precio del producto no puede estar en blanco.");
      return false;
    }else if (!precio || !precioRegex.test(precio)) {
      alert("El precio del producto debe ser un número positivo con hasta dos decimales.");
      return false;
    }

    if (materiales.length < 2) {
      alert("Debe seleccionar al menos dos materiales para el producto.");
      return false;
    }

    if (bodega.selectedIndex === 0) {
      alert("Debe seleccionar una bodega. ");
      return false;
    }

    if (sucursal.selectedIndex === 0) {
      alert("Debe seleccionar una sucursal para la bodega seleccionada. ");
      return false;
    }

    if (moneda.selectedIndex === 0) {
      alert("Debe seleccionar una moneda para el producto.");
      return false;
    }
  
    if (!descripcion) {
      alert("La descripción del producto no puede estar en blanco.");
      return false;
    }else if (descripcion.length < 10 || descripcion.length > 1000) {
      alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
      return false;
    }
  
    return true;
  }