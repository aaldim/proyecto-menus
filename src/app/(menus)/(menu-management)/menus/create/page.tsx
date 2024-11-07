import { getClassifiers, getClients } from "@/actions";
import { CreateMenuForm } from '../../../../../components/menus/createMenuForm';

export default async function CrearMenuPage() {

  const clients = await getClients()
  const classifiers = await getClassifiers()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Menú</h1>
      <CreateMenuForm clients={clients} classifiers={classifiers} />
    </div>
  );
}
