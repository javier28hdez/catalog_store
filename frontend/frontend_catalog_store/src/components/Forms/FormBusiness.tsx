function FormBusiness() {
    return (
        <form className="flex flex-col">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="business_name" className="block mb-2.5 text-sm font-medium text-heading">Nombre del Negocio</label>
                    <input type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Peluqueria Josefa..." required />
                </div>
                <div>
                    <label htmlFor="eslogan" className="block mb-2.5 text-sm font-medium text-heading">Eslogan</label>
                    <input type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Innovación al alcance" required />
                </div>
                <div>
                    <label htmlFor="address" className="block mb-2.5 text-sm font-medium text-heading">Direccion de la Ubicacion del Negocio</label>
                    <input type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Calle A Entre Garcia Roco y Emiliano ..." required />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Numero Telefonico del Negocio</label>
                    <input type="tel" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="53462581" pattern="[0-9]{8}" required />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Correo Electronico del Negocio</label>
                <input type="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="peluqueria.doe@company.com" required />
            </div>
            <div className="mb-6">
                <label htmlFor="description" className="block mb-2.5 text-sm font-medium text-heading">Descripción del Negocio</label>
                <textarea id="description" rows={4} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Describe tu negocio, servicios que ofreces, horarios..." required></textarea>
            </div>
            <div className="mb-6">
                <label htmlFor="img_business" className="block mb-2.5 text-sm font-medium text-heading">Foto del Negocio</label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="img_business" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click para subir</span> o arrastra y suelta</p>
                            <p className="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 5MB)</p>
                        </div>
                        <input id="img_business" type="file" accept="image/*" className="hidden" />
                    </label>
                </div>
            </div>
            <button type="submit" className="text-white bg-sky-500 box-border border border-transparent hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Agregar</button>
        </form>
    )
}

export default FormBusiness
