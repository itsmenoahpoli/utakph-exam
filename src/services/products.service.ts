import { db } from "@/lib";
import type { TProduct } from "@/types/product";

export const ProductsService = {
  getProducts: async function () {
    const colRef = db.collection("products");

    return await colRef
      .get()
      .then((result) => {
        return result.forEach((doc) => doc.data());
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  },

  addProduct: async function (productData: TProduct) {
    const colRef = db.collection("products");

    colRef
      .add(productData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },

  updateProduct: async function (id: string, productData: TProduct) {
    const colRef = db.collection("products").doc(id);

    colRef
      .update(productData)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  },

  getProduct: async function (id: string) {
    const colRef = db.collection("products").doc(id);

    return colRef
      .get()
      .then((doc) => {
        return doc.exists ? doc.data() : null;
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },

  deleteProduct: async function (id: string) {
    const colRef = db.collection("products").doc(id);

    return colRef
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  },
};
