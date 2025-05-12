"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslations } from "next-intl";
import SuspendreCompteById from "./formSuspendreCompte";
import Switch from '@mui/material/Switch';
import FormControlLabel from "@mui/material/FormControlLabel";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function SuspendAccount() {
  const t = useTranslations("modifCategories");
  const [account, setAccounts] = useState<
    { uti_uuid: string; uti_name: string; uti_firstname: string; uti_suspendu: string, suspendu:string }[]
  >([]);
  const [formAccount, setFormAccount] = useState<string | null>(null);
  const [formAjoutCat, setFormAjoutCat] = useState(false);

  const fetchData = async () => {
    const getAccounts = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/api/user/allAccountsAdmin`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await getAccounts.json();
    const accounts = result.map(
      (item: { uti_uuid: string; uti_name: string, uti_firstname: string, uti_suspendu: string, suspendu:string }) => ({
        uti_uuid: item.uti_uuid,
        uti_name: item.uti_name,
        uti_firstname: item.uti_firstname,
        uti_suspendu: item.uti_suspendu,
        suspendu: item.suspendu
      })
    );

    setAccounts(accounts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  

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
              <TableCell align="center">{t("nom")}</TableCell>
              <TableCell align="center">{t("prenom")}</TableCell>
              <TableCell align="center">{t("etatCompte")}</TableCell>
              <TableCell align="center">{t("actionsEtatCompte")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {account.map((user) => (
              <TableRow key={user.uti_uuid}>
                <TableCell align="center">{user.uti_name}</TableCell>
                <TableCell align="center">{user.uti_firstname}</TableCell>
                <TableCell align="center">{user.suspendu}</TableCell>
                <TableCell align="center">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => setFormAccount(user.uti_uuid)}
                  >
                    {t("modifierEtatCompte")}
                  </button>
                  {formAccount === user.uti_uuid && (
                    <SuspendreCompteById
                      accountId={user.uti_uuid}
                      onClose={() => setFormAccount(null)}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <FormControlLabel control={<Switch />} label={t("desactiver")} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </div>
</div>

  );
}
