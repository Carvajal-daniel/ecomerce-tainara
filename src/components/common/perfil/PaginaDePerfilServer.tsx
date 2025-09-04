import { db } from '@/db'
import MeusDados from './MeusDados'

const PaginaDePerfilServer = async () => {
  const personalData = await db.query.user.findFirst()

  if (!personalData) {
    return (
      <div className="flex items-center justify-center p-8 md:p-12 bg-gray-50">
        <p className="text-gray-600 text-center">Nenhum dado pessoal disponível</p>
      </div>
    )
  }

  return <MeusDados  data={{ name: personalData.name, email: personalData.email }} />
}

export default PaginaDePerfilServer
