import prisma from "@/lib/prisma";
import { ClassifierType } from "@prisma/client";

export async function getClassifiers() {
  return await prisma.classifier.findMany();
}

export async function createClassifier(data: { name: string; type: string }) {
  return await prisma.classifier.create({
    data: {
      ...data,
      type: data.type as ClassifierType,
    },
  });
}

export async function getClassifierById(id: number) {
  return await prisma.classifier.findUnique({
    where: { id },
  });
}

export async function updateClassifier(
  id: number,
  data: { name: string; type: string }
) {
  return await prisma.classifier.update({
    where: { id },
    data: {
      ...data,
      type: data.type as ClassifierType,
    },
  });
}

// Acción para eliminar un clasificador por ID
export async function deleteClassifier(id: number) {
    try {
      return await prisma.classifier.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error al eliminar el clasificador:", error);
      throw new Error("Error al eliminar el clasificador");
    }
  }