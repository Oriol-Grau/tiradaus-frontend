import httpService from "../httpService";

export const crearSala = async (sala) => {
  const res = await httpService.post(`/events`, sala);
  return res.data;
};

export const actualitzarSala = async (sala) => {
  const res = await httpService.put(`/events/${sala.id}`, sala);
  return res.data;
};

export const obtenirSales = async (filtre) => {
  const res = await httpService.get(`/events/all`, { params: { event_mode: filtre } });
  return res.data;
};

export const detallSala = async (id) => {
  const res = await httpService.get(`/events/${id}/users`);
  return res.data;
};

export const esborrarSala = async (id) => {
  const res = await httpService.delete(`/events/${id}`);
  return res.data;
};

export const registrarUsuari = async (salaId, usuariId) => {
  const res = await httpService.post(`/events/${salaId}/users/${usuariId}`);
  return res.data;
}

export default {
  crearSala,
  obtenirSales,
  detallSala,
  esborrarSala,
  actualitzarSala,
  registrarUsuari,
};
