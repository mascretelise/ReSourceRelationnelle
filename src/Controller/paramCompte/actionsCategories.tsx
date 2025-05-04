"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import ModifCategory from "./formModifCategory";
import AjoutCategory from "./ajoutCategorie";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "@/app/components/navbarView";



export default function ActionsCategorie() {
  const [category, setCategory] = useState<
    { cat_ucid: string; cat_nom: string }[]>([]);
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
    <div className="flex justify-center items-stretch flex-col">
      <Navbar />
      <h1 className="flex justify-center text-2xl">Tableau de catégories</h1>
      <div className="flex justify-center">
      <TableContainer component={Paper} sx={{ width: 800}} className="border-2 border-b-gray-500 flex justify-center">
      <Table sx={{ width: 800}} aria-label="simple table">
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
              <ModifCategory catId={cat.cat_ucid} onClose={() => setFormCatId(null)}/>
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
    <button className="border border-b-blue-300 justify-self-center rounded-lg w-64 " onClick={() => setFormAjoutCat(!formAjoutCat)}>Ajouter une catégorie</button>
    {formAjoutCat && <AjoutCategory />}
    
    </div>
  );
}
