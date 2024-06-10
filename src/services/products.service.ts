import { db } from "@/lib";
import type { TProduct } from "@/types/product";

const collection = () => {
  return db.collection("products");
};

export const ProductsService = {
  getProducts: async function () {
    return collection()
      .get()
      .then((result) => {
        return result.forEach((doc) => doc.data());
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  },

  addProduct: async function (productData: TProduct) {
    return collection()
      .add(productData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },

  updateProduct: async function (id: string, productData: TProduct) {
    return collection()
      .doc(id)
      .update(productData)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  },

  getProduct: async function (id: string) {
    return collection()
      .doc(id)
      .get()
      .then((doc) => {
        return doc.exists ? doc.data() : null;
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },

  deleteProduct: async function (id: string) {
    return collection()
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  },
};
