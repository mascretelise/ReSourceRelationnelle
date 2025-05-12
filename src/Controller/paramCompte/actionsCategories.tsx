"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import ModifCategory from "./formModifCategory";
import AjoutCategory from "./ajoutCategorie";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ActionsCategorie() {
  const [category, setCategory] = useState<
    { cat_ucid: string; cat_nom: string }[]
  >([]);
  const [formCatId, setFormCatId] = useState<string | null>(null);
  const [formAjoutCat, setFormAjoutCat] = useState(false);

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
    <div className="min-h-screen bg-gray-100 justify-items-stretch pt-6pb-12">
      <h1 className="text-4xl font-semibold text-center mb-6 text-gray-700">
        Tableau des catégories
      </h1>
      <div className="flex justify-center">
        <TableContainer
          component={Paper}
          sx={{ width: 800 }}
          className="border-2 border-b-gray-500 flex justify-center  rounded-xl shadow-md "
        >
          <Table sx={{ width: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Catégories</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((cat) => (
                <tr className="border-1 border-b-gray-500" key={cat.cat_ucid}>
                  <th>
                    <p>{cat.cat_nom}</p>
                  </th>
                  <th>
                    <button onClick={() => setFormCatId(cat.cat_ucid)}>
                      Modifier
                    </button>
                    {formCatId === cat.cat_ucid && (
                      <ModifCategory
                        catId={cat.cat_ucid}
                        onClose={() => setFormCatId(null)}
                      />
                    )}
                    <br />
                    <button onClick={() => onSubmitDelete(cat.cat_nom)}>
                      Supprimer
                    </button>
                  </th>
                </tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-[#78C8CC] text-white rounded-lg hover:bg-[#399E8C] flex flex-row gap-x-3 justify-self-center "
        onClick={() => setFormAjoutCat(!formAjoutCat)}
      >
        Ajouter une catégorie
      </button>
      {formAjoutCat && <AjoutCategory />}
    </div>
  );
}
