import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Upload, User, Pencil, Trash2, FileText, X, Plus } from 'lucide-react';

// --- TIPOS DE DATOS ---
interface Member {
  id: number;
  nombre: string;
  cargo: string;
}

interface GeneralInfo {
  nombreLista: string;
  slogan: string;
  propuestas: string;
}

export const MyListPage = () => {
  // 1. ESTADOS PRINCIPALES
  const [info, setInfo] = useState<GeneralInfo>({
    nombreLista: 'Renovación Estudiantil',
    slogan: 'Unidos por un futuro mejor',
    propuestas: ''
  });

  const [members, setMembers] = useState<Member[]>([
    { id: 1, nombre: 'Juan Perez Garcia', cargo: 'Candidato a Rector' },
    { id: 2, nombre: 'María Lopez Torres', cargo: 'Candidata a Vicerectora' },
  ]);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // 2. ESTADOS PARA EL MODAL DE MIEMBROS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null); // null = nuevo, objeto = editar
  const [tempMemberName, setTempMemberName] = useState('');
  const [tempMemberCargo, setTempMemberCargo] = useState('');

  // 3. REFERENCIAS A INPUTS OCULTOS (Para subir archivos)
  const logoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // --- MANEJADORES DE INFORMACIÓN GENERAL ---
  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  // --- MANEJADORES DE ARCHIVOS ---
  const handleLogoClick = () => logoInputRef.current?.click();
  const handlePdfClick = () => pdfInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'logo' | 'pdf') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'logo') setLogoFile(file);
      else setPdfFile(file);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    if (pdfInputRef.current) pdfInputRef.current.value = '';
  };

  // --- LÓGICA DE MIEMBROS (CRUD) ---
  const openModal = (member?: Member) => {
    if (member) {
      // Modo Edición
      setCurrentMember(member);
      setTempMemberName(member.nombre);
      setTempMemberCargo(member.cargo);
    } else {
      // Modo Crear
      setCurrentMember(null);
      setTempMemberName('');
      setTempMemberCargo('');
    }
    setIsModalOpen(true);
  };

  const saveMember = () => {
    if (!tempMemberName || !tempMemberCargo) return alert("Completa los campos");

    if (currentMember) {
      // EDITAR EXISTENTE
      setMembers(members.map(m => 
        m.id === currentMember.id 
          ? { ...m, nombre: tempMemberName, cargo: tempMemberCargo } 
          : m
      ));
    } else {
      // CREAR NUEVO
      const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
      setMembers([...members, { id: newId, nombre: tempMemberName, cargo: tempMemberCargo }]);
    }
    setIsModalOpen(false);
  };

  const deleteMember = (id: number) => {
    if (confirm('¿Estás seguro de eliminar a este integrante?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  // --- GUARDADO FINAL (Simulación de Envío) ---
  const handleSubmit = () => {
    // Para enviar archivos e info al backend, se usa FormData
    const formData = new FormData();
    formData.append('nombre_lista', info.nombreLista);
    formData.append('slogan', info.slogan);
    formData.append('propuestas', info.propuestas);
    
    if (logoFile) formData.append('logo', logoFile);
    if (pdfFile) formData.append('plan_trabajo', pdfFile);

    // Los miembros suelen enviarse como string JSON
    formData.append('integrantes', JSON.stringify(members));

    // SIMULACIÓN DE ENVÍO
    console.log("--- ENVIANDO DATOS AL BACKEND ---");
    console.log("Info:", info);
    console.log("Logo:", logoFile?.name);
    console.log("PDF:", pdfFile?.name);
    console.log("Miembros:", members);
    
    alert("¡Datos guardados correctamente! (Revisa la consola para ver el payload)");
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-unsa-granate mb-6">Mi lista</h1>

        {/* 1. INFO GENERAL & LOGO */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-unsa-granate mb-4">Información general</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-unsa-granate mb-1">Nombre de la lista</label>
            <input 
              name="nombreLista"
              value={info.nombreLista}
              onChange={handleTextChange}
              className="w-full border-2 border-unsa-granate/20 rounded-lg p-2 focus:border-unsa-granate outline-none bg-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-unsa-granate mb-1">Slogan</label>
            <input 
              name="slogan"
              value={info.slogan}
              onChange={handleTextChange}
              className="w-full border-2 border-unsa-granate/20 rounded-lg p-2 focus:border-unsa-granate outline-none bg-white"
            />
          </div>

          {/* SUBIDA DE LOGO */}
          <input 
            type="file" 
            ref={logoInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'logo')}
          />
          <div 
            onClick={handleLogoClick}
            className="border-2 border-dashed border-unsa-granate rounded-lg p-8 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-100 transition relative overflow-hidden"
          >
            {logoFile ? (
              <div className="flex flex-col items-center z-10">
                 {/* Previsualización simple de imagen */}
                 <img src={URL.createObjectURL(logoFile)} alt="Preview" className="h-20 w-20 object-contain mb-2 rounded shadow" />
                 <p className="font-bold text-unsa-granate">{logoFile.name}</p>
                 <span className="text-xs text-blue-500">Clic para cambiar</span>
              </div>
            ) : (
              <>
                <div className="bg-black text-white p-2 rounded mb-2"><Upload className="w-6 h-6" /></div>
                <p className="font-bold text-unsa-granate">Subir Logo</p>
                <p className="text-xs text-gray-400 mb-3">Arrastra o selecciona un archivo (PNG, JPG)</p>
                <span className="bg-gray-200 text-unsa-granate font-bold text-sm px-4 py-1 rounded">Selecciona Archivo</span>
              </>
            )}
          </div>
        </div>

        {/* 2. INTEGRANTES */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-unsa-granate">Integrantes</h2>
            <button 
              onClick={() => openModal()}
              className="flex items-center gap-1 text-sm bg-unsa-azul text-white px-3 py-1 rounded hover:bg-blue-900 transition"
            >
              <Plus className="w-4 h-4" /> Agregar
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            {members.map((miembro) => (
              <div key={miembro.id} className="bg-white border-2 border-unsa-granate/20 rounded-lg p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-unsa-granate text-sm">{miembro.nombre}</p>
                    <p className="text-xs text-gray-500">{miembro.cargo}</p>
                  </div>
                </div>
                <div className="flex gap-2 text-gray-500">
                  <button onClick={() => openModal(miembro)} className="hover:text-unsa-granate p-1 transition"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => deleteMember(miembro.id)} className="hover:text-red-600 p-1 transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            {members.length === 0 && <p className="text-gray-400 text-center text-sm">No hay integrantes.</p>}
          </div>
        </div>

        {/* 3. PROPUESTAS & PDF */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-unsa-granate mb-4">Propuestas y plan de trabajo</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-unsa-granate mb-1">Resumen de propuestas</label>
            <textarea 
              name="propuestas"
              rows={4}
              value={info.propuestas}
              onChange={handleTextChange}
              placeholder="Describe brevemente las principales propuestas..."
              className="w-full border-2 border-unsa-granate/20 rounded-lg p-3 focus:border-unsa-granate outline-none bg-white resize-none"
            ></textarea>
          </div>

          {/* SUBIDA DE PDF */}
          <input 
            type="file" 
            ref={pdfInputRef} 
            className="hidden" 
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, 'pdf')}
          />
          <div>
            <label className="block text-sm font-bold text-unsa-granate mb-1">Plan de gobierno (PDF)</label>
            {!pdfFile ? (
               <button 
                 onClick={handlePdfClick}
                 className="w-full border-2 border-dashed border-unsa-granate rounded-lg p-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-500 font-medium"
               >
                 <Upload className="w-5 h-5" /> Seleccionar PDF
               </button>
            ) : (
              <div className="border-2 border-dashed border-unsa-granate rounded-lg p-3 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <FileText className="text-red-500 w-5 h-5" />
                  <span className="text-sm font-bold text-gray-700">{pdfFile.name}</span>
                </div>
                <button onClick={removePdf} className="text-gray-500 hover:text-red-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BOTÓN GUARDAR */}
        <button 
          onClick={handleSubmit}
          className="w-full bg-unsa-granate text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#4a0f1e] transition-colors"
        >
          Guardar Cambios
        </button>
      </div>

      {/* --- MODAL FLOTANTE PARA AGREGAR/EDITAR MIEMBRO --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-xl font-bold text-unsa-granate mb-4">
              {currentMember ? 'Editar Integrante' : 'Nuevo Integrante'}
            </h3>
            
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-1">Nombre Completo</label>
              <input 
                type="text" 
                value={tempMemberName}
                onChange={(e) => setTempMemberName(e.target.value)}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-unsa-azul outline-none"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-1">Cargo</label>
              <select 
                value={tempMemberCargo}
                onChange={(e) => setTempMemberCargo(e.target.value)}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-unsa-azul outline-none bg-white"
              >
                <option value="">Selecciona un cargo</option>
                <option value="Candidato a Rector">Candidato a Rector</option>
                <option value="Candidato a Vicerector">Candidato a Vicerector</option>
                <option value="Candidato a Decano">Candidato a Decano</option>
                <option value="Asamblea Universitaria">Asamblea Universitaria</option>
                <option value="Consejo Universitario">Consejo Universitario</option>
              </select>
            </div>

            <div className="flex gap-2 justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancelar
              </button>
              <button 
                onClick={saveMember}
                className="px-4 py-2 bg-unsa-granate text-white rounded hover:bg-[#4a0f1e]"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyListPage;