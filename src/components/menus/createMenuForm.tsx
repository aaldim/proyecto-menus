import { createMenu } from "@/actions/menu-actions";
import { Classifier, Client, WeekDay } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  clients: Client[];
  classifiers: Classifier[];
}

export const CreateMenuForm = ({ clients, classifiers }: Props) => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const extraCost = parseFloat(formData.get("extraCost") as string);
    const clientId = parseFloat(formData.get("clientId") as string);
    const dayOfWeek = formData.get("dayOfWeek") as WeekDay;

    await createMenu({
      name,
      extraCost,
      clientId,
      dayOfWeek: dayOfWeek,
    });
    redirect("/menus");
  };
  const isSubmitting = false;
  return (
    <>
      <form action={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="name"
          className="border rounded p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Costo Extra:</label>
        <input
          type="number"
          name="extraCost"
          className="border rounded p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Clasificador:</label>
        <select
          name="classifierId"
          className="border rounded p-2 w-full mb-4"
          required
        >
          <option value="">Selecciona un Clasificador</option>
          {classifiers.map((classifier) => (
            <option key={classifier.id} value={classifier.id}>
              {classifier.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Cliente:</label>
        <select
          name="clientId"
          className="border rounded p-2 w-full mb-4"
          required
        >
          <option value="">Selecciona un Cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Dia de la Semana:</label>
        <select
          name="dayOfWeek"
          className="border rounded p-2 w-full mb-4"
          required
        >
          <option value="">Selecciona un dia de la semana</option>
          <option key={WeekDay.MONDAY} value={WeekDay.MONDAY}>
            Lunes
          </option>
          <option key={WeekDay.TUESDAY} value={WeekDay.TUESDAY}>
            Martes
          </option>
          <option key={WeekDay.WEDNESDAY} value={WeekDay.WEDNESDAY}>
            Miercoles
          </option>
          <option key={WeekDay.THURSDAY} value={WeekDay.THURSDAY}>
            Jueves
          </option>
          <option key={WeekDay.FRIDAY} value={WeekDay.FRIDAY}>
            Viernes
          </option>
          <option key={WeekDay.SATURDAY} value={WeekDay.SATURDAY}>
            Sabado
          </option>
          <option key={WeekDay.SUNDAY} value={WeekDay.SUNDAY}>
            Domingo
          </option>
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </>
  );
};
