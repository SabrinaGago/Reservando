var Reserva = function(fecha, cantPersonas, precioPorPersona, codigoDescuento) {
  this.fecha = fecha;
  this.cantPersonas = cantPersonas;
  this.precioPorPersona = precioPorPersona;
  this.codigoDescuento = codigoDescuento;
};

Reserva.prototype.calcularPrecioBase = function() {
  if (
    Number.isInteger(this.cantPersonas) &&
    this.cantPersonas >= 0 &&
    this.fecha != null &&
    this.precioPorPersona >= 0 &&
    Number.isInteger(this.precioPorPersona)
  ) {
    return this.cantPersonas * this.precioPorPersona;
  } else {
    return "Dato incorrecto";
  }
};

Reserva.prototype.descuentoPorCantidadGrupo = function(precio) {
  switch (true) {
    case this.cantPersonas < 4:
      return precio * 1;
    case this.cantPersonas >= 4 && this.cantPersonas <= 6:
      return precio * 0.95;
    case this.cantPersonas >= 7 && this.cantPersonas <= 8:
      return precio * 0.9;
    case this.cantPersonas > 8:
      return precio * 0.85;
  }
};

Reserva.prototype.beneficioCodigoDescuento = function(precio) {
  switch (this.codigoDescuento) {
    case "":
      return precio;
    case "DES1":
      return precio - this.precioPorPersona;
    case "DES15":
      return precio * 0.85;
    case "DES200":
      return precio <= 200 ? 0 : precio - 200;
  }
};

Reserva.prototype.adicionalHorarioYFecha = function(precio) {
  if (
    this.fecha.getDay() == 0 ||
    this.fecha.getDay() == 5 ||
    this.fecha.getDay() == 6
  ) {
    return this.fecha.getHours() == 13 || this.fecha.getHours() == 20
      ? precio * 1.15
      : precio * 1.1;
  } else {
    return this.fecha.getHours() == 13 || this.fecha.getHours() == 20
      ? precio * 1.05
      : precio;
  }
};

Reserva.prototype.adicionalFinDeSemana = function(precio) {
  return this.fecha.getDay() == 0 ||
    this.fecha.getDay() == 5 ||
    this.fecha.getDay() == 6
    ? precio * 1.1
    : precio;
};

Reserva.prototype.calcularPrecioFinal = function() {
  if (
    Number.isInteger(this.cantPersonas) &&
    this.cantPersonas >= 0 &&
    this.fecha != null &&
    this.precioPorPersona >= 0 &&
    Number.isInteger(this.precioPorPersona)
  ) {
    var precioFinal = this.calcularPrecioBase();
    precioFinal = this.beneficioCodigoDescuento(precioFinal);
    precioFinal = this.descuentoPorCantidadGrupo(precioFinal);
    precioFinal = this.adicionalHorarioYFecha(precioFinal);

    return precioFinal;
  } else {
    return "Dato incorrecto";
  }
};
