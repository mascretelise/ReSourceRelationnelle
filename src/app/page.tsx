'use client';

import { useEffect, useState } from 'react';
import Home from "./home";
import Navbar from "@/app/components/navbarView";

const Page = () => {
  const [globalResources, setGlobalResources] = useState<any[]>([]);
  const [userResources, setUserResources] = useState<any[]>([]);
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer les ressources globales
    fetch('http://localhost:3000/api/ressources/recentes')
      .then(response => response.json())
      .then(data => {
        console.log("Données globales reçues :", data);
        setGlobalResources(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des ressources globales:', err);
        setErrorGlobal('Erreur lors de la récupération des ressources globales.');
      });

    // Récupérer les ressources de l'utilisateur
    fetch('http://localhost:3000/api/ressources/historique')
      .then(response => response.json())
      .then(data => {
        console.log("Données utilisateur reçues :", data);
        setUserResources(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des ressources utilisateur:', err);
        setErrorUser('Erreur lors de la récupération des ressources utilisateur.');
      });
  }, []);

  return (
    <>
      <Home />
      <main className="p-6">
        <h1 className="text-4xl font-bold">Bienvenue sur ReSource Relationnelle</h1>
        <p className="mt-4 text-lg">Votre plateforme de gestion des ressources.</p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Dernières Ressources Globales</h2>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {errorGlobal ? (
              <p>{errorGlobal}</p>
            ) : globalResources.length > 0 ? (
              globalResources.map((resource) => (
                <div key={resource.id || resource.res_nom} className="border p-4 rounded-lg shadow-lg">
                  <strong>{resource.res_nom}</strong>
                </div>
              ))
            ) : (
              <p>Aucune ressource trouvée.</p>
            )}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Ressources Consultées Récemment</h2>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {errorUser ? (
              <p>{errorUser}</p>
            ) : userResources.length > 0 ? (
              userResources.map((resource) => (
                <div key={resource.id || resource.res_nom} className="border p-4 rounded-lg shadow-lg">
                  <strong>{resource.res_nom}</strong>
                </div>
              ))
            ) : (
              <p>Aucune ressource consultée récemment.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
