'use client'

import { useEffect, useState } from 'react'
import { User, Mail, Phone, IdCard, Edit3, Save, X, MapPin, Building } from 'lucide-react'
import toast from 'react-hot-toast'
import { authClient } from '@/lib/auth-client'

interface MeusDadosProps {
  data: {
    id: string
    name: string
    email: string
    phone?: string
    cpf?: string
    cep?: string
    rua?: string
    bairro?: string
    cidade?: string
    uf?: string
    numero?: string
  }
}

const MeusDados = ({ data }: MeusDadosProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(data.name)
  const [email, setEmail] = useState(data.email)
  const [phone, setPhone] = useState(data.phone ?? '')
  const [cpf, setCpf] = useState(data.cpf ?? '')
  const [cep, setCep] = useState(data.cep ?? '')
  const [rua, setRua] = useState(data.rua ?? '')
  const [bairro, setBairro] = useState(data.bairro ?? '')
  const [cidade, setCidade] = useState(data.cidade ?? '')
  const [uf, setUf] = useState(data.uf ?? '')
  const [numero, setNumero] = useState(data.numero ?? '')

  const handleEdit = () => setIsEditing(true)
  const handleCancel = () => {
    setIsEditing(false)
    setName(data.name)
    setEmail(data.email)
    setPhone(data.phone ?? '')
    setCpf(data.cpf ?? '')
    setCep(data.cep ?? '')
    setRua(data.rua ?? '')
    setBairro(data.bairro ?? '')
    setCidade(data.cidade ?? '')
    setUf(data.uf ?? '')
    setNumero(data.numero ?? '')
  }

  useEffect(() => {
    setName(data.name)
    setEmail(data.email)
    setPhone(data.phone ?? '')
    setCpf(data.cpf ?? '')
    setCep(data.cep ?? '')
    setRua(data.rua ?? '')
    setBairro(data.bairro ?? '')
    setCidade(data.cidade ?? '')
    setUf(data.uf ?? '')
    setNumero(data.numero ?? '')
  }, [data])

  const formatCpf = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '')
    if (cleanedValue.length <= 3) return cleanedValue
    if (cleanedValue.length <= 6) return `${cleanedValue.slice(0,3)}.${cleanedValue.slice(3)}`
    if (cleanedValue.length <= 9) return `${cleanedValue.slice(0,3)}.${cleanedValue.slice(3,6)}.${cleanedValue.slice(6)}`
    return `${cleanedValue.slice(0,3)}.${cleanedValue.slice(3,6)}.${cleanedValue.slice(6,9)}-${cleanedValue.slice(9,11)}`
  }

  const formatPhone = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '')
    if (cleanedValue.length <= 2) return `(${cleanedValue}`
    if (cleanedValue.length <= 7) return `(${cleanedValue.slice(0,2)}) ${cleanedValue.slice(2)}`
    if (cleanedValue.length <= 10) return `(${cleanedValue.slice(0,2)}) ${cleanedValue.slice(2,6)}-${cleanedValue.slice(6)}`
    return `(${cleanedValue.slice(0,2)}) ${cleanedValue.slice(2,7)}-${cleanedValue.slice(7,11)}`
  }
  
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCep = e.target.value.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
    setCep(maskedCep);
  };
  
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => setCpf(formatCpf(e.target.value))
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(formatPhone(e.target.value))

  const handleCepBlur = async () => {
    const cleanedCep = cep.replace(/\D/g, '')
    if (cleanedCep.length !== 8) {
      toast.error('CEP inválido')
      return
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)
      const data = await res.json()
      if (data.erro) {
        toast.error('CEP não encontrado')
        return
      }
      setRua(data.logradouro)
      setBairro(data.bairro)
      setCidade(data.localidade)
      setUf(data.uf)
      toast.success("Endereço preenchido!")
    } catch (err) {
      console.error(err)
      toast.error('Erro ao buscar endereço')
    }
  }

const handleSave = async () => {
  try {
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        id: data.id, // já vem das props
        name, email, phone, cpf, cep, rua, bairro, cidade, uf, numero
      }),
    })

    const resData = await res.json()
    if (!res.ok) {
      toast.error(resData.error || "Erro ao atualizar")
      return
    }
    toast.success("Dados atualizados!")
    setIsEditing(false)
  } catch (err) {
    console.error(err)
    toast.error("Erro de rede")
  }
}


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Meus Dados</h2>
        <p className="text-sm text-gray-500">Gerencie suas informações pessoais</p>
      </div>

      {isEditing ? (
        <div className="space-y-6">
          {/* ... (campos de nome, email, telefone e CPF, que não mudaram) ... */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User size={16} /> Nome
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Seu nome completo"/>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail size={16} /> Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="seu@email.com"/>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Phone size={16} /> Telefone
            </label>
            <input type="tel" value={phone} onChange={handlePhoneChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="(11) 98765-4321"/>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <IdCard size={16} /> CPF
            </label>
            <input type="text" value={cpf} onChange={handleCpfChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="000.000.000-00"/>
          </div>
          
          {/* Novos campos de endereço */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin size={16} /> CEP
            </label>
            <input type="text" value={cep} onChange={handleCepChange} onBlur={handleCepBlur} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="00000-000" maxLength={9} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Building size={16} /> Rua e Bairro
              </label>
              <input type="text" value={rua} onChange={e => setRua(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Rua, Bairro" />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Building size={16} /> Número
              </label>
              <input type="text" value={numero} onChange={e => setNumero(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nº" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin size={16} /> Cidade
              </label>
              <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cidade" />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin size={16} /> Estado (UF)
              </label>
              <input type="text" value={uf} onChange={e => setUf(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="UF" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="flex items-center gap-2 flex-1 justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"><Save size={16}/> Salvar</button>
            <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"><X size={16}/> Cancelar</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {/* ... (campos de visualização de dados, que não mudaram) ... */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg"><User size={18} className="text-blue-600"/></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-500">Nome</p><p className="text-gray-900 font-medium">{name}</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg"><Mail size={18} className="text-green-600"/></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-500">Email</p><p className="text-gray-900 font-medium">{email}</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg"><Phone size={18} className="text-yellow-600"/></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-500">Telefone</p><p className="text-gray-900 font-medium">{phone || 'Não informado'}</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg"><IdCard size={18} className="text-purple-600"/></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-500">CPF</p><p className="text-gray-900 font-medium">{cpf || 'Não informado'}</p></div>
            </div>

            {/* Campos de endereço em visualização */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg"><MapPin size={18} className="text-indigo-600"/></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-500">Endereço</p><p className="text-gray-900 font-medium">{`${rua}, ${numero}, ${bairro}, ${cidade} - ${uf}` || 'Não informado'}</p></div>
            </div>
          </div>
          <button onClick={handleEdit} className="flex items-center gap-2 w-full justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"><Edit3 size={16}/> Editar Informações</button>
        </div>
      )}
    </div>
  )
}

export default MeusDados