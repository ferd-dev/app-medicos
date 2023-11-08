export function solicitarConfirmacion(titulo, text = '', icono = 'warning', confirmButtonText = 'Si, eliminarlo!') {
    Swal.fire({
        title: titulo,
        text: text,
        icon: icono,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else {
            return false;
        }
    })
}

export function msotrarTostada(title, icon = 'success') {
    Swal.fire({
        position: 'top-end',
        icon:icon,
        title: title,
        showConfirmButton: false,
        timer: 1500
    })
}

export function mostrarTostadaPeuquenia(mensaje, icono = 'success') {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
      
    Toast.fire({
        icon: icono,
        title: mensaje
    })
}