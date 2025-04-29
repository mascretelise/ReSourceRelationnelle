"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import ModifCategory from "./formModifCategory";

export default function ActionsCategorie() {
  const [category, setCategory] = useState<
    { cat_ucid: string; cat_nom: string }[]
  >([]);
  const [formCatId, setFormCatId] = useState<string | null>(null);
  const [formCat, setFormCat] = useState<string | null>(null);

  const fetchData = async () => {
    const getCategory = await fetch(
      `http://localhost:3000/api/category/readCategory`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await getCategory.json();
    const categories = result.map(
      (item: { cat_ucid: string; cat_nom: string }) => ({
        cat_ucid: item.cat_ucid,
        cat_nom: item.cat_nom,
      })
    );

    setCategory(categories);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitDelete = async (category: string) => {
    console.log(category);
    const response = await fetch(
      `http://localhost:3000/api/category/removeCategory?category=${category}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      alert("La suppression a échoué");
      return;
    }

    alert("La catégorie a bien été supprimée");

    // Actualiser la liste
    fetchData();
  };

  return (
    <>
      <h1>Tableau de catégories</h1>
      <ul>
        {category.map((cat) => (
          <li key={cat.cat_ucid}>
            <p>{cat.cat_nom}</p>
            <button onClick={() => setFormCatId(cat.cat_ucid)}>
              Modifier le nom de la catégorie
            </button>
            {formCatId === cat.cat_ucid && (
              <ModifCategory catId={cat.cat_ucid} onClose={() => setFormCatId(null)}/>
            )}

            <br />
            <button onClick={() => onSubmitDelete(cat.cat_ucid)}>
              Supprimer la catégorie
            </button>
          </li>
        ))}
        <button>Ajouter une catégorie</button>
      </ul>
    </>
  );
}
