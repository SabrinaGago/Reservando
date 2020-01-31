var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
  for (var i = 0; i < this.horarios.length; i++) {
    if (this.horarios[i] === horarioReservado) {
      this.horarios = this.horarios.filter(
        element => element != horarioReservado
      );
      return;
    }
  }
};

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function () {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return Math.round(this.promedio() * 10) / 10;
    }
}

Restaurant.prototype.sumar = function(calificaciones) {
var sumatoria = 0;
        for (var i = 0; i < calificaciones.length; i++) {
         sumatoria += calificaciones[i]
        }
    return sumatoria;
}

Restaurant.prototype.promedio = function(){
    var promedio = this.sumar(this.calificaciones) / this.calificaciones.length
     return promedio;
}
