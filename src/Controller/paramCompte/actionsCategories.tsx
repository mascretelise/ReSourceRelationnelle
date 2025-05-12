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
import { useTranslations } from "next-intl";

export default function ActionsCategorie() {
  const t = useTranslations("modifCategories");
  const [category, setCategory] = useState<
    { cat_ucid: string; cat_nom: string }[]
  >([]);
  const [formCatId, setFormCatId] = useState<string | null>(null);
  const [formAjoutCat, setFormAjoutCat] = useState(false);

  const fetchData = async () => {
    const getCategory = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/api/category/readCategory`,
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
      `${process.env.NEXT_PUBLIC_URL_API}/api/category/removeCategory?category=${category}`,
      {
        method: "DELETE",
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
    <div className="min-h-screen bg-gray-100 justify-items-stretch pt-6 pb-12">
  <h1 className="text-4xl font-semibold text-center mb-6 text-gray-700">
    {t("tableauCategories")}
  </h1>

  <div className="flex justify-center px-4 sm:px-6 md:px-8">
    <div className="w-full max-w-4xl overflow-x-auto">
      <TableContainer
        component={Paper}
        sx={{ width: "100%" }}
        className="border-2 border-b-gray-500 flex justify-center rounded-xl shadow-md"
      >
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">{t("categories")}</TableCell>
              <TableCell align="center">{t("actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.map((cat) => (
              <tr className="border-1 border-b-gray-500" key={cat.cat_ucid}>
                <th>
                  <p>{cat.cat_nom}</p>
                </th>
                <th className="flex justify-center gap-2">
                  <button onClick={() => setFormCatId(cat.cat_ucid)} className="text-blue-500 hover:text-blue-700">
                    {t("modifier")}
                  </button>
                  {formCatId === cat.cat_ucid && (
                    <ModifCategory
                      catId={cat.cat_ucid}
                      onClose={() => setFormCatId(null)}
                    />
                  )}
                  <br />
                  <button
                    onClick={() => onSubmitDelete(cat.cat_nom)}
                    className="text-red-500 hover:text-red-700"
                  >
                    {t("supprimer")}
                  </button>
                </th>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </div>

  <div className="flex justify-center mt-6">
    <button
      className="px-4 py-2 bg-[#78C8CC] text-white rounded-lg hover:bg-[#399E8C] flex flex-row gap-x-3 items-center"
      onClick={() => setFormAjoutCat(!formAjoutCat)}
    >
      {t("ajoutCategorie")}
    </button>
  </div>

  {formAjoutCat && <AjoutCategory />}
</div>

  );
}
