import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Upload, User, Pencil, Trash2, FileText, X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { saveList } from '../../data/dataManager';
import type { ElectoralList } from '../../types';
import { fileToBase64 } from '../../utils/fileHelpers';


interface MemberLocal {
  id: number;
  nombre: string;
  cargo: string;
}

export const MyListPage = () => {
  const navigate = useNavigate();

  // Estados del Formulario
  const [info, setInfo] = useState({
    nombreLista: '',
    slogan: '',
    propuestas: ''
  });

  const [members, setMembers] = useState<MemberLocal[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Estados Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempCargo, setTempCargo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Referencias Inputs
  const logoRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);

  // Manejadores
  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>, type: 'logo' | 'pdf') => {
    if (e.target.files?.[0]) {
      type === 'logo' ? setLogoFile(e.target.files[0]) : setPdfFile(e.target.files[0]);
    }
  };

  // CRUD Miembros
  const openModal = (member?: MemberLocal) => {
    if (member) {
      setEditingId(member.id);
      setTempName(member.nombre);
      setTempCargo(member.cargo);
    } else {
      setEditingId(null);
      setTempName('');
      setTempCargo('');
    }
    setIsModalOpen(true);
  };

  const saveMember = () => {
    if (!tempName || !tempCargo) return;
    if (editingId) {
      setMembers(members.map(m => m.id === editingId ? { ...m, nombre: tempName, cargo: tempCargo } : m));
    } else {
      setMembers([...members, { id: Date.now(), nombre: tempName, cargo: tempCargo }]);
    }
    setIsModalOpen(false);
  };

  const deleteMember = (id: number) => {
    if (confirm('¿Eliminar integrante?')) setMembers(members.filter(m => m.id !== id));
  };

  // GUARDADO PRINCIPAL
  const handleSubmit = async () => {
    if (!info.nombreLista) return alert('Ponle nombre a la lista');

    // 1. CONVERTIR ARCHIVOS A TEXTO (BASE64)
    let logoBase64 = undefined;
    let pdfBase64 = undefined;

    if (logoFile) {
      logoBase64 = await fileToBase64(logoFile);
    }
    
    if (pdfFile) {
      pdfBase64 = await fileToBase64(pdfFile);
    }

    // 2. CREAR EL OBJETO
    const newList: ElectoralList = {
      id: Date.now().toString(),
      nombre: info.nombreLista,
      tipo: 'Rectorado',
      anio: '2025',
      subtitulo: info.slogan || 'Sin slogan',
      descripcion: info.propuestas || 'Sin descripción',
      
      // Guardamos el PDF convertido dentro del objeto
      documentos: pdfFile && pdfBase64 ? [{ 
        titulo: "Plan de Gobierno", 
        desc: pdfFile.name,
        archivo: pdfBase64
      }] : [],
      
      integrantes: members.map(m => ({ nombre: m.nombre, cargo: m.cargo, anio: '2025' })),
      logo: logoBase64
    };

    saveList(newList);
    alert('¡Lista creada y documentos guardados!');
    navigate('/listas');
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-unsa-granate mb-6">Mi lista</h1>

        {/* 1. INFO GENERAL */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-unsa-granate mb-4">Información general</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-unsa-granate mb-1">Nombre de la lista</label>
            <input name="nombreLista" value={info.nombreLista} onChange={handleTextChange} className="w-full border-2 border-unsa-granate/20 rounded-lg p-2 bg-white" placeholder="Ej: Renovación..." />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-unsa-granate mb-1">Slogan</label>
            <input name="slogan" value={info.slogan} onChange={handleTextChange} className="w-full border-2 border-unsa-granate/20 rounded-lg p-2 bg-white" placeholder="Ej: Unidos por el cambio" />
          </div>

          {/* LOGO */}
          <input type="file" ref={logoRef} className="hidden" accept="image/*" onChange={(e) => handleFile(e, 'logo')} />
          <div onClick={() => logoRef.current?.click()} className="border-2 border-dashed border-unsa-granate rounded-lg p-8 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-100">
            {logoFile ? (
              <p className="font-bold text-unsa-granate">{logoFile.name}</p>
            ) : (
              <>
                <div className="bg-black text-white p-2 rounded mb-2"><Upload className="w-6 h-6" /></div>
                <p className="font-bold text-unsa-granate">Subir Logo</p>
                <span className="bg-gray-200 text-unsa-granate font-bold text-sm px-4 py-1 rounded mt-2">Selecciona Archivo</span>
              </>
            )}
          </div>
        </div>

        {/* 2. INTEGRANTES */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-unsa-granate">Integrantes</h2>
            <button onClick={() => openModal()} className="bg-unsa-azul text-white px-3 py-1 rounded flex items-center gap-1 text-sm"><Plus className="w-4 h-4" /> Agregar</button>
          </div>
          <div className="flex flex-col gap-3">
            {members.map(m => (
              <div key={m.id} className="bg-white border-2 border-unsa-granate/20 rounded-lg p-3 flex justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-gray-500" /></div>
                  <div><p className="font-bold text-unsa-granate text-sm">{m.nombre}</p><p className="text-xs text-gray-500">{m.cargo}</p></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal(m)}><Pencil className="w-4 h-4 text-gray-500" /></button>
                  <button onClick={() => deleteMember(m.id)}><Trash2 className="w-4 h-4 text-red-500" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. PROPUESTAS */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-unsa-granate mb-4">Propuestas</h2>
          <textarea name="propuestas" value={info.propuestas} onChange={handleTextChange} rows={4} className="w-full border-2 border-unsa-granate/20 rounded-lg p-3 bg-white mb-4" placeholder="Describe tus propuestas..." />
          
          <input type="file" ref={pdfRef} className="hidden" accept="application/pdf" onChange={(e) => handleFile(e, 'pdf')} />
          {!pdfFile ? (
            <button onClick={() => pdfRef.current?.click()} className="w-full border-2 border-dashed border-unsa-granate rounded-lg p-4 bg-white flex justify-center gap-2"><Upload className="w-5 h-5" /> Subir PDF</button>
          ) : (
            <div className="border-2 border-dashed border-unsa-granate rounded-lg p-3 flex justify-between bg-white items-center">
              <span className="flex items-center gap-2"><FileText className="text-red-500 w-5 h-5" /> {pdfFile.name}</span>
              <button onClick={() => setPdfFile(null)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
          )}
        </div>

        <button onClick={handleSubmit} className="w-full bg-unsa-granate text-white font-bold py-3 rounded-lg hover:bg-[#4a0f1e] transition-colors">Guardar Cambios</button>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="font-bold text-unsa-granate mb-4">{editingId ? 'Editar' : 'Nuevo'} Integrante</h3>
            <input className="w-full border p-2 rounded mb-3" placeholder="Nombre" value={tempName} onChange={e => setTempName(e.target.value)} />
            <select className="w-full border p-2 rounded mb-6 bg-white" value={tempCargo} onChange={e => setTempCargo(e.target.value)}>
              <option value="">Seleccionar Cargo</option>
              <option value="Rector">Rector</option>
              <option value="Vicerrector">Vicerrector</option>
              <option value="Decano">Decano</option>
              <option value="Asambleísta">Asambleísta</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button>
              <button onClick={saveMember} className="px-4 py-2 bg-unsa-granate text-white rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListPage;