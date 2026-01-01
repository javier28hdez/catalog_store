import FormRegister from "@/components/Forms/FormRegister"

function Register() {
    return (
        <main className="m-auto w-1/2 h-lvh">
            <div className="grid grid-row-2 bg-sky-400 justify-items-center items-center w-full h-full rounded-xl">
                <div className="row-span-1 text-white text-3xl mt-4">Registrate en la Plataforma</div>
                <div className="row-span-1 w-5/6 bg-white rounded-sm shadow-sm border-1">
                    <FormRegister />
                </div>
            </div>
        </main>
    )
}

export default Register
