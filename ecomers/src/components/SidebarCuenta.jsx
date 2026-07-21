function SidebarCuenta({ vista, setVista }) {

    return (
        <aside className="sidebar">

            <h2>Mi Cuenta</h2>

            <button onClick={() => setVista("login")}>
                Iniciar sesión
            </button>

            <button onClick={() => setVista("registro")}>
                Registrarse
            </button>

            <button onClick={() => setVista("pedidos")}>
                Mis pedidos
            </button>

            <button onClick={() => setVista("favoritos")}>
                Favoritos
            </button>

        </aside>
    );
}

export default SidebarCuenta;