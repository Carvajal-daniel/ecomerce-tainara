

import MeusDados from '@/components/common/MeusDados';
import React from 'react';

const PaginaDePerfil: React.FC = () => {
  // Dados de exemplo, que devem ter o tipo "MeusDadosProps"
  const dadosDoUtilizador = {
    nome: "Ana Santos",
    email: "ana.santos@exemplo.com",
    dataNascimento: "10/12/1985",
    morada: "Rua do Comércio, 45, Porto"
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-700">A Minha Conta</h1>
      <MeusDados
        nome={dadosDoUtilizador.nome}
        email={dadosDoUtilizador.email}
        dataNascimento={dadosDoUtilizador.dataNascimento}
        morada={dadosDoUtilizador.morada}
      />
    </div>
  );
};

export default PaginaDePerfil;