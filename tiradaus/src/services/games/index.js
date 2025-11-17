import httpService from "../httpService";

export const crearJoc = async (joc) => {
  const res = await httpService.post(`/games`, joc);
  return res.data;
};

export const actualitzarJoc = async (joc) => {
  const res = await httpService.put(`/games/${joc.id}`, joc);
  return res.data;
};

export const obtenirJocs = async (filtre) => {
  const res = await httpService.get(`/games`, { params: { filtre } });
  return res.data;
};

export const detallJoc = async (id) => {
  const res = await httpService.get(`/games/${id}`);
  return res.data;
};

export const esborrarJoc = async (id) => {
  const res = await httpService.delete(`/games/${id}`);
  return res.data;
};

export const obtenirTotsJocs = async (type) => {
  const res = await httpService.get(`/games/all`, {
    params: { game_type: type },
  });
  return res.data;
};

export default {
  crearJoc,
  obtenirJocs,
  detallJoc,
  esborrarJoc,
  obtenirTotsJocs,
  actualitzarJoc,
};
