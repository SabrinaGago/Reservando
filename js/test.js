var expect = chai.expect;

describe('Reserva de horario', function(){

    it('Al reservar un horario, el mismo debería eliminarse del array', function () {
        const testHorarios = listado.restaurantes[0];
           testHorarios.reservarHorario('13:00');
           expect(testHorarios.horarios[0]).to.equal('15:30');
});

    it ('Al reservarse un horario inexsistente, el arreglo se mantiene igual', function (){
      const restaurantTest = listado.restaurantes[6];
          restaurantTest.reservarHorario('17:30');
          expect(restaurantTest.horarios[0]).to.equal('13:00');
          expect(restaurantTest.horarios[1]).to.equal('15:30');
          expect(restaurantTest.horarios[2]).to.equal('18:00');
          expect(restaurantTest.horarios.length).to.equal(3);
});

   it ('Al reservar un horario si no se le pasa ningún parámetro a la función, el arreglo se mantiene igual', function (){
       const testHorarios = listado.restaurantes[20];
          testHorarios.reservarHorario();
          expect(testHorarios.horarios.length).to.equal(3);
});

describe('Testear la función de puntuación', function(){

   it('Dado un restaurant el promedio de calificaciones se calcula correctamente', function(){
       const restauranteSeleccionado = listado.restaurantes[0];
          expect(listado.restaurantes[9].obtenerPuntuacion()).to.equal(6);
          expect(listado.restaurantes[19].obtenerPuntuacion()).to.equal(6);
});

  it('Dado un restaurant que no tiene puntuación, que ésta sea igual a cero', function(){
    listado.restaurantes[17].calificaciones = [];
         expect(listado.restaurantes[17].obtenerPuntuacion()).to.equal(0);
})
});

describe('Testear la función de calificación', function () {

    it('Solo pueden ser números', function () {
        let calificacionSeleccionada = 9;
        expect(calificacionSeleccionada).to.be.a('number');
})

    it("Si se ingresa una calificacion mayor/igual a 10 o menor/igual a 0 no altear la longitud del array", function(){
        const restauranteSeleccionado = listado.restaurantes[11];
            restauranteSeleccionado.calificar(12);
            restauranteSeleccionado.calificar(-3);
            expect(restauranteSeleccionado.calificaciones.length).to.equal(6);
})
});


describe ('Testeá la función buscarRestaurante', function (){

    it('Al pasar el id del resdevuelve el restaurante correcto', function() {
      const listadoRestaurantes = new Listado(listadoDeRestaurantes);
      expect(listadoRestaurantes.buscarRestaurante(5)).to.eql(
        listadoRestaurantes.restaurantes[4]);
});

    it('Al pasar un id no existente', function() {
          var restaurant = listado.buscarRestaurante(-1);
          expect(restaurant).to.be.an('string');
})
});

});

describe('Testeá la función obtenerRestaurantes para comprobar su funcionamiento', function () {

    it('Debería devolver un restaurante según los filtros elegidos', function () {
        let restauranteSeleccionado = listado.obtenerRestaurantes("Desayuno", "París","14:30");
        expect(restauranteSeleccionado[0].nombre).to.eql("Cafe Francoeur");
    })

    it("Si aplico solo un filtro devuelve la lista que corresponde", function() {
    var filtro = listado.obtenerRestaurantes(null, "Londres", null);
    var resultadoEsperado = 4;
    expect(filtro.length).to.equal(resultadoEsperado);
});
})

describe("Calcular de precio base de una reserva", function() {
  it("Calcular de precio base con todos los datos pasados correctamente", function() {
    var primeraReserva = new Reserva(new Date(2019, 11, 3, 15, 00), 4, 300, "");
    expect(primeraReserva.calcularPrecioBase()).to.equal(1200);
    var segundaReserva = new Reserva(new Date(2019, 11, 1, 13, 00), 2, 400, "");
    expect(segundaReserva.calcularPrecioBase()).to.equal(800);
    var terceraReserva = new Reserva(new Date(2019, 7, 24, 11, 00), 8, 350, "");
    expect(terceraReserva.calcularPrecioBase()).to.equal(2800);
    it("Calculo de precio base con datos incorrectos, devuelve error", function() {
      var cuartaReserva = new Reserva(
        new Date(2019, 11, 28, 14, 00),
        a,
        400,
        ""
      );
      var quintaReserva = new Reserva(
        new Date(2019, 11, 28, 14, 00),
        6,
        null,
        ""
      );
      var sextaReserva = new Reserva(null, 8, 800, "");
      expect(cuartaReserva.calcularPrecioBase()).to.equal("Dato incorrecto");
      expect(quintaReserva.calcularPrecioBase()).to.equal("Dato incorrecto");
      expect(sextaReserva.calcularPrecioBase()).to.equal("Dato incorrecto");
    });
  });
});

