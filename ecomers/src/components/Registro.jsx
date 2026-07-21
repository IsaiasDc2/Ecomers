function Registro(){

    return(

        <form className="login">

            <h2>Crear cuenta</h2>

            <input placeholder="Nombre"/>

            <input
                type="email"
                placeholder="Correo"
            />

            <input
                type="password"
                placeholder="Contraseña"
            />

            <button>
                Registrarme
            </button>

        </form>

    )

}

export default Registro;