import { UserAddress } from "@/types";

interface Props {
  address: UserAddress;
}

const DeliveryAddress = ({ address }: Props) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 space-y-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Endereço de Entrega</h2>
    <p className="font-medium text-gray-800">
      {address.rua}, {address.numero}
    </p>
    <p className="text-gray-500">
      {address.bairro}, {address.cidade} - {address.uf}
    </p>
    <p className="text-gray-500">CEP: {address.cep}</p>
  </div>
);

export default DeliveryAddress;
