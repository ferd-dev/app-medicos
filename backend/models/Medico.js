class Medico{
    constructor(id, usuario_id, especialidad_id, fotografia, sexo, anios_experiencia, fecha_nacimiento, pais, departamento, ciudad, direccion, telefono, licencia, verificado, estado){
        this.id = id;
        this.usuario_id = usuario_id;
        this.especialidad_id = especialidad_id;
        this.fotografia = fotografia;
        this.sexo = sexo;
        this.anios_experiencia = anios_experiencia;
        this.fecha_nacimiento = fecha_nacimiento;
        this.pais = pais;
        this.departamento = departamento;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.telefono = telefono;
        this.licencia = licencia;
        this.verificado = verificado;
        this.estado = estado;
    }
}

module.exports = Medico;