describe("Calcular precio final de reserva", function() {
  it("Calcular precio base con datos incorrectos, devuelve error", function() {
    var cuartaReserva = new Reserva(
      new Date(2019, 11, 28, 14, 00),
      "a",
      400,
      "DES15"
    );
    var quintaReserva = new Reserva(
      new Date(2019, 11, 28, 14, 00),
      6,
      null,
      ""
    );
    var sextaReserva = new Reserva(null, 8, 800, "");
    expect(cuartaReserva.calcularPrecioFinal()).to.be.equal("Dato incorrecto");
    expect(quintaReserva.calcularPrecioFinal()).to.be.equal("Dato incorrecto");
    expect(sextaReserva.calcularPrecioFinal()).to.be.equal("Dato incorrecto");
  });
  it("Calculo precio de reservas dia de semana, hora no pico, grupos < 4 c/ desc.", function() {
    var reserva1 = new Reserva(new Date(2019, 6, 24, 11, 00), 3, 350, "DES1");
    var reserva2 = new Reserva(
      new Date(2019, 6, 24, 15, 100),
      2,
      150,
      "DES200"
    );
    var reserva3 = new Reserva(new Date(2019, 6, 24, 16, 100), 1, 250, "DES15");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(3 * 350 - 350);
    expect(reserva2.calcularPrecioFinal()).to.be.equal(2 * 150 - 200);
    expect(reserva3.calcularPrecioFinal()).to.be.equal(1 * 250 * 0.85);
  });

  it("Calculo precio de reservas fin de semana, hora pico, grupos < a 4 con descuentos.", function() {
    var reserva1 = new Reserva(
      new Date(2019, 11, 29, 13, 00),
      2,
      400,
      "DES200"
    );
    expect(reserva1.calcularPrecioFinal()).to.be.equal((2 * 400 - 200) * 1.15);
  });
  it("Calcular reservas día de semana, hora no pico, grupos de 4 o menos s/dto", function() {
    var reserva1 = new Reserva(new Date(2019, 6, 23, 11, 00), 3, 400, "");
    var reserva2 = new Reserva(new Date(2019, 11, 24, 11, 00), 2, 150, "");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(3 * 400);
    expect(reserva2.calcularPrecioFinal()).to.be.equal(2 * 150);
});

  it("Calcular reservas día de semana, hora no pico, grupos de cuatro a seis c/dto", function() {
    var reserva1 = new Reserva(new Date(2019, 6, 23, 11, 00), 5, 400, "DES200");
    var reserva2 = new Reserva(new Date(2019, 11, 24, 11, 00), 5, 150, "DES1");
    expect(reserva1.calcularPrecioFinal()).to.be.equal((5 * 400 - 200) * 0.95);
    expect(reserva2.calcularPrecioFinal()).to.be.equal((5 * 150 - 150) * 0.95);
  });

  it("Calculo de precio de reservas fin de semana, hora pico, grupos de cuatro a seis sin descuento", function() {
    var reserva1 = new Reserva(new Date(2019, 11, 29, 13, 00), 5, 400, "");
    var reserva2 = new Reserva(new Date(2019, 11, 29, 13, 00), 5, 150, "");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(5 * 400 * 0.95 * 1.15);
    expect(reserva2.calcularPrecioFinal()).to.be.equal(5 * 150 * 0.95 * 1.15);
  });
  it("Calculo de precio de reservas fin de semana, hora no pico, grupos de cuatro a seis con descuento", function() {
    var reserva1 = new Reserva(
      new Date(2019, 11, 22, 11, 00),
      5,
      400,
      "DES200"
    );
    var reserva2 = new Reserva(new Date(2019, 11, 29, 11, 00), 5, 150, "DES15");
    expect(reserva1.calcularPrecioFinal()).to.be.equal(
      (5 * 400 - 200) * 0.95 * 1.1
    );
    expect(reserva2.calcularPrecioFinal()).to.be.equal(
      5 * 150 * 0.85 * 0.95 * 1.1
    );
  });


});
