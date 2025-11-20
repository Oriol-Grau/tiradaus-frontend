import httpService from "../httpService";

export const crearSala = async (joc) => {
  const res = await httpService.post(`/events`, joc);
  return res.data;
};

export const actualitzarSala = async (joc) => {
  const res = await httpService.put(`/events/${joc.id}`, joc);
  return res.data;
};

export const obtenirSales = async (filtre) => {
  const res = await httpService.get(`/events/all`, { params: { event_mode: filtre } });
  return res.data;
};

export const detallSala = async (id) => {
  const res = await httpService.get(`/events/${id}`);
  return res.data;
};

export const esborrarSala = async (id) => {
  const res = await httpService.delete(`/events/${id}`);
  return res.data;
};

export default {
  crearSala,
  obtenirSales,
  detallSala,
  esborrarSala,
  actualitzarSala,
};
