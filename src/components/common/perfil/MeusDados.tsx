'use client'

import { useState } from 'react'
import { User, Mail, Edit3, Save, X } from 'lucide-react'

interface MeusDadosProps {
  data: {
    name: string
    email: string
  }
}

const MeusDados = ({ data }: MeusDadosProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(data.name)
  const [email, setEmail] = useState(data.email)

  const handleEdit = () => setIsEditing(true)
  const handleCancel = () => {
    setIsEditing(false)
    setName(data.name)
    setEmail(data.email)
  }
  const handleSave = async () => {
    console.log('Salvando:', { name, email })

    setIsEditing(false)
  }

  return (
    <div className=" bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Meus Dados</h2>
        <p className="text-sm text-gray-500">Gerencie suas informações pessoais</p>
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User size={16} />
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="seu@email.com"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 flex-1 justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <Save size={16} />
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <User size={18} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p className="text-gray-900 font-medium">{name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <Mail size={18} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900 font-medium">{email}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleEdit}
            className="flex items-center gap-2 w-full justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Edit3 size={16} />
            Editar Informações
          </button>
        </div>
      )}
    </div>
  )
}

export default MeusDados
